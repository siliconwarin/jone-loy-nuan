"use client";

import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AnswerButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
	isCorrect?: boolean;
	isWrong?: boolean;
	className?: string;
}

export const AnswerButton = ({
	children,
	onClick,
	disabled = false,

	isCorrect = false,
	isWrong = false,
	className = "",
}: AnswerButtonProps) => {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		if (!disabled) {
			setIsClicked(true);
			onClick();
			// รีเซ็ต bounce หลัง 400ms (เร็วขึ้น)
			setTimeout(() => setIsClicked(false), 400);
		}
	};

	// Dynamic styles based on state
	const getButtonStyles = () => {
		let bgColor = "#1899D6"; // Default blue
		let borderColor = "#1CB0F6";

		if (isCorrect) {
			bgColor = "#22C55E"; // Green
			borderColor = "#16A34A";
		} else if (isWrong) {
			bgColor = "#EF4444"; // Red
			borderColor = "#DC2626";
		}
		return {
			backgroundColor: bgColor,
			borderColor: borderColor,
		};
	};

	return (
		<motion.button
			// Hover: เด้งขึ้นนิดหน่อย + bright
			whileHover={
				!disabled
					? {
							scale: 1.02,
							y: -2,
							filter: "brightness(1.1)",
							transition: { type: "spring", stiffness: 300, damping: 20 },
					  }
					: {}
			}
			// Tap: กดลงไป
			whileTap={
				!disabled
					? {
							scale: 0.98,
							y: 1,
							transition: { type: "spring", stiffness: 400, damping: 15 },
					  }
					: {}
			}
			// Click bounce: เด้งเมื่อกด
			animate={
				isClicked
					? {
							scale: 1.03,
							transition: {
								type: "spring",
								stiffness: 400,
								damping: 10,
							},
					  }
					: {
							scale: 1,
							transition: { type: "spring", stiffness: 300, damping: 25 },
					  }
			}
			onClick={handleClick}
			disabled={disabled}
			className={cn(
				"relative w-64 mx-auto border-0 rounded-xl", // ลดความกว้างเป็น w-64 และจัดกึ่งกลาง
				"text-white font-semibold text-sm tracking-wide leading-5",
				"px-4 py-2.5 text-center cursor-pointer outline-none overflow-visible",
				"transform transition-all duration-150 select-none",
				"shadow-md hover:shadow-lg",
				disabled && "cursor-auto opacity-75",
				className
			)}
			style={{
				...getButtonStyles(),
				// 3D Effect แบบ inline style - ลดลง
				borderBottom: `3px solid ${getButtonStyles().borderColor}`,
				position: "relative",
			}}
		>
			{/* 3D Background Layer - ปรับให้เล็กลง */}
			<div
				className="absolute inset-0 -bottom-0.5 rounded-xl -z-10" // ลด bottom offset
				style={{
					backgroundColor: getButtonStyles().borderColor,
				}}
			/>

			{children}
		</motion.button>
	);
};
