"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/hooks/useQuiz";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import type { AnswerPanelProps } from "@/lib/types";

export const AnswerPanel = ({
	answers,
	selectedAnswer,
	showResult,
	isCorrect,
	onAnswerSelect,
	hideAnswers = false,
}: AnswerPanelProps) => {
	// 🎯 Business Logic - Zustand Store
	const { getButtonVariant, isButtonDisabled, getButtonDataState } = useQuiz();

	// 🎨 Animation Logic - React Compiler Optimized
	const { getAnswerPanelMotionProps, getAnswerButtonAnimation } =
		useQuizAnimations(showResult);

	if (hideAnswers) {
		return <div className="flex-none h-20" />;
	}

	return (
		<div className="w-full flex flex-col justify-center items-center">
			<motion.div
				{...getAnswerPanelMotionProps()}
				className="flex flex-col justify-center items-center space-y-2.5 sm:space-y-3 md:space-y-4"
			>
				{answers.map((option, index) => (
					<motion.div
						key={option.id}
						{...getAnswerButtonAnimation(index)}
						className="flex justify-center"
					>
						<Button
							variant={getButtonVariant(option.id, option.isCorrect)}
							size="default"
							onClick={() => onAnswerSelect(option.id)}
							disabled={isButtonDisabled(option.id) || showResult}
							data-state={getButtonDataState(option.id)}
							className="w-[280px] sm:w-[320px] md:w-[360px] h-auto text-sm sm:text-base py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 min-h-[44px]"
						>
							{option.text}
						</Button>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};
