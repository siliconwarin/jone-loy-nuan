"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import { ScenarioViewer } from "./scenario-viewer";
import { useMemo } from "react";
import type { QuestionWithAnswers } from "@/lib/types";

export interface ContentAreaProps {
	questionData: QuestionWithAnswers;
	className?: string;
	variant?: "default" | "compact" | "fullscreen";
	animate?: boolean;
	showResult?: boolean;
}

export const ContentArea = ({
	questionData,
	className = "",
	variant = "default",
	animate = true,
	showResult = false,
}: ContentAreaProps) => {
	// 🎨 Animation Logic - React Compiler Optimized
	const { getContentMotionProps } = useQuizAnimations(showResult);

	// ใช้ useMemo เพื่อป้องกัน re-calculation
	const variantStyles = useMemo(() => {
		switch (variant) {
			case "compact":
				return "w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px]";
			case "fullscreen":
				return "max-w-4xl w-full";
			default:
				return "w-full max-w-[300px] sm:max-w-sm md:max-w-md";
		}
	}, [variant]);

	const motionProps = useMemo(() => {
		if (!animate) return {};
		return getContentMotionProps();
	}, [animate, getContentMotionProps]);

	return (
		<motion.div
			layoutId={`content-area-${questionData.id}`} // Use question ID for unique layoutId
			className={cn("w-full mx-auto", variantStyles, className)}
			{...motionProps}
		>
			<ScenarioViewer
				showResult={showResult}
				normal_image_url={questionData.normal_image_url}
				result_image_url={questionData.result_image_url}
				altText={questionData.question_text ?? "Scenario Image"}
			/>
		</motion.div>
	);
};
