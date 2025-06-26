"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AnswerButton } from "@/components/answer-button";

interface Answer {
	id: string;
	text: string;
	isCorrect: boolean;
}

interface AnswerButtonsProps {
	answers: Answer[];
	showResult: boolean;
	selectedAnswer: string | null;
	onAnswerSelect: (answerId: string) => void;
}

export const AnswerButtons = ({
	answers,
	showResult,
	selectedAnswer,
	onAnswerSelect,
}: AnswerButtonsProps) => {
	return (
		<div className="w-full mt-8 flex flex-col justify-center">
			<AnimatePresence>
				{!showResult && (
					<motion.div
						initial={{ opacity: 1, y: 0 }}
						exit={{
							opacity: 0,
							y: 50,
							transition: { duration: 0.8, ease: "easeInOut" },
						}}
						className="w-full flex flex-col items-center space-y-4 max-w-sm mx-auto"
					>
						{answers.map((option, index) => (
							<motion.div
								key={option.id}
								initial={{ opacity: 1, scale: 1 }}
								exit={{
									opacity: 0,
									scale: 0.9,
									transition: {
										duration: 0.5,
										delay: index * 0.1,
										ease: "easeInOut",
									},
								}}
							>
								<AnswerButton
									onClick={() => onAnswerSelect(option.id)}
									disabled={selectedAnswer !== null}
								>
									{option.text}
								</AnswerButton>
							</motion.div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
