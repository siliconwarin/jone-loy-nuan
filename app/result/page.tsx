"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuizResultStore } from "@/store/quiz-store";
import { RotateCcw, Home } from "lucide-react";
import { useEffect, useMemo } from "react";

export default function ResultPage() {
	const router = useRouter();
	const { getSummary, resetQuiz, saveQuizSummaryToApi } = useQuizResultStore();
	const { score, total } = getSummary();

	// 📞 Save summary to API when page loads
	useEffect(() => {
		saveQuizSummaryToApi();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 🎯 Result design mapping (ตามดีไซน์ใหม่)
	const resultDesign = useMemo(() => {
		const scoreOutOfTen = total > 0 ? Math.round((score / total) * 10) : 0;

		if (scoreOutOfTen <= 3) {
			return {
				scoreLabel: `${scoreOutOfTen}/10`,
				title: "คุณเสี่ยงตกเป็นเหยื่อมิจฉาชีพ",
				imageSrc: "/images/results/risk-high.svg",
				imageAlt: "ผลลัพธ์ความเสี่ยงสูง (3/10)",
				tips: [
					"อย่าหลงเชื่อเมื่อมีคนเสนอเงินหรือขู่บังคับ",
					"ปรึกษาคนรอบข้าง และค้นหาข้อมูลก่อน",
					"ห้ามโอนเงิน หากเผลอโอนแล้วอย่าโอนเพิ่ม",
					"ถ้าถูกหลอก ติดต่อสายด่วน 1441 เท่านั้น",
				],
			} as const;
		}

		if (scoreOutOfTen < 9) {
			return {
				scoreLabel: `${scoreOutOfTen}/10`,
				title: "คุณพอจับพิรุธมิจฉาชีพได้",
				imageSrc: "/images/results/risk-medium.svg",
				imageAlt: "ผลลัพธ์ระดับกลาง (7/10)",
				tips: [
					"อย่าเชื่อข้อเสนอที่ดีเกินจริง แม้ดูน่าเชื่อถือ",
					"ตรวจสอบชื่อบัญชี เบอร์โทร และเว็บไซต์ทุกครั้ง",
					"ไม่โอนเงินให้ และหยุดทันทีหากถูกจูงใจเพิ่ม",
					"หากสงสัยว่าจะถูกโกง ติดต่อสายด่วน 1441",
				],
			} as const;
		}

		return {
			scoreLabel: `${scoreOutOfTen}/10`,
			title: "คุณรู้เท่าทันมิจฉาชีพ",
			imageSrc: "/images/results/risk-low.svg",
			imageAlt: "ผลลัพธ์ดีมาก (10/10)",
			tips: [
				"แยกแยะข้อเสนอหลอกลวงและรู้ทันกลโกงได้",
				"มีทักษะด้านความปลอดภัยไซเบอร์",
				"ย้ำเตือนคนรอบข้าง ไม่ให้แชร์หรือโอนเงิน",
				"หากพบคนถูกหลอก ส่งต่อข้อมูลให้โทร 1441",
			],
		} as const;
	}, [score, total]);

	// 🎨 Animation Variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	// 🔄 Handle Actions
	const handlePlayAgain = () => {
		resetQuiz();
		router.push("/quiz");
	};

	const handleGoHome = () => {
		resetQuiz();
		router.push("/");
	};

	return (
		<motion.div
			className="min-h-[100svh] bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center py-4 px-4 md:py-8 overflow-y-auto"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="w-full h-max max-w-3xl">
				{/* 🎴 Main Card (Vertical layout) */}
				<motion.div variants={itemVariants} className="my-[10vh]">
					<Card className="border-2 border-slate-200 bg-white shadow-xl">
						<CardHeader className="pb-4 md:pb-6">
							<div className="flex flex-col items-center text-center gap-2 md:gap-3">
								<span className="text-3xl md:text-4xl font-extrabold tracking-tight text-indigo-900">
									{resultDesign.scoreLabel}
								</span>
								{"imageSrc" in resultDesign && (
									<Image
										src={(resultDesign as any).imageSrc}
										alt={(resultDesign as any).imageAlt}
										width={240}
										height={240}
										className="w-56 h-56 md:w-72 md:h-72 rounded-xl object-contain"
										priority={false}
									/>
								)}
								<CardTitle className="mt-1 md:mt-2 text-xl md:text-2xl font-bold text-rose-600">
									{resultDesign.title}
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="rounded-2xl border bg-blue-50 border-blue-200 p-4 md:p-5">
								<ul className="list-disc marker:text-blue-900 pl-5 space-y-2 md:space-y-3 text-slate-800">
									{resultDesign.tips.map((tip, index) => (
										<motion.li
											key={index}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.4 + index * 0.12 }}
											className="text-sm md:text-base"
										>
											{tip}
										</motion.li>
									))}
								</ul>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* 🎮 Actions */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col sm:flex-row gap-3 md:gap-4"
				>
					<Button
						onClick={handlePlayAgain}
						className="flex-1 h-11 md:h-12 text-base md:text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
					>
						<RotateCcw className="mr-2 h-4 w-4 md:h-5 md:w-5" />
						เล่นใหม่
					</Button>
					<Button
						onClick={handleGoHome}
						className="flex-1 h-11 md:h-12 text-base md:text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
					>
						<Home className="mr-2 h-4 w-4 md:h-5 md:w-5" />
						กลับหน้าแรก
					</Button>
				</motion.div>
			</div>
		</motion.div>
	);
}
