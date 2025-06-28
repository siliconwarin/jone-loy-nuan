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
}

export const ResultCard = ({
	showResult,
	isCorrect,
	result,
	onReset,
	isLoading = false,
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

	const getTopBarColor = () => {
		return isCorrect ? "bg-green-500" : "bg-pink-500";
	};

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
							className="relative bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 z-10"
						>
							<div className="text-center pt-8">
								<motion.div {...resultAnimation.title}>
									<h2 className={`text-2xl font-bold ${getTitleColor()}`}>
										{getTitle()}
									</h2>
									<p
										className={`text-lg font-semibold ${getTitleColor()} mb-4`}
									>
										{result.header}
									</p>
								</motion.div>

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
										mt-6 px-8 py-3 rounded-lg font-medium 
										focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
										transition-all duration-200 ease-in-out
										min-w-[120px] h-[48px] flex items-center justify-center gap-2
										${
											isButtonLoading
												? "bg-blue-400 cursor-not-allowed opacity-80"
												: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
										}
										text-white
									`}
									whileTap={isButtonLoading ? {} : { scale: 0.98 }}
									style={{
										pointerEvents: isButtonLoading ? "none" : "auto",
									}}
								>
									{isButtonLoading ? (
										<>
											<LoadingSpinner />
											<span>กำลังดำเนินการ...</span>
										</>
									) : (
										<span>รับทราบ</span>
									)}
								</motion.button>
							</div>
						</motion.div>

						<motion.div
							{...resultAnimation.topBar}
							className={`absolute top-0 left-1/2 -translate-x-1/2 w-11/12 h-20 ${getTopBarColor()} rounded-2xl z-20 shadow-lg`}
							style={{
								transformOrigin: "center bottom",
							}}
						/>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
