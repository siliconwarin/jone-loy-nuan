"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { useQuizStore } from "@/store/quiz-store";
import { CheckCircle, Trophy, RotateCcw, Home } from "lucide-react";

export default function ResultPage() {
	const router = useRouter();
	const { getTotalScore, resetQuiz } = useQuizStore();
	const totalScore = getTotalScore();

	// 🎯 Score Analysis
	const getScoreAnalysis = (score: number) => {
		if (score >= 6) {
			return {
				level: "ยอดเยี่ยม!",
				color: "text-green-600",
				bgColor: "bg-green-50",
				borderColor: "border-green-200",
				emoji: "🏆",
				message: "คุณมีความรู้ในการป้องกันการหลอกลวงออนไลน์อย่างดีเยี่ยม!",
				tips: [
					"คุณสามารถระบุ Red Flags ได้แม่นยำ",
					"ความรู้ของคุณช่วยป้องกันตัวเองได้ดี",
					"แบ่งปันความรู้ให้คนรอบข้างด้วย",
				],
			};
		} else if (score >= 4) {
			return {
				level: "ดีมาก!",
				color: "text-blue-600",
				bgColor: "bg-blue-50",
				borderColor: "border-blue-200",
				emoji: "🎯",
				message: "คุณมีความรู้พื้นฐานที่ดี แต่ยังสามารถเรียนรู้เพิ่มเติมได้",
				tips: [
					"ศึกษา Red Flags เพิ่มเติม",
					"ระมัดระวังการแชร์ข้อมูลส่วนตัว",
					"ตรวจสอบความน่าเชื่อถือก่อนตัดสินใจ",
				],
			};
		} else {
			return {
				level: "ควรระวัง",
				color: "text-orange-600",
				bgColor: "bg-orange-50",
				borderColor: "border-orange-200",
				emoji: "⚠️",
				message: "คุณควรเรียนรู้เพิ่มเติมเพื่อป้องกันการถูกหลอกลวง",
				tips: [
					"ศึกษารูปแบบการหลอกลวงออนไลน์",
					"ไม่เชื่อข้อเสนอที่ดีเกินจริง",
					"ปรึกษาคนรอบข้างก่อนตัดสินใจ",
				],
			};
		}
	};

	const analysis = getScoreAnalysis(totalScore);

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
			className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8 px-4"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="max-w-2xl mx-auto">
				{/* 🏆 Main Result Card */}
				<motion.div variants={itemVariants}>
					<Card
						className={`mb-8 border-2 ${analysis.borderColor} ${analysis.bgColor} shadow-xl`}
					>
						<CardHeader className="text-center">
							<motion.div
								className="text-6xl mb-4"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
							>
								{analysis.emoji}
							</motion.div>
							<CardTitle className={`text-3xl font-bold ${analysis.color}`}>
								{analysis.level}
							</CardTitle>
							<CardDescription className="text-lg text-gray-700 mt-2">
								คะแนนของคุณ:{" "}
								<span className="font-bold text-2xl">{totalScore}/7</span>
							</CardDescription>
						</CardHeader>
						<CardContent className="text-center">
							<p className="text-gray-700 text-lg leading-relaxed">
								{analysis.message}
							</p>
						</CardContent>
					</Card>
				</motion.div>

				{/* 💡 Tips & Recommendations */}
				<motion.div variants={itemVariants}>
					<Card className="mb-8 shadow-lg">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								💡 คำแนะนำสำหรับคุณ
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-3">
								{analysis.tips.map((tip, index) => (
									<motion.li
										key={index}
										className="flex items-start gap-3"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 1 + index * 0.2 }}
									>
										<CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
										<span className="text-gray-700">{tip}</span>
									</motion.li>
								))}
							</ul>
						</CardContent>
					</Card>
				</motion.div>

				{/* 📊 Score Breakdown */}
				<motion.div variants={itemVariants}>
					<Card className="mb-8 shadow-lg">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								📊 สรุปผลคะแนน
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<span className="text-gray-600">คะแนนที่ได้</span>
									<span className="font-bold text-lg">{totalScore} คะแนน</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">คะแนนเต็ม</span>
									<span className="font-bold text-lg">7 คะแนน</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">เปอร์เซ็นต์</span>
									<span className="font-bold text-lg text-blue-600">
										{Math.round((totalScore / 7) * 100)}%
									</span>
								</div>

								{/* Progress Bar */}
								<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
									<motion.div
										className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
										initial={{ width: 0 }}
										animate={{ width: `${(totalScore / 7) * 100}%` }}
										transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* 🎮 Action Buttons */}
				<motion.div variants={itemVariants} className="flex gap-4">
					<Button
						onClick={handlePlayAgain}
						className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
					>
						<RotateCcw className="mr-2 h-5 w-5" />
						เล่นใหม่
					</Button>
					<Button
						onClick={handleGoHome}
						variant="outline"
						className="flex-1 h-12 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-200"
					>
						<Home className="mr-2 h-5 w-5" />
						กลับหน้าแรก
					</Button>
				</motion.div>

				{/* 🙏 Thank You Message */}
				<motion.div
					variants={itemVariants}
					className="text-center mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl"
				>
					<p className="text-gray-600">
						ขอบคุณที่ใช้เวลาทำแบบทดสอบและแบบสอบถาม 🙏
						<br />
						ข้อมูลของคุณจะช่วยให้เราปรับปรุงระบบให้ดีขึ้น
					</p>
				</motion.div>
			</div>
		</motion.div>
	);
}
