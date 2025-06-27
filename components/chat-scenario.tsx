"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RedFlagTooltip } from "./red-flag-tooltip";
import { RED_FLAGS_DATA } from "@/lib/constants";
import type { ChatScenarioProps } from "@/lib/types";

export const ChatScenario = ({
	className = "",
	animate = true,
	showResult = false,
}: ChatScenarioProps) => {
	const motionProps = animate
		? {
				initial: { opacity: 1, y: 0, scale: 1 },
				animate: showResult
					? { y: -60, scale: 1, opacity: 1.0 }
					: { y: 0, scale: 1, opacity: 1 },
				transition: {
					duration: 1.0,
					ease: "easeInOut" as const,
					delay: showResult ? 0.2 : 0,
				},
		  }
		: {};

	return (
		<motion.div
			className={cn("relative w-full max-w-[380px] mx-auto", className)}
			{...motionProps}
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
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{
						opacity: 1,
						scale: 1,
						y: 0,
						transition: {
							delay: 0.5,
							duration: 0.6,
							type: "spring",
							stiffness: 200,
							damping: 20,
						},
					}}
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
