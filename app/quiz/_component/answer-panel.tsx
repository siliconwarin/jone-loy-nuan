"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/hooks/useQuiz";
import type { Answer, AnswerPanelProps } from "@/lib/types";

export const AnswerPanel = ({
	answers,
	showResult,
	selectedAnswer,
	onAnswerSelect,
}: AnswerPanelProps) => {
	const { getButtonVariant, isButtonDisabled, getButtonDataState } = useQuiz();

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
							variant={getButtonVariant(option.id, option.isCorrect)}
							size="default"
							onClick={() => onAnswerSelect(option.id)}
							disabled={isButtonDisabled(option.id) || showResult}
							data-state={getButtonDataState(option.id)}
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
