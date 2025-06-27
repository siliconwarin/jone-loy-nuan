"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/hooks/useQuiz";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import type { AnswerPanelProps } from "@/lib/types";

export const AnswerPanel = ({
	answers,
	showResult,
	onAnswerSelect,
}: AnswerPanelProps) => {
	// 🎯 Business Logic - Zustand Store
	const { getButtonVariant, isButtonDisabled, getButtonDataState } = useQuiz();

	// 🎨 Animation Logic - React Compiler Optimized
	const { getAnswerPanelMotionProps, getAnswerButtonAnimation } =
		useQuizAnimations(showResult);

	return (
		<div className="w-full flex flex-col justify-center items-center">
			<motion.div
				{...getAnswerPanelMotionProps()}
				className="w-full flex flex-col items-center space-y-4 max-w-sm mx-auto"
			>
				{answers.map((option, index) => (
					<motion.div
						key={option.id}
						{...getAnswerButtonAnimation(index)}
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
