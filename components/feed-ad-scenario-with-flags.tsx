"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import { memo, useMemo } from "react";
import FeedAdTextOverlay from "./feed-ad-text-overlay";
import { RedFlagTooltip } from "./red-flag-tooltip";
import { FEED_AD_RED_FLAGS } from "@/lib/quiz-data";

interface FeedAdScenarioWithFlagsProps {
	className?: string;
	animate?: boolean;
	showResult?: boolean;
}

/**
 * FeedAdScenario พร้อม Red Flags
 * ใช้ layoutId เพื่อป้องกัน re-mount และ flickering
 */
const FeedAdScenarioWithFlagsComponent = ({
	className = "",
	animate = true,
	showResult = false,
}: FeedAdScenarioWithFlagsProps) => {
	const { getChatScenarioMotionProps } = useQuizAnimations(showResult);

	// ใช้ useMemo เพื่อป้องกัน re-creation ของ text data
	const textData = useMemo(
		() => ({
			header: "เงินสดด่วน อนุมัติไว",
			body: ["ไม่ตรวจสอบเครดิต", "ไม่ต้องใช้เอกสารใดๆ"],
			footer: "ดอกน้อย ผ่อนสบาย",
		}),
		[]
	);

	// ใช้ useMemo เพื่อป้องกัน re-creation ของ motion props
	const motionProps = useMemo(() => {
		if (!animate) return {};
		return getChatScenarioMotionProps();
	}, [animate, getChatScenarioMotionProps]);

	return (
		<motion.div
			layoutId="feed-ad-scenario" // ป้องกัน re-mount
			className={"relative w-full max-w-[380px] mx-auto " + className}
			{...motionProps}
		>
			{/* Background Image */}
			<Image
				src="/images/scenario-2/feed-ui.jpg"
				alt="Social feed loan ad"
				width={400}
				height={600}
				className="w-full h-auto rounded-xl shadow-lg"
				priority
			/>

			{/* Text Overlay - อยู่นอก motion wrapper เพื่อป้องกัน re-render */}
			<FeedAdTextOverlay
				header={textData.header}
				body={textData.body}
				footer={textData.footer}
			/>

			{/* Red Flag Tooltips - แสดงเมื่อ showResult = true */}
			{showResult &&
				FEED_AD_RED_FLAGS.map((flag) => (
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

export const FeedAdScenarioWithFlags = memo(FeedAdScenarioWithFlagsComponent);
