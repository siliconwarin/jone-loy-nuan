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
	const [internalLoading, setInternalLoading] = useState(false);

	const { getResultCardAnimation } = useQuizAnimations(showResult);
	const resultAnimation = getResultCardAnimation();

	const isButtonLoading = isLoading || internalLoading;

	const handleReset = async () => {
		if (isButtonLoading) return;

		setInternalLoading(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 300));
			onReset();
		} catch (error) {
			console.error("Reset error:", error);
		} finally {
			setTimeout(() => setInternalLoading(false), 500);
		}
	};

	const getTitle = () => {
		return isCorrect ? result.correctTitle : result.wrongTitle;
	};

	const getTitleColor = () => {
		return isCorrect ? "text-green-500" : "text-pink-500";
	};

	const getButtonLabel = () =>
		isButtonLoading
			? "กำลังดำเนินการ..."
			: isLastQuestion
			? "ทำแบบสอบถาม"
			: "รับทราบ";

	const LoadingSpinner = () => (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			className="inline-flex items-center justify-center"
		>
			<svg
				className="animate-spin h-5 w-5 text-white"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"
				></circle>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		</motion.div>
	);

	return (
		<AnimatePresence>
			{showResult && (
				<motion.div
					{...resultAnimation.overlay}
					className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
				>
					<div className="relative w-full max-w-xs md:max-w-md mx-auto">
						{/* ปุ่มลูกศรขวาบน */}
						{!isButtonLoading && !isLastQuestion && (
							<button
								onClick={handleReset}
								className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#FFD633] hover:bg-[#FFCF00] shadow transition focus:outline-none"
								aria-label="ถัดไป"
								type="button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-[#003A70]"
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
											<h2 className={`text-2xl font-bold ${getTitleColor()}`}>
												{getTitle()}
											</h2>
											<p className={`text-lg font-semibold ${getTitleColor()}`}>
												{result.header}
											</p>
										</div>
									</div>
								</motion.div>
							</div>

							<motion.div
								{...resultAnimation.content}
								className=" bg-[#c3d3e0] rounded-xl p-4 text-sm text-[#0b4979] leading-relaxed"
							>
								{result.explanation}
							</motion.div>

							<div className="h-2 md:h-3"></div>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
