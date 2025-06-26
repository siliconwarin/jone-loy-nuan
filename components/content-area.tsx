"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tooltip } from "./tooltip";
import { ChatScenario } from "./chat-scenario";

interface ContentAreaProps {
	content: {
		type: "image" | "text" | "svg" | "component";
		data: string;
		alt?: string;
		component?: string;
	};
	className?: string;
	variant?: "default" | "compact" | "fullscreen";
	animate?: boolean;
	tooltipContent?: string;
	tooltipVariant?: "default" | "warning" | "danger" | "info";
	showResult?: boolean;
}

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
					? { y: -60, scale: 1, opacity: 0.3 }
					: { y: 0, scale: 1, opacity: 1 },
				transition: {
					duration: 1.0,
					ease: "easeInOut" as const,
					delay: showResult ? 0.2 : 0,
				},
		  }
		: {};

	const renderContent = () => {
		switch (content.type) {
			case "component":
				if (content.component === "ChatScenario") {
					return <ChatScenario animate={animate} showResult={showResult} />;
				}
				return null;
			case "image":
				return (
					<Image
						src={content.data}
						alt={content.alt || "Content image"}
						width={400}
						height={600}
						className="w-full h-auto rounded-xl shadow-lg"
						priority
					/>
				);
			case "svg":
				return (
					<div
						className="w-full h-auto mx-auto rounded-lg shadow-xl overflow-hidden"
						dangerouslySetInnerHTML={{ __html: content.data }}
					/>
				);
			case "text":
				return (
					<div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-xl p-6">
						<p className="text-gray-800 leading-relaxed">{content.data}</p>
					</div>
				);
			default:
				return null;
		}
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
