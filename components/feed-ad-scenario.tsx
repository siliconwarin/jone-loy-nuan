"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import { memo } from "react";

interface FeedAdScenarioProps {
	className?: string;
	animate?: boolean;
	showResult?: boolean;
}

/**
 * FeedAdScenario
 * แสดงโฆษณาสินเชื่อในหน้า feed พร้อมข้อความด้านซ้าย
 */
const FeedAdScenarioComponent = ({
	className = "",
	animate = true,
	showResult = false,
}: FeedAdScenarioProps) => {
	const { getChatScenarioMotionProps } = useQuizAnimations(showResult);

	return (
		<motion.div
			className={
				"relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] mx-auto " +
				className
			}
			{...(animate ? getChatScenarioMotionProps() : {})}
		>
			<Image
				src="/images/scenario-2/feed-ui.jpg"
				alt="Social feed loan ad"
				width={400}
				height={600}
				className="w-full h-auto rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
				priority
			/>
		</motion.div>
	);
};

// Memoize to avoid unnecessary re-renders (same fix as ChatScenario)
const FeedAdScenario = memo(FeedAdScenarioComponent);

export default FeedAdScenario;
