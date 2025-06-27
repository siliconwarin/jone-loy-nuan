"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RedFlagTooltip } from "./red-flag-tooltip";
import { RED_FLAGS_DATA } from "@/lib/constants";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import type { ChatScenarioProps } from "@/lib/types";

export const ChatScenario = ({
	className = "",
	animate = true,
	showResult = false,
}: ChatScenarioProps) => {
	// 🎨 Animation Logic - React Compiler Optimized
	const { getChatScenarioMotionProps, getChatBubbleAnimation } =
		useQuizAnimations(showResult);

	// React 19: React Compiler จะ optimize function นี้อัตโนมัติ
	function getMotionProps() {
		if (!animate) return {};
		return getChatScenarioMotionProps();
	}

	return (
		<motion.div
			className={cn("relative w-full max-w-[380px] mx-auto", className)}
			{...getMotionProps()}
		>
			{/* Chat UI Background */}
			<div className="relative">
				<Image
					src="/images/scenario-1/chat-ui.jpg"
					alt="Chat interface showing messaging app"
					width={400}
					height={600}
					className="w-full h-auto rounded-xl shadow-lg"
					priority
				/>

				{/* Chat Bubble Overlay */}
				<motion.div
					{...getChatBubbleAnimation()}
					className="absolute top-[35%] left-[8%] w-[84%]"
				>
					<Image
						src="/images/scenario-1/chat-bubble.jpg"
						alt="Scam message bubble"
						width={320}
						height={120}
						className="w-full h-auto drop-shadow-sm"
					/>
				</motion.div>

				{/* Red Flag Tooltips */}
				{showResult &&
					RED_FLAGS_DATA.map((flag) => (
						<RedFlagTooltip
							key={flag.id}
							message={flag.message}
							position={flag.position}
							direction={flag.direction}
							delay={flag.delay}
							show={showResult}
						/>
					))}
			</div>
		</motion.div>
	);
};
