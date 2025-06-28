"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import { memo } from "react";
import { RedFlagTooltip } from "./red-flag-tooltip";
import { LINE_GROUP_SCAM_RED_FLAGS } from "@/lib/quiz-data";

interface LineGroupScamScenarioProps {
	className?: string;
	animate?: boolean;
	showResult?: boolean;
}

/**
 * LineGroupScamScenario - Standard Pattern
 * แสดงรูป Line group invitation แล้วใช้ answer panel ปกติ
 */
const LineGroupScamScenarioComponent = ({
	className = "",
	animate = true,
	showResult = false,
}: LineGroupScamScenarioProps) => {
	const { getChatScenarioMotionProps } = useQuizAnimations(showResult);

	// เลือกรูปตาม showResult
	const imageSrc = showResult
		? "/images/scenario-7/result-line-group-scam.jpg" // รูปหลัง result พร้อม red flags
		: "/images/scenario-7/line-group-scam.jpg"; // รูปเริ่มต้น

	return (
		<motion.div
			layoutId="line-group-scam-scenario"
			className={`relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] mx-auto ${className}`}
			{...(animate ? getChatScenarioMotionProps() : {})}
		>
			{/* Line Group Invitation Image */}
			<Image
				src={imageSrc}
				alt={
					showResult
						? "Line group scam with red flags highlighted"
						: "Line group scam invitation"
				}
				width={400}
				height={600}
				className="w-full h-auto rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
				priority
			/>

			{/* Red Flag Tooltips - แสดงเมื่อ showResult = true */}
			{showResult &&
				LINE_GROUP_SCAM_RED_FLAGS.map((flag) => (
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

export const LineGroupScamScenario = memo(LineGroupScamScenarioComponent);
