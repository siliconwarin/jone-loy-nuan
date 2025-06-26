"use client";

import { motion, AnimatePresence } from "framer-motion";

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
}

export const ResultCard = ({
	showResult,
	isCorrect,
	result,
	onReset,
}: ResultCardProps) => {
	const getTitle = () => {
		return isCorrect ? result.correctTitle : result.wrongTitle;
	};

	const getTitleColor = () => {
		return isCorrect ? "text-green-500" : "text-pink-500";
	};

	const getTopBarColor = () => {
		return isCorrect ? "bg-green-500" : "bg-pink-500";
	};

	return (
		<AnimatePresence>
			{showResult && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="absolute inset-0 flex items-end justify-center p-4 md:p-8 mb-8"
				>
					<div className="relative w-full max-w-sm pt-10">
						{/* การ์ดสีขาว (เนื้อหาหลัก) */}
						<motion.div
							initial={{ y: "100vh", opacity: 0 }}
							animate={{
								y: 0,
								opacity: 1,
								transition: {
									type: "spring",
									stiffness: 90,
									damping: 15,
									delay: 1.6,
								},
							}}
							exit={{
								y: "100vh",
								opacity: 0,
								transition: { duration: 0.4, ease: "easeInOut" },
							}}
							className="relative bg-white rounded-3xl shadow-2xl p-6 z-10"
						>
							<div className="text-center pt-8">
								{/* ข้อความหัวข้อ */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{
										opacity: 1,
										y: 0,
										transition: {
											delay: 2.2,
											duration: 0.6,
											ease: "easeOut",
										},
									}}
								>
									<h2 className={`text-2xl font-bold ${getTitleColor()}`}>
										{getTitle()}
									</h2>
									<p
										className={`text-lg font-semibold ${getTitleColor()} mb-4`}
									>
										{result.header}
									</p>
								</motion.div>

								{/* เนื้อหารายละเอียด */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{
										opacity: 1,
										y: 0,
										transition: {
											delay: 2.6,
											duration: 0.6,
											ease: "easeOut",
										},
									}}
									className="bg-gray-100 rounded-xl p-4 text-sm text-gray-800 leading-relaxed"
								>
									{result.explanation}
								</motion.div>

								{/* ปุ่ม */}
								<motion.button
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{
										opacity: 1,
										scale: 1,
										transition: {
											delay: 3.0,
											duration: 0.5,
											type: "spring",
											stiffness: 200,
											damping: 15,
										},
									}}
									onClick={onReset}
									className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
								>
									รับทราบ
								</motion.button>
							</div>
						</motion.div>

						{/* แถบสีด้านบน */}
						<motion.div
							initial={{
								opacity: 0,
								scale: 0.3,
								y: -50,
								rotateX: -90,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								y: 0,
								rotateX: 0,
								transition: {
									type: "spring",
									stiffness: 150,
									damping: 10,
									delay: 3.5,
									duration: 0.8,
								},
							}}
							exit={{
								opacity: 0,
								scale: 0.3,
								y: -50,
								rotateX: -90,
								transition: {
									duration: 0.3,
									ease: "easeInOut",
								},
							}}
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
