import { useCallback } from "react";
import { useQuizStore } from "@/store/quiz-store";
import { getCurrentQuestion } from "@/lib/quiz-data";
import { BUTTON_VARIANTS } from "@/lib/constants";
import type { ButtonVariant } from "@/lib/types";

/**
 * 🎯 Custom Hook for Quiz Logic Management
 * จัดการ business logic ของ quiz แยกออกจาก UI components
 */
export const useQuiz = () => {
	const store = useQuizStore();

	/**
	 * เริ่มต้น quiz ด้วยคำถามแรก
	 */
	const initializeQuiz = useCallback(() => {
		const question = getCurrentQuestion();
		store.setCurrentQuestion(question);
	}, [store.setCurrentQuestion]);

	/**
	 * จัดการการเลือกคำตอบ
	 */
	const handleAnswerSelect = useCallback(
		(answerId: string) => {
			if (store.selectedAnswer || store.showResult) return; // Prevent multiple selections
			store.selectAnswer(answerId);
		},
		[store.selectedAnswer, store.showResult, store.selectAnswer]
	);

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
	 */
	const resetQuiz = useCallback(() => {
		store.resetQuiz();
	}, [store.resetQuiz]);

	/**
	 * เริ่มใหม่ทั้งหมด
	 */
	const restartQuiz = useCallback(() => {
		store.resetQuiz();
		initializeQuiz();
	}, [store.resetQuiz, initializeQuiz]);

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
