"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useMemo, useState } from "react";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import { SCENARIO_CONFIGS } from "@/lib/scenario-configs";
import { RedFlagTooltip } from "./red-flag-tooltip";
import ChatBubbleImage from "./chat-bubble-image";
import FeedAdTextOverlay from "./feed-ad-text-overlay";

interface ScenarioViewerProps {
	scenarioId: string;
	showResult?: boolean;
	animate?: boolean;
	onInteraction?: (answerId: string, isCorrect: boolean) => void;
	className?: string;
}

/**
 * Generic ScenarioViewer - รองรับทุก scenario type
 * แทนที่ component แยกๆ ทั้งหมด
 */
const ScenarioViewerComponent = ({
	scenarioId,
	showResult = false,
	animate = true,
	onInteraction,
	className = "",
}: ScenarioViewerProps) => {
	const [hasInteracted, setHasInteracted] = useState(false);
	const { getChatScenarioMotionProps, getChatBubbleAnimation } =
		useQuizAnimations(showResult);

	// Move all hooks before any conditional logic
	const config = SCENARIO_CONFIGS[scenarioId];

	// เลือกรูปตาม state - moved before early return
	const imageSrc = useMemo(() => {
		if (!config) return "";
		if (showResult || hasInteracted) {
			return config.resultImage || config.baseImage;
		}
		return config.baseImage;
	}, [config, showResult, hasInteracted]);

	// Motion props - ย้ายออกมาจาก conditional
	const motionProps = useMemo(() => {
		return animate ? getChatScenarioMotionProps() : {};
	}, [animate, getChatScenarioMotionProps]);

	// Chat bubble animation (สำหรับ SMS scenario) - ย้ายออกมาจาก conditional
	const bubbleMotionProps = useMemo(() => {
		return animate && !showResult && scenarioId === "sms-scam-1"
			? getChatBubbleAnimation()
			: {};
	}, [animate, showResult, scenarioId, getChatBubbleAnimation]);

	// Early return after all hooks
	if (!config) {
		console.warn(`Scenario config not found for: ${scenarioId}`);
		return null;
	}

	// Handle interactive button click
	const handleButtonClick = (buttonId: string) => {
		if (hasInteracted || !config.buttons) return;

		const button = config.buttons.find((b) => b.id === buttonId);
		if (button && onInteraction) {
			setHasInteracted(true);
			onInteraction(buttonId, button.isCorrect);
		}
	};

	return (
		<motion.div
			layoutId={`scenario-${scenarioId}`}
			className={`${config.containerClass} ${className}`}
			{...motionProps}
		>
			{/* รูปหลัก */}
			<Image
				src={imageSrc}
				alt={config.alt}
				width={400}
				height={600}
				className="w-full h-auto rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
				priority
			/>

			{/* Text Overlay */}
			{config.textOverlay && (
				<>
					{/* Chat Bubble (SMS Scenario) */}
					{config.textOverlay.component === "ChatBubbleImage" && (
						<motion.div
							{...bubbleMotionProps}
							className={config.textOverlay.position}
						>
							<ChatBubbleImage />
						</motion.div>
					)}

					{/* Feed Ad Text (Social Ad Scenario) */}
					{config.textOverlay.header && (
						<div
							className={
								config.textOverlay.position +
								" font-bold leading-snug space-y-2 sm:space-y-3 md:space-y-4"
							}
						>
							<FeedAdTextOverlay
								header={config.textOverlay.header}
								body={config.textOverlay.body || []}
								footer={config.textOverlay.footer || ""}
							/>
						</div>
					)}
				</>
			)}

			{/* Interactive Buttons */}
			{config.interactive &&
				config.buttons &&
				!showResult &&
				!hasInteracted && (
					<div className="absolute inset-0 pointer-events-none">
						{config.buttons.map((button) => (
							<button
								key={button.id}
								onClick={() => handleButtonClick(button.id)}
								className={`absolute pointer-events-auto ${button.position} bg-transparent hover:bg-yellow-500/30 rounded-md transition-all duration-200 border-2 border-transparent hover:border-yellow-400 text-transparent hover:text-yellow-700 text-xs sm:text-sm font-medium flex items-center justify-center`}
								aria-label={button.text}
							/>
						))}
					</div>
				)}

			{/* Red Flag Tooltips */}
			{showResult &&
				config.redFlags?.map((flag) => (
					<RedFlagTooltip
						key={flag.id}
						message={flag.message}
						position={flag.position}
						direction={flag.direction}
						delay={flag.delay}
						show={showResult}
					/>
				))}
		</motion.div>
	);
};

export const ScenarioViewer = memo(ScenarioViewerComponent);
