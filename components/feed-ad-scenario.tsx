"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";

interface FeedAdScenarioProps {
	className?: string;
	animate?: boolean;
	showResult?: boolean;
}

/**
 * FeedAdScenario
 * แสดงโฆษณาสินเชื่อในหน้า feed พร้อมข้อความด้านซ้าย
 */
export default function FeedAdScenario({
	className = "",
	animate = true,
	showResult = false,
}: FeedAdScenarioProps) {
	// ใช้ animation hook เดิม
	const { getChatScenarioMotionProps } = useQuizAnimations(showResult);

	// Stagger ตัวอักษร
	const textVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: (i: number) => ({
			opacity: 1,
			x: 0,
			transition: { delay: i * 0.15 },
		}),
	};

	const headerText = "เงินสดด่วน อนุมัติไว";
	const bodyLines = ["ไม่ตรวจสอบเครดิต", "ไม่ต้องใช้เอกสารใดๆ"];
	const footerText = "ดอกน้อย ผ่อนสบาย";

	return (
		<motion.div
			className={"relative w-full max-w-[380px] mx-auto " + className}
			{...(animate ? getChatScenarioMotionProps() : {})}
		>
			<Image
				src="/images/scenario-2/feed-ui.jpg"
				alt="Social feed loan ad"
				width={400}
				height={600}
				className="w-full h-auto rounded-xl shadow-lg"
				priority
			/>

			{/* Text Overlay (แสดงเฉพาะตอนยังไม่ showResult) */}
			{!showResult && (
				<div className="absolute top-[24%] left-[8%] w-[70%] font-bold leading-snug space-y-4">
					{/* Header */}
					<motion.p
						className="text-yellow-200 text-[36px] leading-tight"
						custom={0}
						initial="hidden"
						animate="visible"
						variants={textVariants}
					>
						{headerText}
					</motion.p>

					{/* Body */}
					<div className="text-white text-[14px] space-y-1">
						{bodyLines.map((ln, idx) => (
							<motion.p
								key={ln}
								custom={idx + 1}
								initial="hidden"
								animate="visible"
								variants={textVariants}
							>
								{ln}
							</motion.p>
						))}
					</div>

					{/* Footer */}
					<motion.p
						className="text-white text-[14px]"
						custom={bodyLines.length + 1}
						initial="hidden"
						animate="visible"
						variants={textVariants}
					>
						{footerText}
					</motion.p>
				</div>
			)}
		</motion.div>
	);
}
