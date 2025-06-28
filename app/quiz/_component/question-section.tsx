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
		<div className="w-full mb-2 sm:mb-3 md:mb-4 flex items-center justify-center min-h-[60px] sm:min-h-[70px] md:min-h-[80px]">
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
