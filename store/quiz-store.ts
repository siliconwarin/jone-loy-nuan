import { create } from "zustand";

// --- Data Types ---

interface QuizResponse {
	questionId: string;
	isCorrect: boolean;
}

interface QuizSummaryData {
	sessionId: string;
	totalQuestions: number;
	correctAnswers: number;
	deviceType: "mobile" | "tablet" | "desktop";
	userAgent: string;
}

// --- Store Definition ---

interface QuizResultState {
	sessionId: string | null;
	totalQuestions: number;
	responses: QuizResponse[];
}

interface QuizResultActions {
	startQuiz: (totalQuestions: number) => void;
	addResponse: (response: QuizResponse) => void;
	getSummary: () => { score: number; total: number; percentage: number };
	resetQuiz: () => void;
	saveQuizSummaryToApi: () => Promise<void>;
}

type QuizResultStore = QuizResultState & QuizResultActions;

const initialState: QuizResultState = {
	sessionId: null,
	totalQuestions: 0,
	responses: [],
};

export const useQuizResultStore = create<QuizResultStore>((set, get) => ({
	...initialState,

	/**
	 * Initializes a new quiz session.
	 * @param totalQuestions The total number of questions in the quiz.
	 */
	startQuiz: (totalQuestions) => {
		const sessionId = `quiz_${Date.now()}_${Math.random()
			.toString(36)
			.substr(2, 9)}`;
		set({
			sessionId,
			totalQuestions,
			responses: [],
		});
	},

	/**
	 * Adds a user's response to the store.
	 * @param response An object containing the questionId and whether it was correct.
	 */
	addResponse: (response) => {
		set((state) => ({
			responses: [...state.responses, response],
		}));
	},

	/**
	 * Resets the quiz state to its initial values.
	 */
	resetQuiz: () => {
		set(initialState);
	},

	/**
	 * Calculates and returns the user's score summary.
	 */
	getSummary: () => {
		const { responses, totalQuestions } = get();
		const score = responses.filter((r) => r.isCorrect).length;
		const total = totalQuestions > 0 ? totalQuestions : responses.length;
		const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
		return { score, total, percentage };
	},

	/**
	 * Saves the final quiz summary to the backend API.
	 */
	saveQuizSummaryToApi: async () => {
		const { sessionId, responses, totalQuestions } = get();
		if (!sessionId) return;

		try {
			const correctAnswers = responses.filter((r) => r.isCorrect).length;

			const summaryData: QuizSummaryData = {
				sessionId,
				totalQuestions,
				correctAnswers,
				deviceType: getDeviceType(),
				userAgent: navigator.userAgent,
			};

			const response = await fetch("/api/quiz-response", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(summaryData),
			});

			if (!response.ok) {
				throw new Error("Failed to save quiz summary");
			}
			console.log("Quiz summary saved:", await response.json());
		} catch (error) {
			console.error("Error saving quiz summary:", error);
		}
	},
}));

// --- Utility Functions ---

function getDeviceType(): "mobile" | "tablet" | "desktop" {
	if (typeof window === "undefined") return "desktop";
	const width = window.innerWidth;
	if (width < 640) return "mobile";
	if (width < 1024) return "tablet";
	return "desktop";
}
