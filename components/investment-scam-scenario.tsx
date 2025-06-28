"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import { memo } from "react";
import { RedFlagTooltip } from "./red-flag-tooltip";
import { INVESTMENT_SCAM_RED_FLAGS } from "@/lib/quiz-data";

interface InvestmentScamScenarioProps {
	className?: string;
	animate?: boolean;
	showResult?: boolean;
}

const InvestmentScamScenarioComponent = ({
	className = "",
	animate = true,
	showResult = false,
}: InvestmentScamScenarioProps) => {
	const { getChatScenarioMotionProps } = useQuizAnimations(showResult);

	// เลือกรูปตาม showResult
	const imageSrc = showResult
		? "/images/scenario-5/result-invest-ui.jpg" // รูปหลัง result
		: "/images/scenario-5/invest-ui.jpg"; // รูปเริ่มต้น

	return (
		<motion.div
			layoutId="investment-scam-scenario"
			className={`relative w-full max-w-[380px] mx-auto ${className}`}
			{...(animate ? getChatScenarioMotionProps() : {})}
		>
			{/* Social Media Investment Post */}
			<Image
				src={imageSrc}
				alt={
					showResult
						? "Investment scam with red flags highlighted"
						: "Investment scam social media post"
				}
				width={400}
				height={600}
				className="w-full h-auto rounded-xl shadow-lg"
				priority
			/>

			{/* Red Flag Tooltips - แสดงเมื่อ showResult = true */}
			{showResult &&
				INVESTMENT_SCAM_RED_FLAGS.map((flag) => (
					<RedFlagTooltip
						key={flag.id}
						message={flag.message}
						position={flag.position}
						direction={flag.direction}
						delay={flag.delay}
						show={showResult}
					/>
				))}
		</motion.div>
	);
};

export const InvestmentScamScenario = memo(InvestmentScamScenarioComponent);
