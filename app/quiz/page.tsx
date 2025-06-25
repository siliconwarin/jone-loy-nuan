"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AnswerButton } from "./component/answerButton";

// Simplified answer options
const answerOptions = [
	{ id: "a", text: "ข้อมูลหลุดแน่! ถึงพร่องของเรา" },
	{ id: "b", text: "บริษัทไม่มาหาก่อน ตรวจสอบเอาละย่อ" },
	{ id: "c", text: "ติ่ง รับส่งข้อมูล เพราะได้เงินยอะ" },
];

export default function QuizPage() {
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [showResult, setShowResult] = useState(false);

	const handleAnswerSelect = (answerId: string) => {
		setSelectedAnswer(answerId);
		setTimeout(() => setShowResult(true), 800);
	};

	const resetQuiz = () => {
		setSelectedAnswer(null);
		setShowResult(false);
	};

	return (
		<motion.div
			className="h-screen flex flex-col relative overflow-hidden"
			animate={{
				background: showResult
					? "linear-gradient(to bottom, #1e293b, #0f172a)"
					: "linear-gradient(to bottom, #dbeafe, #bfdbfe)",
			}}
			transition={{ duration: 1.2, ease: "easeInOut" }}
		>
			<div className="max-w-2xl w-full mx-auto flex flex-col flex-grow p-4 sm:p-6 justify-center relative">
				<div className="flex flex-col items-center justify-center">
					<div className="h-16 flex-1/4 items-center justify-center">
						{/* Question Section */}
						<AnimatePresence>
							{!showResult && (
								<motion.h2
									className="text-lg font-medium text-gray-800 text-center leading-relaxed"
									initial={{ opacity: 1, y: 0 }}
									exit={{
										opacity: 0,
										y: -30,
										transition: { duration: 0.6, ease: "easeInOut" },
									}}
								>
									ถ้าคุณกำลังรอพัสดุ แล้วได้ SMS แจ้งว่าพัสดุเสียหาย
									<br />
									และมีเจ้าหน้าที่เสนอเงินชดเชย คุณจะ...?
								</motion.h2>
							)}
						</AnimatePresence>
					</div>

					<div className="py-4 w-full flex-1/2">
						{/* Content Image */}
						<motion.div
							className="w-full max-w-sm mx-auto"
							transition={{
								duration: 1.2,
								ease: "easeInOut",
								delay: showResult ? 0.4 : 0,
							}}
							animate={
								showResult
									? { y: -120, scale: 1, opacity: 0.3 }
									: { y: 0, scale: 1, opacity: 1 }
							}
						>
							<Image
								src="/chat-ui.svg"
								alt="Chat UI Mockup showing SMS scam message"
								width={675}
								height={675}
								className="w-full h-auto mx-auto rounded-lg shadow-xl overflow-hidden"
								priority
							/>
						</motion.div>
					</div>

					<div className="min-h-[200px] flex flex-col justify-start">
						{/* Answer Buttons Section */}
						<AnimatePresence>
							{!showResult && (
								<motion.div
									initial={{ opacity: 1, y: 0 }}
									exit={{
										opacity: 0,
										y: 50,
										transition: { duration: 0.8, ease: "easeInOut" },
									}}
									className="w-full flex flex-col items-center space-y-4"
								>
									{answerOptions.map((option, index) => (
										<motion.div
											key={option.id}
											initial={{ opacity: 1, scale: 1 }}
											exit={{
												opacity: 0,
												scale: 0.9,
												transition: {
													duration: 0.5,
													delay: index * 0.1,
													ease: "easeInOut",
												},
											}}
										>
											<AnswerButton
												onClick={() => handleAnswerSelect(option.id)}
												disabled={selectedAnswer !== null}
											>
												{option.text}
											</AnswerButton>
										</motion.div>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>

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
										delay: 1.6, // รอให้ image content เลื่อนเสร็จก่อน
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
									{/* ข้อความหัวข้อ - Animation แยกต่างหาก */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{
											opacity: 1,
											y: 0,
											transition: {
												delay: 2.2, // หลังจากการ์ดขึ้นมาแล้ว 0.6 วินาที
												duration: 0.6,
												ease: "easeOut",
											},
										}}
									>
										<h2 className="text-2xl font-bold text-pink-500">
											นี่คือมิจฉาชีพ
										</h2>
										<p className="text-lg font-semibold text-pink-500 mb-4">
											หลอกให้โอนเงิน
										</p>
									</motion.div>

									{/* เนื้อหารายละเอียด - Animation แยกต่างหาก */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{
											opacity: 1,
											y: 0,
											transition: {
												delay: 2.6, // หลังจากหัวข้อแล้ว 0.4 วินาที
												duration: 0.6,
												ease: "easeOut",
											},
										}}
										className="bg-gray-100 rounded-xl p-4 text-sm text-gray-800 leading-relaxed"
									>
										หากได้รับ SMS อ้างว่าจะคืนเงิน อย่าเร่งตอบกลับ
										เพราะบริษัทจริงจะไม่แนบลิงก์และไม่ถามข้อมูลส่วนตัว
										ควรติดต่อสอบถามกับบริษัทโดยตรงเพื่อความปลอดภัย
									</motion.div>

									{/* ปุ่ม - Animation แยกต่างหาก */}
									<motion.button
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{
											opacity: 1,
											scale: 1,
											transition: {
												delay: 3.0, // หลังจากเนื้อหาแล้ว 0.4 วินาที
												duration: 0.5,
												type: "spring",
												stiffness: 200,
												damping: 15,
											},
										}}
										onClick={resetQuiz}
										className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
									>
										รับทราบ
									</motion.button>
								</div>
							</motion.div>

							{/* แถบสีชมพู - Animation ที่แตกต่างและปรากฏสุดท้าย */}
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
										delay: 3.5, // ปรากฏหลังจากปุ่มเสร็จแล้ว 0.5 วินาที
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
								className="absolute top-0 left-1/2 -translate-x-1/2 w-11/12 h-20 bg-pink-500 rounded-2xl z-20 shadow-lg"
								style={{
									transformOrigin: "center bottom",
								}}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
