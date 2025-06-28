"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";

interface RomanceScamScenarioProps {
	animate?: boolean;
	showResult?: boolean;
	className?: string;
}

export const RomanceScamScenario = ({
	animate = true,
	showResult = false,
	className = "",
}: RomanceScamScenarioProps) => {
	// 🎨 Animation Logic - ใช้จาก centralized hook
	const { getRomanceScenarioAnimation } = useQuizAnimations(showResult);
	const romanceAnimation = getRomanceScenarioAnimation();

	// เลือกรูปภาพตามสถานะ
	const imageSrc = showResult
		? "/images/scenario-6/result-profile-social-ui.jpg"
		: "/images/scenario-6/profile-social-ui.jpg";

	const altText = showResult
		? "Result showing romance scam warning signs"
		: "Social media profile showing potential romance scam";

	return (
		<div className={`w-full max-w-[350px] mx-auto ${className}`}>
			<AnimatePresence mode="wait">
				{!showResult ? (
					<motion.div
						key="question"
						{...(animate ? romanceAnimation.question : {})}
						className="relative"
					>
						{/* Mobile Frame */}
						<div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
							{/* Social Media Profile Image */}
							<div className="relative">
								<Image
									src={imageSrc}
									alt={altText}
									width={400}
									height={600}
									className="w-full h-auto object-cover"
									priority
								/>
							</div>
						</div>
					</motion.div>
				) : (
					<motion.div
						key="result"
						{...(animate ? romanceAnimation.result : {})}
						className="relative"
					>
						{/* Mobile Frame with Result */}
						<div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
							{/* Result Image */}
							<div className="relative">
								<Image
									src={imageSrc}
									alt={altText}
									width={400}
									height={600}
									className="w-full h-auto object-cover"
									priority
								/>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
