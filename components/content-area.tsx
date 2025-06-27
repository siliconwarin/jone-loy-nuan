"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tooltip } from "./tooltip";
import { ChatScenario } from "./chat-scenario";
import type { QuizContent, ContentAreaProps } from "@/lib/types";

const ContentFactory = {
	component: (data: QuizContent, props: any) => {
		const componentMap = {
			ChatScenario: () => <ChatScenario {...props} />,
		};

		const Component = componentMap[data.component as keyof typeof componentMap];
		return Component ? <Component /> : null;
	},

	image: (data: QuizContent) => (
		<Image
			src={data.data}
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
	const getVariantStyles = () => {
		switch (variant) {
			case "compact":
				return "w-full max-w-[380px]";
			case "fullscreen":
				return "max-w-4xl w-full";
			default:
				return "w-full max-w-sm";
		}
	};

	const motionProps = animate
		? {
				initial: { opacity: 1, y: 0, scale: 1 },
				animate: showResult
					? { y: -20, scale: 1, opacity: 0.7 }
					: { y: 0, scale: 1, opacity: 1 },
				transition: {
					duration: 1.0,
					ease: "easeInOut" as const,
					delay: showResult ? 0.2 : 0,
				},
		  }
		: {};

	const renderContent = () => {
		const renderer = ContentFactory[content.type];
		return renderer ? renderer(content, { animate, showResult }) : null;
	};

	return (
		<motion.div
			className={cn("w-full mx-auto", getVariantStyles(), className)}
			{...motionProps}
		>
			{tooltipContent ? (
				<Tooltip
					content={tooltipContent}
					variant={tooltipVariant}
					position="auto"
				>
					{renderContent()}
				</Tooltip>
			) : (
				renderContent()
			)}
		</motion.div>
	);
};
