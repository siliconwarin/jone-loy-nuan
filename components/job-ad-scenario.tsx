"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import { memo } from "react";

interface JobAdScenarioProps {
	className?: string;
	animate?: boolean;
	showResult?: boolean;
}

/**
 * JobAdScenario
 * แสดงโฆษณาสมัครงาน scam - เปลี่ยนรูปตามสถานะ result
 */
const JobAdScenarioComponent = ({
	className = "",
	animate = true,
	showResult = false,
}: JobAdScenarioProps) => {
	const { getChatScenarioMotionProps } = useQuizAnimations(showResult);

	// เลือกรูปตาม showResult
	const imageSrc = showResult
		? "/images/scenario-3/result-ad-job.jpg" // รูปหลังกด result
		: "/images/scenario-3/ad-job.jpg"; // รูปเริ่มต้น

	return (
		<motion.div
			className={
				"relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] mx-auto " +
				className
			}
			{...(animate ? getChatScenarioMotionProps() : {})}
		>
			<Image
				src={imageSrc}
				alt={showResult ? "Job ad scam result" : "Job ad scam"}
				width={400}
				height={600}
				className="w-full h-auto rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
				priority
			/>
		</motion.div>
	);
};

// Memoize to avoid unnecessary re-renders
const JobAdScenario = memo(JobAdScenarioComponent);

export default JobAdScenario;
