"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useMemo, useState } from "react";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import { quizData } from "@/lib/quiz-data";
import { RedFlagTooltip } from "./red-flag-tooltip";
import ChatBubbleImage from "./chat-bubble-image";

interface ScenarioViewerProps {
	scenarioId: string;
	showResult?: boolean;
	animate?: boolean;
	onInteraction?: (answerId: string, isCorrect: boolean) => void;
	className?: string;
}

/**
 * Generic ScenarioViewer - รองรับทุก scenario type
 * ใช้ข้อมูลจาก quiz-data.ts และแสดง SVG/Image เพียวๆ
 */
const ScenarioViewerComponent = ({
	scenarioId,
	showResult = false,
	animate = true,
	onInteraction,
	className = "",
}: ScenarioViewerProps) => {
	const [hasInteracted, setHasInteracted] = useState(false);
	const { getChatScenarioMotionProps, getChatBubbleAnimation } =
		useQuizAnimations(showResult);

	// หาข้อมูลจาก quiz-data.ts
	const questionData = useMemo(() => {
		return quizData.find((q) => q.id === scenarioId);
	}, [scenarioId]);

	// Motion props
	const motionProps = useMemo(() => {
		return animate ? getChatScenarioMotionProps() : {};
	}, [animate, getChatScenarioMotionProps]);

	// Chat bubble animation (สำหรับ SMS scenario)
	const bubbleMotionProps = useMemo(() => {
		return animate && !showResult && scenarioId === "sms-scam-1"
			? getChatBubbleAnimation()
			: {};
	}, [animate, showResult, scenarioId, getChatBubbleAnimation]);

	// Early return ถ้าไม่เจอข้อมูล
	if (!questionData) {
		console.warn(`Question data not found for: ${scenarioId}`);
		return null;
	}

	// กำหนด image path ตาม scenario
	const getImagePath = () => {
		const scenarioMap: Record<string, string> = {
			"sms-scam-1": "/images/scenario-1/chat-ui.jpg",
			"social-ad-2": "/images/scenario-2/feed-ui.svg", // SVG file!
			"job-ad-3": "/images/scenario-3/ad-job.jpg",
			"romance-scam-5": "/images/scenario-5/profile-social-ui.jpg",
			"investment-scam-6": "/images/scenario-6/invest-ui.jpg",
			"line-group-scam-7": "/images/scenario-7/line-group.jpg", // สมมติ
			"fake-ads-8": "/images/scenario-8/fake-ads.jpg", // สมมติ
			"fake-police-phone-call-9": "/images/scenario-9/police-call.jpg", // สมมติ
			"mule-account-10": "/images/scenario-10/mule-account.jpg", // สมมติ
		};

		return scenarioMap[scenarioId] || "/placeholder.svg";
	};

	const imagePath = getImagePath();
	const isSvgFile = imagePath.endsWith(".svg");

	// Handle interactive button click
	const handleButtonClick = (answerId: string) => {
		if (hasInteracted || !onInteraction) return;

		const answer = questionData.answers.find((a) => a.id === answerId);
		if (answer) {
			setHasInteracted(true);
			onInteraction(answerId, answer.isCorrect);
		}
	};

	return (
		<motion.div
			layoutId={`scenario-${scenarioId}`}
			className={`relative ${className}`}
			{...motionProps}
		>
			{/* รูปหลัก - SVG หรือ Image */}
			{isSvgFile ? (
				// ใช้ SVG เพียวๆ แบบปกติ
				<img
					src={imagePath}
					alt={questionData.content.alt || "Scenario SVG"}
					className="w-full h-auto rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
				/>
			) : (
				<Image
					src={imagePath}
					alt={questionData.content.alt || "Scenario image"}
					width={400}
					height={600}
					className="w-full h-auto rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
					priority
				/>
			)}

			{/* Text Overlay สำหรับ scenario พิเศษ */}
			{scenarioId === "sms-scam-1" && (
				<motion.div
					{...bubbleMotionProps}
					className="absolute top-[15%] left-[5%] w-[90%]"
				>
					<ChatBubbleImage />
				</motion.div>
			)}

			{/* Text overlay ถูกเอาออกแล้ว - ใช้แค่ SVG เพียวๆ */}

			{/* Interactive Buttons สำหรับ job-ad-3 */}
			{scenarioId === "job-ad-3" &&
				questionData.interactive &&
				!showResult &&
				!hasInteracted && (
					<div className="absolute inset-0 pointer-events-none">
						<button
							onClick={() => handleButtonClick("skip")}
							className="absolute pointer-events-auto top-[20%] right-[10%] w-[25%] h-[8%] bg-transparent hover:bg-yellow-500/30 rounded-md transition-all duration-200 border-2 border-transparent hover:border-yellow-400 text-transparent hover:text-yellow-700 text-xs font-medium flex items-center justify-center"
							aria-label="ข้าม"
						/>
						<button
							onClick={() => handleButtonClick("register")}
							className="absolute pointer-events-auto bottom-[25%] left-[10%] w-[80%] h-[10%] bg-transparent hover:bg-yellow-500/30 rounded-md transition-all duration-200 border-2 border-transparent hover:border-yellow-400 text-transparent hover:text-yellow-700 text-xs font-medium flex items-center justify-center"
							aria-label="ลงทะเบียน"
						/>
					</div>
				)}

			{/* Red Flag Tooltips */}
			{showResult &&
				questionData.redFlags?.map((flag, index) => (
					<RedFlagTooltip
						key={index}
						message={flag}
						position={{
							top: `${20 + index * 15}%`,
							left: `${10 + (index % 2) * 40}%`,
						}}
						direction={index % 2 === 0 ? "down" : "up"}
						delay={index * 0.3}
						show={showResult}
					/>
				))}
		</motion.div>
	);
};

export const ScenarioViewer = memo(ScenarioViewerComponent);
