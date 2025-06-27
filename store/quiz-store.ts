import { create } from "zustand";
import { QuizQuestion } from "@/lib/types";
import { QUIZ_CONFIG } from "@/lib/constants";

interface QuizState {
	currentQuestion: QuizQuestion | null;
	selectedAnswer: string | null;
	showResult: boolean;
	isCorrect: boolean | null;
	currentQuestionIndex: number;
	totalQuestions: number;

	// Actions
	setCurrentQuestion: (question: QuizQuestion) => void;
	selectAnswer: (answerId: string) => void;
	showResults: () => void;
	resetQuiz: () => void;
	nextQuestion: () => void;
	getProgress: () => number;
}

export const useQuizStore = create<QuizState>((set, get) => ({
	currentQuestion: null,
	selectedAnswer: null,
	showResult: false,
	isCorrect: null,
	currentQuestionIndex: 0,
	totalQuestions: 1,

	setCurrentQuestion: (question) => {
		set({
			currentQuestion: question,
			selectedAnswer: null,
			showResult: false,
			isCorrect: null,
		});
	},

	selectAnswer: (answerId) => {
		const { currentQuestion } = get();
		if (!currentQuestion) return;

		const selectedAnswerData = currentQuestion.answers.find(
			(a) => a.id === answerId
		);
		const isCorrect = selectedAnswerData?.isCorrect || false;

		set({
			selectedAnswer: answerId,
			isCorrect,
		});

		// Auto show result after configured delay
		setTimeout(() => {
			set({ showResult: true });
		}, QUIZ_CONFIG.RESULT_DELAY);
	},

	showResults: () => {
		set({ showResult: true });
	},

	resetQuiz: () => {
		set({
			selectedAnswer: null,
			showResult: false,
			isCorrect: null,
		});
	},

	nextQuestion: () => {
		const { currentQuestionIndex, totalQuestions } = get();
		if (currentQuestionIndex < totalQuestions - 1) {
			// Load next question logic
		}
	},

	getProgress: () => {
		const { currentQuestionIndex, totalQuestions } = get();
		return ((currentQuestionIndex + 1) / totalQuestions) * 100;
	},
}));
