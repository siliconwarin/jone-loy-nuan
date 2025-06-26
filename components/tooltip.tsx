"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
	children: React.ReactNode;
	content: string;
	position?: "auto" | "top" | "bottom" | "left" | "right";
	variant?: "default" | "warning" | "danger" | "info";
}

export const Tooltip = ({
	children,
	content,
	position = "auto",
	variant = "default",
}: TooltipProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [calculatedPosition, setCalculatedPosition] = useState<
		"top" | "bottom" | "left" | "right"
	>("top");
	const triggerRef = useRef<HTMLDivElement>(null);

	// คำนวณตำแหน่งที่เหมาะสมที่สุด
	const calculateBestPosition = () => {
		if (!triggerRef.current || position !== "auto") {
			if (position !== "auto") {
				setCalculatedPosition(position);
			}
			return;
		}

		const rect = triggerRef.current.getBoundingClientRect();
		const viewport = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		// ตรวจสอบพื้นที่ว่างแต่ละด้าน
		const spaceTop = rect.top;
		const spaceBottom = viewport.height - rect.bottom;
		const spaceLeft = rect.left;
		const spaceRight = viewport.width - rect.right;

		// เลือกตำแหน่งที่มีพื้นที่มากที่สุด
		const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight);

		if (maxSpace === spaceTop && spaceTop > 60) {
			setCalculatedPosition("top");
		} else if (maxSpace === spaceBottom && spaceBottom > 60) {
			setCalculatedPosition("bottom");
		} else if (maxSpace === spaceLeft && spaceLeft > 120) {
			setCalculatedPosition("left");
		} else if (maxSpace === spaceRight && spaceRight > 120) {
			setCalculatedPosition("right");
		} else {
			// fallback เป็น top หรือ bottom
			setCalculatedPosition(spaceBottom > spaceTop ? "bottom" : "top");
		}
	};

	const handleMouseEnter = () => {
		calculateBestPosition();
		setIsVisible(true);
	};

	const handleMouseLeave = () => {
		setIsVisible(false);
	};

	const getVariantStyles = () => {
		switch (variant) {
			case "warning":
				return "bg-gradient-to-r from-orange-500 to-pink-500 text-white";
			case "danger":
				return "bg-gradient-to-r from-red-500 to-pink-500 text-white";
			case "info":
				return "bg-gradient-to-r from-blue-500 to-purple-500 text-white";
			default:
				return "bg-gradient-to-r from-pink-400 to-rose-500 text-white";
		}
	};

	const getPositionClasses = () => {
		const pos = position === "auto" ? calculatedPosition : position;

		switch (pos) {
			case "bottom":
				return "top-full left-1/2 transform -translate-x-1/2 mt-2";
			case "left":
				return "right-full top-1/2 transform -translate-y-1/2 mr-2";
			case "right":
				return "left-full top-1/2 transform -translate-y-1/2 ml-2";
			default: // top
				return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
		}
	};

	const getArrowClasses = () => {
		const pos = position === "auto" ? calculatedPosition : position;

		switch (pos) {
			case "bottom":
				return "bottom-full left-1/2 -translate-x-1/2 -mb-1 border-l-4 border-r-4 border-l-transparent border-r-transparent border-b-4";
			case "left":
				return "left-full top-1/2 -translate-y-1/2 -ml-1 border-t-4 border-b-4 border-t-transparent border-b-transparent border-l-4";
			case "right":
				return "right-full top-1/2 -translate-y-1/2 -mr-1 border-t-4 border-b-4 border-t-transparent border-b-transparent border-r-4";
			default: // top
				return "top-full left-1/2 -translate-x-1/2 -mt-1 border-l-4 border-r-4 border-l-transparent border-r-transparent border-t-4";
		}
	};

	const getArrowColor = () => {
		switch (variant) {
			case "warning":
				return "border-orange-500";
			case "danger":
				return "border-red-500";
			case "info":
				return "border-blue-500";
			default:
				return "border-pink-400";
		}
	};

	return (
		<div
			ref={triggerRef}
			className="relative inline-block"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}

			<AnimatePresence>
				{isVisible && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8, y: 4 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 4 }}
						transition={{ duration: 0.15, ease: "easeOut" }}
						className={`absolute z-50 px-3 py-2 text-xs font-medium rounded-lg shadow-lg whitespace-nowrap max-w-xs ${getVariantStyles()} ${getPositionClasses()}`}
						style={{ pointerEvents: "none" }}
					>
						{content}

						{/* Arrow */}
						<div
							className={`absolute w-0 h-0 ${getArrowClasses()} ${getArrowColor()}`}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
