"use client";

import { motion, AnimatePresence } from "framer-motion";

interface QuestionSectionProps {
	question: string;
	showResult: boolean;
}

export const QuestionSection = ({
	question,
	showResult,
}: QuestionSectionProps) => {
	return (
		<div className="w-full mb-8 flex items-center justify-center">
			<AnimatePresence>
				{!showResult && (
					<motion.h2
						className="text-lg font-medium text-gray-800 text-center leading-relaxed px-4 max-w-md"
						initial={{ opacity: 1, y: 0 }}
						exit={{
							opacity: 0,
							y: -30,
							transition: { duration: 0.6, ease: "easeInOut" },
						}}
					>
						{question}
					</motion.h2>
				)}
			</AnimatePresence>
		</div>
	);
};
