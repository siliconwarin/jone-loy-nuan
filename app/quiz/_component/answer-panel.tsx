"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Answer {
	id: string;
	text: string;
	isCorrect: boolean;
}

interface AnswerPanelProps {
	answers: Answer[];
	showResult: boolean;
	selectedAnswer: string | null;
	onAnswerSelect: (answerId: string) => void;
}

export const AnswerPanel = ({
	answers,
	showResult,
	selectedAnswer,
	onAnswerSelect,
}: AnswerPanelProps) => {
	const getVariant = (
		answer: Answer
	): "quiz" | "quiz-correct" | "quiz-wrong" => {
		// แสดงสีแดงทันทีที่เลือกคำตอบผิด
		if (selectedAnswer === answer.id && !answer.isCorrect) {
			return "quiz-wrong";
		}

		// แสดงสีเขียวทันทีที่เลือกคำตอบถูก
		if (selectedAnswer === answer.id && answer.isCorrect) {
			return "quiz-correct";
		}

		// แสดงสีเขียวเมื่อแสดงผลและเป็นคำตอบที่ถูก (กรณีไม่ได้เลือกแต่เป็นคำตอบที่ถูก)
		if (showResult && answer.isCorrect) {
			return "quiz-correct";
		}

		// กรณีอื่นๆ ใช้สีปกติ
		return "quiz";
	};

	const getDataState = (answer: Answer): "selected" | "unselected" => {
		if (selectedAnswer === answer.id) {
			return "selected";
		}
		return "unselected";
	};

	const isDisabled = (answer: Answer): boolean => {
		if (!selectedAnswer) return false;
		return selectedAnswer !== answer.id;
	};

	return (
		<div className="w-full flex flex-col justify-center items-center">
			<motion.div
				initial={{ opacity: 1, y: 0 }}
				animate={
					showResult
						? { opacity: 1, y: -20, scale: 0.95 } // ตอนแสดงผล ย่อเล็กน้อยและขยับขึ้น
						: { opacity: 1, y: 0, scale: 1 } // ตอนปกติ
				}
				transition={{ duration: 0.6, ease: "easeInOut" }}
				className="w-full flex flex-col items-center space-y-4 max-w-sm mx-auto"
			>
				{answers.map((option, index) => (
					<motion.div
						key={option.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: { delay: index * 0.1, duration: 0.3 },
						}}
						className="w-full"
					>
						<Button
							variant={getVariant(option)}
							size="default"
							onClick={() => onAnswerSelect(option.id)}
							disabled={isDisabled(option) || showResult} // ปิดการกดเมื่อแสดงผลแล้ว
							data-state={getDataState(option)}
							className="w-full h-auto text-base"
						>
							{option.text}
						</Button>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};
