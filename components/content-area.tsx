"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import { ScenarioViewer } from "./scenario-viewer";
import { useMemo } from "react";
import type { QuestionWithAnswers } from "@/lib/types";
import { PinScenario } from "@/app/quiz/_component/pin-scenario";
import Image from "next/image";

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
	onPinScenarioAnswer,
}: ContentAreaProps & {
	onPinScenarioAnswer?: (isCorrect: boolean) => void;
}) => {
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

	// เช็คว่าข้อไหนต้องใช้ PinScenario (ใช้ order_index === 1 เท่านั้น เพราะไม่มี type ใน schema)
	const isPinScenario = questionData.order_index === 1;

	return (
		<motion.div
			layoutId={`content-area-${questionData.id}`}
			className={cn("w-full mx-auto", variantStyles, className)}
			{...motionProps}
		>
			{isPinScenario ? (
				<div className="relative w-full flex justify-center items-center">
					<PinScenario
						onAnswer={onPinScenarioAnswer || (() => {})}
						disabled={showResult}
					/>
					{showResult && (
						<Image
							src="/images/scenarios/question-1/redflag-pin.svg"
							alt="Redflag"
							fill
							className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
							style={{ objectFit: "contain" }}
						/>
					)}
				</div>
			) : (
				<ScenarioViewer
					showResult={showResult}
					normal_image_url={questionData.normal_image_url}
					result_image_url={questionData.result_image_url}
					altText={questionData.question_text ?? "Scenario Image"}
				/>
			)}
		</motion.div>
	);
};
