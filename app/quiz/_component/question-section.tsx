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
		<div className="w-full mb-6 sm:mb-8 flex items-center justify-center">
			<AnimatePresence>
				{!showResult && (
					<motion.h2
						className="text-base sm:text-lg md:text-xl font-medium text-gray-800 text-center leading-relaxed px-3 sm:px-4 max-w-xs sm:max-w-md md:max-w-lg"
						{...getQuestionExitAnimation()}
					>
						{question}
					</motion.h2>
				)}
			</AnimatePresence>
		</div>
	);
};
