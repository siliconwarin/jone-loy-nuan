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
		<div className="w-full mb-8 flex items-center justify-center">
			<AnimatePresence>
				{!showResult && (
					<motion.h2
						className="text-lg font-medium text-gray-800 text-center leading-relaxed px-4 max-w-md"
						{...getQuestionExitAnimation()}
					>
						{question}
					</motion.h2>
				)}
			</AnimatePresence>
		</div>
	);
};
