"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ChatBubbleImage from "./chat-bubble-image";
import { cn } from "@/lib/utils";
import { RedFlagTooltip } from "./red-flag-tooltip";
import { RED_FLAGS_DATA } from "@/lib/constants";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import type { ChatScenarioProps } from "@/lib/types";
import { memo } from "react";

const ChatScenarioComponent = ({
	className = "",
	animate = true,
	showResult = false,
}: ChatScenarioProps) => {
	// 🎨 Animation Logic - React Compiler Optimized
	const { getChatScenarioMotionProps, getChatBubbleAnimation } =
		useQuizAnimations(showResult);

	// หยุด animation ของ bubble เมื่อ showResult เปลี่ยนหรือปิด animate
	function getBubbleMotionProps() {
		if (!animate || showResult) return {};
		return getChatBubbleAnimation();
	}

	return (
		<motion.div
			className={cn("relative w-full max-w-[380px] mx-auto", className)}
			{...getChatScenarioMotionProps()}
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
					{...getBubbleMotionProps()}
					className="absolute top-[35%] left-[8%] w-[84%]"
				>
					<ChatBubbleImage />
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

export const ChatScenario = memo(ChatScenarioComponent);
