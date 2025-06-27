"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";

interface QuestionSectionProps {
	question: string;
	showResult: boolean;
}

export const QuestionSection = ({
	question,
	showResult,
}: QuestionSectionProps) => {
	// 🎨 Animation Logic - React Compiler Optimized
	const { getQuestionExitAnimation } = useQuizAnimations(showResult);
	return (
		<div className="w-full mb-4 sm:mb-6 md:mb-8 flex items-center justify-center">
			<AnimatePresence>
				{!showResult && (
					<motion.h2
						className="text-sm sm:text-base md:text-lg font-medium text-gray-800 text-center leading-relaxed px-2 sm:px-3 md:px-4 max-w-[300px] sm:max-w-md md:max-w-lg"
						{...getQuestionExitAnimation()}
					>
						{question}
					</motion.h2>
				)}
			</AnimatePresence>
		</div>
	);
};
