"use client";

import { cn } from "@/lib/utils";

interface AnswerOption {
	id: string;
	text: string;
}

interface AnswerSectionProps {
	answerOptions: AnswerOption[];
	selectedAnswer: string | null;
	hasAnswer: boolean;
	isDarkMode: boolean;
	onSelectAnswer: (answerId: string) => void;
	showExplanation: boolean;
}

export const AnswerSection = ({
	answerOptions,
	selectedAnswer,
	hasAnswer,
	isDarkMode,
	onSelectAnswer,
}: AnswerSectionProps) => {
	return (
		<div className="flex flex-col space-y-3">
			{answerOptions.map((option) => (
				<button
					key={option.id}
					onClick={() => onSelectAnswer(option.id)}
					disabled={hasAnswer}
					className={cn(
						"w-full text-left p-4 rounded-lg border transition-all duration-200",
						"focus:outline-none focus:ring-2 focus:ring-offset-2",
						isDarkMode
							? "focus:ring-offset-gray-900 border-gray-600"
							: "focus:ring-offset-blue-100 border-gray-300",
						hasAnswer
							? "cursor-not-allowed"
							: "hover:bg-gray-100 dark:hover:bg-gray-700",
						selectedAnswer === option.id
							? "bg-blue-500 border-blue-500 text-white"
							: isDarkMode
							? "bg-gray-800 text-gray-200"
							: "bg-white text-gray-800"
					)}
				>
					{option.text}
				</button>
			))}
		</div>
	);
};
