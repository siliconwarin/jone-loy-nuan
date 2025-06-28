"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/hooks/useQuiz";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import type { AnswerPanelProps } from "@/lib/types";
import { useMemo } from "react";

export const AnswerPanel = (props: AnswerPanelProps) => {
	const { hideAnswers = false } = props;

	// 🎯 Business Logic - Zustand Store (เรียกก่อนเสมอ)
	const { getButtonVariant, isButtonDisabled, getButtonDataState } = useQuiz();

	// 🧠 Smart Layout Detection
	const layoutInfo = useMemo(() => {
		if (hideAnswers) {
			return { layout: "hidden", showPanel: false };
		}

		const answerCount = props.answers.length;
		const isHorizontal = answerCount === 2;
		const isVertical = answerCount >= 3;

		return {
			layout: isHorizontal ? "horizontal" : "vertical",
			showPanel: true,
			isHorizontal,
			isVertical,
		};
	}, [hideAnswers, props.answers.length]);

	// 🎨 Animation Logic - ใช้ correct functions ที่มีอยู่จริง
	const { getAnswerPanelLayoutAnimation, getAnswerButtonLayoutAnimation } =
		useQuizAnimations(props.showResult);

	// 🎨 Layout-specific styles
	const containerStyles = useMemo(() => {
		if (!layoutInfo.showPanel) return "flex-none h-20";

		const baseStyles = "w-full flex justify-center items-center";

		if (layoutInfo.isHorizontal) {
			return `${baseStyles} flex-row gap-3 sm:gap-4 md:gap-6`;
		}

		return `${baseStyles} flex-col`;
	}, [layoutInfo]);

	const answerContainerStyles = useMemo(() => {
		if (layoutInfo.isHorizontal) {
			return "flex flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6";
		}

		return "flex flex-col justify-center items-center space-y-2.5 sm:space-y-3 md:space-y-4";
	}, [layoutInfo.isHorizontal]);

	const getButtonStyles = useMemo(() => {
		if (layoutInfo.isHorizontal) {
			return "w-[130px] sm:w-[150px] md:w-[170px] h-auto text-sm sm:text-base py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 min-h-[44px]";
		}

		return "w-[280px] sm:w-[320px] md:w-[360px] h-auto text-sm sm:text-base py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 min-h-[44px]";
	}, [layoutInfo.isHorizontal]);

	// 🎨 Conditional Rendering แทน early return
	if (!layoutInfo.showPanel) {
		return <div className="flex-none h-20" />;
	}

	// Destructure เฉพาะตอนที่แน่ใจว่าจะใช้ (หลัง condition check)
	const { answers, showResult, onAnswerSelect } = props;

	return (
		<div className={containerStyles}>
			<motion.div
				{...getAnswerPanelLayoutAnimation(layoutInfo.layout)}
				className={answerContainerStyles}
			>
				{answers.map((option, index) => (
					<motion.div
						key={option.id}
						{...getAnswerButtonLayoutAnimation(index, layoutInfo.layout)}
						className="flex justify-center"
					>
						<Button
							variant={getButtonVariant(option.id, option.isCorrect)}
							size="default"
							onClick={() => onAnswerSelect(option.id)}
							disabled={isButtonDisabled(option.id) || showResult}
							data-state={getButtonDataState(option.id)}
							className={getButtonStyles}
						>
							{option.text}
						</Button>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};
