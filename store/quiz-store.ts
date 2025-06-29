import { create } from "zustand";
import type { QuizQuestion } from "@/lib/types";
import { getCurrentQuestion, quizData } from "@/lib/quiz-data";
import type { QuizResponseData } from "@/app/api/quiz-response/route";

// 🆕 Session และ Analytics Types
interface QuizSession {
	sessionId: string;
	startTime: Date;
	currentQuestionIndex: number;
	responses: QuizResponseData[];
	questionStartTime: Date | null;
}

interface QuizStore {
	// Existing states
	currentQuestion: QuizQuestion | null;
	selectedAnswer: string | null;
	showResult: boolean;
	isCorrect: boolean | null;

	// 🆕 New states for data collection
	session: QuizSession | null;
	isLastQuestion: boolean;

	// Existing actions
	setCurrentQuestion: (question: QuizQuestion) => void;
	selectAnswer: (answerId: string) => void;
	resetQuiz: () => void;
	nextQuestion: () => void;

	// 🆕 New actions
	initializeSession: () => void;
	saveQuizResponse: (
		questionId: string,
		answerId: string,
		isCorrect: boolean
	) => Promise<void>;
	checkIfLastQuestion: () => boolean;
	getTotalScore: () => number;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
	// Existing states
	currentQuestion: null,
	selectedAnswer: null,
	showResult: false,
	isCorrect: null,

	// 🆕 New states
	session: null,
	isLastQuestion: false,

	// Existing actions
	setCurrentQuestion: (question) => {
		set({
			currentQuestion: question,
			isLastQuestion: get().checkIfLastQuestion(),
		});
	},

	selectAnswer: (answerId) => {
		const state = get();
		if (!state.currentQuestion) return;

		const answer = state.currentQuestion.answers.find((a) => a.id === answerId);
		const isCorrect = answer?.isCorrect || false;

		set({
			selectedAnswer: answerId,
			isCorrect,
			showResult: true,
		});

		// 🆕 Save response to API
		state.saveQuizResponse(state.currentQuestion.id, answerId, isCorrect);
	},

	resetQuiz: () => {
		set({
			currentQuestion: null,
			selectedAnswer: null,
			showResult: false,
			isCorrect: null,
			session: null,
			isLastQuestion: false,
		});
	},

	nextQuestion: () => {
		const state = get();
		if (!state.session) return;

		const nextIndex = state.session.currentQuestionIndex + 1;

		// Check if this was the last question
		if (nextIndex >= quizData.length) {
			// Redirect to survey
			window.location.href = "/survey";
			return;
		}

		// Load next question
		const nextQuestion = quizData[nextIndex];

		set({
			currentQuestion: nextQuestion,
			selectedAnswer: null,
			showResult: false,
			isCorrect: null,
			session: {
				...state.session,
				currentQuestionIndex: nextIndex,
			},
			isLastQuestion: nextIndex === quizData.length - 1,
		});
	},

	// 🆕 Initialize quiz session
	initializeSession: () => {
		const sessionId = `quiz_${Date.now()}_${Math.random()
			.toString(36)
			.substr(2, 9)}`;

		set({
			session: {
				sessionId,
				startTime: new Date(),
				currentQuestionIndex: 0,
				responses: [],
				questionStartTime: new Date(),
			},
		});

		// Load first question
		const firstQuestion = getCurrentQuestion();
		get().setCurrentQuestion(firstQuestion);
	},

	// 🆕 Save quiz response to API
	saveQuizResponse: async (questionId, answerId, isCorrect) => {
		const state = get();
		if (!state.session) return;

		try {
			// Calculate time spent on question
			const timeSpent = state.session.questionStartTime
				? Math.round(
						(Date.now() - state.session.questionStartTime.getTime()) / 1000
				  )
				: 0;

			// Detect device type
			const deviceType = getDeviceType();

			const responseData: QuizResponseData = {
				sessionId: state.session.sessionId,
				questionId,
				answerId,
				isCorrect,
				timeSpent,
				deviceType,
				userAgent: navigator.userAgent,
			};

			// Send to API
			const response = await fetch("/api/quiz-response", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(responseData),
			});

			if (!response.ok) {
				throw new Error("Failed to save quiz response");
			}

			// Update session with response
			set({
				session: {
					...state.session,
					responses: [...state.session.responses, responseData],
				},
			});
		} catch (error) {
			console.error("Error saving quiz response:", error);
			// Continue quiz even if save fails
		}
	},

	// 🆕 Check if current question is last
	checkIfLastQuestion: () => {
		const state = get();
		if (!state.session) return false;

		return state.session.currentQuestionIndex === quizData.length - 1;
	},

	// 🆕 Get total score from session responses
	getTotalScore: () => {
		const state = get();
		if (!state.session) return 0;

		return state.session.responses.filter((response) => response.isCorrect)
			.length;
	},
}));

// 🆕 Device detection utility
function getDeviceType(): "mobile" | "tablet" | "desktop" {
	if (typeof window === "undefined") return "desktop";

	const width = window.innerWidth;

	if (width < 640) return "mobile";
	if (width < 1024) return "tablet";
	return "desktop";
}
