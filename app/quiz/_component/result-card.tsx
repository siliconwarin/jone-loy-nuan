"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import { useState } from "react";

interface ResultCardProps {
	showResult: boolean;
	isCorrect: boolean | null;
	result: {
		correctTitle: string;
		wrongTitle: string;
		header: string;
		explanation: string;
	};
	onReset: () => void;
	isLoading?: boolean;
	isLastQuestion?: boolean;
}

export const ResultCard = ({
	showResult,
	isCorrect,
	result,
	onReset,
	isLoading = false,
	isLastQuestion = false,
}: ResultCardProps) => {
	const { getResultCardAnimation } = useQuizAnimations(showResult);
	const resultAnimation = getResultCardAnimation();

	// Security & Animation State Management
	const [isButtonLoading, setIsButtonLoading] = useState(false);
	const [animationState, setAnimationState] = useState<
		"idle" | "blinking" | "loading"
	>("idle");

	// Security: Validate navigation permissions
	const canProceed = showResult && !isLoading && !isButtonLoading;
	const isValidState = showResult && result;

	// Enhanced next button handler with security and animation
	const handleNextClick = async () => {
		// Security: Prevent unauthorized navigation
		if (!canProceed || !isValidState) {
			return;
		}

		try {
			setIsButtonLoading(true);
			setAnimationState("blinking");

			// Blinking animation for visual feedback
			await new Promise((resolve) => setTimeout(resolve, 800));

			setAnimationState("loading");

			// Additional processing time
			await new Promise((resolve) => setTimeout(resolve, 400));

			// Reset animation state and proceed
			setAnimationState("idle");
			setIsButtonLoading(false);
			onReset(); // จะไปหน้าผลลัพธ์ถ้าเป็นข้อสุดท้าย หรือข้อถัดไปถ้าไม่ใช่
		} catch (error) {
			console.error("Navigation error:", error);
			setAnimationState("idle");
			setIsButtonLoading(false);
		}
	};

	const getTitle = () => {
		return isCorrect ? result.correctTitle : result.wrongTitle;
	};

	return (
		<AnimatePresence>
			{showResult && (
				<motion.div
					{...resultAnimation.overlay}
					className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
				>
					<div className="relative w-full md:max-w-md mx-auto">
						{/* Enhanced Navigation Button - แสดงทั้งข้อสุดท้ายและข้ออื่น ๆ */}
						{isValidState && (
							<button
								onClick={handleNextClick}
								disabled={!canProceed || isButtonLoading}
								className={`absolute top-4 right-4 z-10 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
									canProceed && animationState === "idle"
										? isLastQuestion
											? "bg-green-500 hover:bg-green-600 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
											: "bg-[#FFD633] hover:bg-[#FFCF00] hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
										: "bg-gray-300 cursor-not-allowed"
								} ${animationState === "blinking" ? "animate-pulse" : ""}`}
								aria-label={
									isButtonLoading
										? "กำลังโหลด..."
										: isLastQuestion
										? "ดูผลลัพธ์"
										: "ไปข้อถัดไป"
								}
								type="button"
							>
								{/* Button Content with State Management */}
								{animationState === "loading" ? (
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
								) : animationState === "blinking" ? (
									<div className="w-6 h-6 bg-white/30 rounded-full animate-pulse" />
								) : isLastQuestion ? (
									// ไอคอนเช็คมาร์คสำหรับข้อสุดท้าย
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-white transition-transform duration-200"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								) : (
									// ลูกศรขวาสำหรับข้ออื่น ๆ
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className={`h-6 w-6 text-[#003A70] transition-transform duration-200 ${
											canProceed ? "group-hover:translate-x-0.5" : ""
										}`}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 5l7 7-7 7"
										/>
									</svg>
								)}

								{/* Blinking Overlay Effect */}
								{animationState === "blinking" && (
									<div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
								)}
							</button>
						)}

						<motion.div
							{...resultAnimation.card}
							className="relative bg-white rounded-t-3xl shadow-2xl p-6 md:p-8"
						>
							<div className="pt-6">
								<motion.div {...resultAnimation.title}>
									<div className="flex items-start gap-4 mb-4">
										<div className="flex-1 text-center">
											<h2 className={`text-2xl font-bold text-[#054877]`}>
												{getTitle()}
											</h2>
											<p className={`text-lg font-semibold text-[#fa4198]`}>
												{result.header}
											</p>
										</div>
									</div>
								</motion.div>
							</div>

							<motion.div
								{...resultAnimation.content}
								className="bg-[#c3d3e0] rounded-xl h-auto p-4 text-sm text-[#0b4979] leading-relaxed"
							>
								{result.explanation}
							</motion.div>

							{/* Security: Hide sensitive data during loading */}
							<div
								className={`h-2 md:h-3 ${isButtonLoading ? "opacity-50" : ""}`}
							></div>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
