"use client";

import { motion } from "framer-motion";

// Animation variants for stair effect
const stairAnimation = {
	initial: {
		top: "0%",
	},
	animate: {
		top: "100%",
	},
	exit: {
		top: ["100%", "0%"],
	},
};

// Calculate reverse index for stagger effect
const reverseIndex = (index: number): number => {
	const totalSteps = 6;
	return totalSteps - index - 1;
};

interface StairsProps {
	totalSteps?: number;
	variant?: "default" | "pastel" | "gradient";
	className?: string;
}

const Stairs = ({
	totalSteps = 6,
	variant = "pastel",
	className = "",
}: StairsProps) => {
	const getVariantStyles = () => {
		switch (variant) {
			case "gradient":
				return {
					className:
						"bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200",
					style: undefined,
				};
			case "pastel":
				return { className: "bg-pink-100", style: undefined };
			default:
				return {
					className: "bg-white",
					style: undefined,
				};
		}
	};

	return (
		<>
			{[...Array(totalSteps)].map((_, index) => {
				const { className: variantClass, style: variantStyle } =
					getVariantStyles();

				return (
					<motion.div
						key={index}
						variants={stairAnimation}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{
							duration: 0.4,
							ease: "easeInOut",
							delay: reverseIndex(index) * 0.1,
						}}
						className={`h-full w-full relative ${className} ${variantClass}`}
						style={variantStyle}
					/>
				);
			})}
		</>
	);
};

export default Stairs;
