"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import { useQuiz } from "@/hooks/useQuiz";
import { memo, useState } from "react";

interface InteractiveAdScenarioProps {
	className?: string;
	animate?: boolean;
	showResult?: boolean;
}

/**
 * InteractiveAdScenario
 * โฆษณาที่มีปุ่มกดได้จริงๆ บนรูป
 * สำหรับ scenario ที่ต้องการ interaction แทนการเลือกตัวเลือก
 */
const InteractiveAdScenarioComponent = ({
	className = "",
	animate = true,
	showResult = false,
}: InteractiveAdScenarioProps) => {
	const { getChatScenarioMotionProps } = useQuizAnimations(showResult);
	const { handleAnswerSelect } = useQuiz();
	const [hasClicked, setHasClicked] = useState(false);

	// เลือกรูปตาม showResult หรือ hasClicked
	const imageSrc =
		showResult || hasClicked
			? "/images/scenario-3/result-ad-job.jpg" // รูปหลังกดปุ่ม
			: "/images/scenario-3/ad-job.jpg"; // รูปเริ่มต้น

	const handleSkip = () => {
		setHasClicked(true);
		handleAnswerSelect("skip"); // ถูกต้อง - ข้าม
	};

	const handleRegister = () => {
		setHasClicked(true);
		handleAnswerSelect("register"); // ผิด - ลงทะเบียน
	};

	return (
		<motion.div
			className={
				"relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] mx-auto " +
				className
			}
			{...(animate ? getChatScenarioMotionProps() : {})}
		>
			{/* รูปหลัก */}
			<Image
				src={imageSrc}
				alt={hasClicked ? "Job ad scam result" : "Job ad scam"}
				width={400}
				height={600}
				className="w-full h-auto rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
				priority
			/>

			{/* ปุ่ม Overlay - แสดงเฉพาะตอนยังไม่กด */}
			{!showResult && !hasClicked && (
				<div className="absolute inset-0 pointer-events-none">
					{/* ปุ่ม ข้าม - ด้านล่างซ้าย */}
					<button
						onClick={handleSkip}
						className="absolute pointer-events-auto
							bottom-[4%] left-[7%] 
							w-[39%] h-[10%]
							bg-transparent hover:bg-yellow-500/30
							rounded-md
							transition-all duration-200
							border-2 border-transparent hover:border-yellow-400
							text-transparent hover:text-yellow-700
							text-xs sm:text-sm font-medium
							flex items-center justify-center
							"
						aria-label="ข้าม"
					></button>

					{/* ปุ่ม ลงทะเบียน - ด้านล่างขวา */}
					<button
						onClick={handleRegister}
						className="absolute pointer-events-auto
							bottom-[4%] right-[7%] 
							w-[39%] h-[10%]
							bg-transparent hover:bg-yellow-500/30
							rounded-md
							transition-all duration-200
							border-2 border-transparent hover:border-yellow-400
							text-transparent hover:text-yellow-700
							text-xs sm:text-sm font-medium
							flex items-center justify-center
							"
						aria-label="ลงทะเบียน"
					></button>
				</div>
			)}
		</motion.div>
	);
};

// Memoize to avoid unnecessary re-renders
const InteractiveAdScenario = memo(InteractiveAdScenarioComponent);

export default InteractiveAdScenario;
