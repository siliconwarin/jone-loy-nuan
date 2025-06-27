import { useQuizStore } from "@/store/quiz-store";
import { getCurrentQuestion } from "@/lib/quiz-data";
import { BUTTON_VARIANTS } from "@/lib/constants";
import type { ButtonVariant } from "@/lib/types";

/**
 * 🎯 Business Logic Only - Zustand State Management
 * จัดการ business logic ของ quiz แยกจาก animation logic
 * Animation logic อยู่ใน useQuizAnimations
 */
export const useQuiz = () => {
	const store = useQuizStore();

	/**
	 * เริ่มต้น quiz ด้วยคำถามแรก
	 * React 19: React Compiler handles optimization automatically
	 */
	function initializeQuiz() {
		const question = getCurrentQuestion();
		store.setCurrentQuestion(question);
	}

	/**
	 * จัดการการเลือกคำตอบ
	 * React 19: React Compiler handles optimization automatically
	 */
	function handleAnswerSelect(answerId: string) {
		if (store.selectedAnswer || store.showResult) return; // Prevent multiple selections
		store.selectAnswer(answerId);
	}

	/**
	 * ได้รับ variant ของปุ่มตามสถานะ
	 */
	const getButtonVariant = (
		answerId: string,
		isCorrect: boolean
	): ButtonVariant => {
		// ถ้ายังไม่ได้เลือกคำตอบ
		if (!store.selectedAnswer) {
			return BUTTON_VARIANTS.QUIZ;
		}

		// ถ้าเป็นคำตอบที่เลือก
		if (store.selectedAnswer === answerId) {
			return isCorrect
				? BUTTON_VARIANTS.QUIZ_CORRECT
				: BUTTON_VARIANTS.QUIZ_WRONG;
		}

		// ถ้าแสดงผลแล้วและเป็นคำตอบที่ถูก
		if (store.showResult && isCorrect) {
			return BUTTON_VARIANTS.QUIZ_CORRECT;
		}

		return BUTTON_VARIANTS.QUIZ;
	};

	/**
	 * ตรวจสอบว่าปุ่มควร disabled หรือไม่
	 */
	const isButtonDisabled = (answerId: string): boolean => {
		return store.selectedAnswer !== null && store.selectedAnswer !== answerId;
	};

	/**
	 * ได้รับ data-state สำหรับปุ่ม
	 */
	const getButtonDataState = (answerId: string): "selected" | "unselected" => {
		return store.selectedAnswer === answerId ? "selected" : "unselected";
	};

	/**
	 * รีเซ็ต quiz state
	 * React 19: React Compiler handles optimization automatically
	 */
	function resetQuiz() {
		store.resetQuiz();
	}

	/**
	 * เริ่มใหม่ทั้งหมด
	 * React 19: React Compiler handles optimization automatically
	 */
	function restartQuiz() {
		store.resetQuiz();
		initializeQuiz();
	}

	/**
	 * ตรวจสอบว่า quiz เสร็จสิ้นหรือไม่
	 */
	const isQuizCompleted = (): boolean => {
		return store.showResult;
	};

	/**
	 * ได้รับข้อมูล progress
	 */
	const getQuizProgress = () => {
		// สำหรับอนาคตเมื่อมีหลายคำถาม
		return {
			current: 1,
			total: 1,
			percentage: 100,
		};
	};

	return {
		// Store state
		...store,

		// Actions
		initializeQuiz,
		handleAnswerSelect,
		resetQuiz,
		restartQuiz,

		// Computed values
		getButtonVariant,
		isButtonDisabled,
		getButtonDataState,
		isQuizCompleted,
		getQuizProgress,
	};
};
