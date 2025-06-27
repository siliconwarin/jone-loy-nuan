"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface QuizBackgroundProps {
	children: ReactNode;
	showResult: boolean;
	theme?: "light" | "dark";
}

export const QuizBackground = ({
	children,
	showResult,
	theme = "light",
}: QuizBackgroundProps) => {
	const getBackgroundGradient = () => {
		if (theme === "dark") {
			return showResult
				? "linear-gradient(to bottom, #0f172a, #020617)"
				: "linear-gradient(to bottom, #1e293b, #334155)";
		}

		return showResult
			? "linear-gradient(to bottom, #1e293b, #0f172a)"
			: "linear-gradient(to bottom, #dbeafe, #bfdbfe)";
	};

	return (
		<motion.div
			className="h-[100dvh] flex flex-col relative overflow-hidden"
			animate={{
				background: getBackgroundGradient(),
			}}
			transition={{
				duration: 1.2,
				ease: "easeInOut",
			}}
		>
			{children}
		</motion.div>
	);
};
