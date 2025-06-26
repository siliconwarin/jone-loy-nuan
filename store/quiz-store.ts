import { create } from "zustand";
import { QuizQuestion } from "@/lib/quiz-data";

interface QuizState {
	currentQuestion: QuizQuestion | null;
	selectedAnswer: string | null;
	showResult: boolean;
	isCorrect: boolean | null;

	// Actions
	setCurrentQuestion: (question: QuizQuestion) => void;
	selectAnswer: (answerId: string) => void;
	showResults: () => void;
	resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
	currentQuestion: null,
	selectedAnswer: null,
	showResult: false,
	isCorrect: null,

	setCurrentQuestion: (question) =>
		set({
			currentQuestion: question,
			selectedAnswer: null,
			showResult: false,
			isCorrect: null,
		}),

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

		// Auto show result after 800ms
		setTimeout(() => {
			set({ showResult: true });
		}, 800);
	},

	showResults: () => set({ showResult: true }),

	resetQuiz: () =>
		set({
			selectedAnswer: null,
			showResult: false,
			isCorrect: null,
		}),
}));
