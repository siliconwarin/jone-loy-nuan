"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";

interface RedFlagTooltipProps {
	message: string;
	position: {
		top: string;
		left: string;
	};
	delay?: number;
	show?: boolean;
	className?: string;
	direction?: "down" | "left" | "right" | "up";
}

export const RedFlagTooltip = ({
	message,
	position,
	delay = 0,
	show = false,
	className = "",
	direction = "down",
}: RedFlagTooltipProps) => {
	// 🎨 Animation Logic - React Compiler Optimized
	const { getRedFlagAnimation } = useQuizAnimations(show);

	if (!show) return null;

	const getArrowClasses = () => {
		switch (direction) {
			case "left":
				return "absolute top-1/2 left-full transform -translate-y-1/2";
			case "right":
				return "absolute top-1/2 right-full transform -translate-y-1/2";
			case "up":
				return "absolute bottom-full left-1/2 transform -translate-x-1/2";
			case "down":
			default:
				return "absolute top-full left-1/2 transform -translate-x-1/2";
		}
	};

	const getArrowShape = () => {
		switch (direction) {
			case "left":
				return "w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-r-red-500";
			case "right":
				return "w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-red-500";
			case "up":
				return "w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-red-500";
			case "down":
			default:
				return "w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500";
		}
	};

	const getTransform = () => {
		switch (direction) {
			case "left":
				return "translate(-100%, -50%)";
			case "right":
				return "translate(0%, -50%)";
			case "up":
				return "translate(-50%, -100%)";
			case "down":
			default:
				return "translate(-50%, 0%)";
		}
	};

	return (
		<motion.div
			{...getRedFlagAnimation(delay)}
			className={cn("absolute z-50 pointer-events-none", className)}
			style={{
				top: position.top,
				left: position.left,
				transform: getTransform(),
			}}
		>
			{/* Warning Icon & Pointer */}
			<div className="relative">
				{/* Tooltip Content */}
				<div className="bg-red-500 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg max-w-[180px] relative">
					<div className="flex items-start gap-2">
						{/* Warning Icon */}
						<div className="flex-shrink-0 mt-0.5">
							<svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
								<path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z" />
							</svg>
						</div>
						{/* Message */}
						<span className="text-xs leading-tight">{message}</span>
					</div>

					{/* Arrow Pointer */}
					<div className={getArrowClasses()}>
						<div className={getArrowShape()}></div>
					</div>
				</div>

				{/* Static Red Dot Indicator */}
				<div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-3 h-3 bg-red-500 rounded-full shadow-lg opacity-80" />
			</div>
		</motion.div>
	);
};
