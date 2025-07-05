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
					className="absolute inset-0 flex items-end justify-center p-4 md:p-8 mb-8"
				>
					<div className="relative w-full max-w-xs md:max-w-md pt-6">
						<motion.div
							{...resultAnimation.card}
							className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 z-10"
						>
							<div className="pt-4">
								<motion.div {...resultAnimation.title}>
									<div className="flex items-start gap-4 mb-4">
										<div className="w-10 h-10 bg-pink-500 rounded-md flex-shrink-0" />
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
								className="bg-gray-100 rounded-xl p-4 text-sm text-gray-800 leading-relaxed"
							>
								{result.explanation}
							</motion.div>

							<motion.button
								{...resultAnimation.button}
								onClick={handleReset}
								disabled={isButtonLoading}
								className={`
									mt-6 mx-auto w-full max-w-[260px] px-6 py-3 rounded-lg font-semibold text-[#003A70]
									transition-all duration-200 ease-in-out
									${
										isButtonLoading
											? "bg-yellow-300 opacity-70"
											: "bg-[#FFD633] hover:bg-[#FFCF00]"
									}
								`}
								whileTap={isButtonLoading ? {} : { scale: 0.97 }}
								style={{ pointerEvents: isButtonLoading ? "none" : "auto" }}
							>
								{isButtonLoading ? (
									<>
										<LoadingSpinner />
										<span>กำลังดำเนินการ...</span>
									</>
								) : (
									<span>{getButtonLabel()}</span>
								)}
							</motion.button>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
