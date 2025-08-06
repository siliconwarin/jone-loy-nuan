"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PinScenario from "@/app/quiz/_component/pin-scenario";
import type { QuestionWithAnswers } from "@/lib/types";

interface ContentAreaProps {
	questionData: QuestionWithAnswers;
	showResult: boolean;
	variant?: "fullscreen" | "preview";
	onPinScenarioAnswer?: (isCorrect: boolean) => void;
}

export function ContentArea({
	questionData,
	showResult,
	variant = "fullscreen",
	onPinScenarioAnswer,
}: ContentAreaProps) {
	// สำหรับข้อแรก (PIN Scenario)
	if (questionData.order_index === 1) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<PinScenario onAnswer={onPinScenarioAnswer} disabled={showResult} />
			</div>
		);
	}

	// สำหรับข้ออื่นๆ (รูปภาพ)
	const normalImageUrl = questionData.normal_image_url;
	const resultImageUrl = questionData.result_image_url;

	if (!normalImageUrl && !resultImageUrl) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<div className="text-center text-gray-500">
					<p>ไม่มีรูปภาพสำหรับคำถามนี้</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-full flex items-center justify-center">
			<motion.div
				className="relative w-full max-w-md aspect-square"
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{/* Normal Image */}
				{normalImageUrl && (
					<motion.div
						className="absolute inset-0"
						animate={{
							opacity: showResult ? 0 : 1,
							scale: showResult ? 0.8 : 1,
						}}
						transition={{ duration: 0.6 }}
					>
						<Image
							src={normalImageUrl}
							alt="Normal state"
							fill
							className="object-contain"
							priority
						/>
					</motion.div>
				)}

				{/* Result Image */}
				{resultImageUrl && showResult && (
					<motion.div
						className="absolute inset-0"
						initial={{ opacity: 0, scale: 1.2 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						<Image
							src={resultImageUrl}
							alt="Result state"
							fill
							className="object-contain"
							priority
						/>
					</motion.div>
				)}
			</motion.div>
		</div>
	);
}
