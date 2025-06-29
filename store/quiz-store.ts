import { create } from "zustand";
import type { QuizQuestion } from "@/lib/types";
import { getCurrentQuestion, quizData } from "@/lib/quiz-data";
import type { QuizSummaryData } from "@/app/api/quiz-response/route";

// 🆕 Session และ Analytics Types (แบบใหม่)
interface QuizSession {
	sessionId: string;
	startTime: Date;
	currentQuestionIndex: number;
	responses: Array<{ questionId: string; isCorrect: boolean }>; // เก็บแค่ผลลัพธ์ไม่เก็บรายละเอียด
}

interface QuizStore {
	// Existing states
	currentQuestion: QuizQuestion | null;
	selectedAnswer: string | null;
	showResult: boolean;
	isCorrect: boolean | null;

	// 🆕 New states for summary collection
	session: QuizSession | null;
	isLastQuestion: boolean;

	// Existing actions
	setCurrentQuestion: (question: QuizQuestion) => void;
	selectAnswer: (answerId: string) => void;
	resetQuiz: () => void;
	nextQuestion: () => void;

	// 🆕 New actions
	initializeSession: () => void;
	saveQuizSummary: () => Promise<void>; // 🔄 เปลี่ยนจากการส่งทีละคำถาม
	checkIfLastQuestion: () => boolean;
	getTotalScore: () => number;
	setNavigationCallback: (callback: () => void) => void; // ✅ เพิ่ม navigation callback
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

		// 🆕 บันทึกผลลัพธ์ลง session (ไม่ส่ง API ทันที)
		if (state.session) {
			set({
				session: {
					...state.session,
					responses: [
						...state.session.responses,
						{
							questionId: state.currentQuestion.id,
							isCorrect,
						},
					],
				},
			});
		}
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
			// 🆕 ส่งสรุปผลก่อนไป survey
			state.saveQuizSummary().then(() => {
				// ✅ ใช้ callback แทน window.location.href
				const store = get() as any;
				if (store.navigationCallback) {
					store.navigationCallback();
				}
			});
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
			},
		});

		// Load first question
		const firstQuestion = getCurrentQuestion();
		get().setCurrentQuestion(firstQuestion);
	},

	// 🆕 Save quiz summary to API (เมื่อจบ quiz)
	saveQuizSummary: async () => {
		const state = get();
		if (!state.session) return;

		try {
			// Calculate total score
			const correctAnswers = state.session.responses.filter(
				(response) => response.isCorrect
			).length;
			const totalQuestions = quizData.length;

			// Detect device type
			const deviceType = getDeviceType();

			const summaryData: QuizSummaryData = {
				sessionId: state.session.sessionId,
				totalQuestions,
				correctAnswers,
				deviceType,
				userAgent: navigator.userAgent,
			};

			// Send to API
			const response = await fetch("/api/quiz-response", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(summaryData),
			});

			if (!response.ok) {
				throw new Error("Failed to save quiz summary");
			}

			const result = await response.json();
			console.log("Quiz summary saved:", result);
		} catch (error) {
			console.error("Error saving quiz summary:", error);
			// Continue to survey even if save fails
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

	// ✅ เพิ่ม setNavigationCallback implementation
	setNavigationCallback: (callback: () => void) => {
		set({ navigationCallback: callback } as any);
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
