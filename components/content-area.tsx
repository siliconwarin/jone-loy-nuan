"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tooltip } from "./tooltip";
import { ChatScenario } from "./chat-scenario";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import type { QuizContent, ContentAreaProps } from "@/lib/types";
import { FeedAdScenarioWithFlags } from "./feed-ad-scenario-with-flags";
import { useMemo } from "react";

const ContentFactory = {
	component: (
		data: QuizContent,
		props: { animate: boolean; showResult: boolean }
	) => {
		const componentMap = {
			ChatScenario: () => <ChatScenario {...props} />,
			FeedAdScenario: () => <FeedAdScenarioWithFlags {...props} />,
		};

		const Component = componentMap[data.component as keyof typeof componentMap];
		return Component ? <Component /> : null;
	},

	image: (data: QuizContent) => (
		<Image
			src={data.data || "/placeholder.svg"}
			alt={data.alt || "Content image"}
			width={400}
			height={600}
			className="w-full h-auto rounded-xl shadow-lg"
			priority
		/>
	),

	text: (data: QuizContent) => (
		<div className="text-center p-4">
			<p className="text-lg text-gray-700">{data.data}</p>
		</div>
	),

	svg: (data: QuizContent) => (
		<div
			className="w-full h-auto flex justify-center"
			dangerouslySetInnerHTML={{ __html: data.data }}
		/>
	),
} as const;

export const ContentArea = ({
	content,
	className = "",
	variant = "default",
	animate = true,
	tooltipContent,
	tooltipVariant = "default",
	showResult = false,
}: ContentAreaProps) => {
	// 🎨 Animation Logic - React Compiler Optimized
	const { getContentMotionProps } = useQuizAnimations(showResult);

	// ใช้ useMemo เพื่อป้องกัน re-calculation
	const variantStyles = useMemo(() => {
		switch (variant) {
			case "compact":
				return "w-full max-w-[380px]";
			case "fullscreen":
				return "max-w-4xl w-full";
			default:
				return "w-full max-w-sm";
		}
	}, [variant]);

	const motionProps = useMemo(() => {
		if (!animate) return {};
		return getContentMotionProps();
	}, [animate, getContentMotionProps]);

	const renderedContent = useMemo(() => {
		const renderer = ContentFactory[content.type];
		return renderer ? renderer(content, { animate, showResult }) : null;
	}, [content, animate, showResult]);

	return (
		<motion.div
			layoutId="content-area" // ป้องกัน re-mount
			className={cn("w-full mx-auto", variantStyles, className)}
			{...motionProps}
		>
			{tooltipContent ? (
				<Tooltip
					content={tooltipContent}
					variant={tooltipVariant}
					position="auto"
				>
					{renderedContent}
				</Tooltip>
			) : (
				renderedContent
			)}
		</motion.div>
	);
};
