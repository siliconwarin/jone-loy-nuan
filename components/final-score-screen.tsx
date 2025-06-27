"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FinalScoreScreenProps {
	score: number;
	totalQuestions: number;
	onRestart: () => void;
}

export const FinalScoreScreen = ({
	score,
	totalQuestions,
	onRestart,
}: FinalScoreScreenProps) => {
	const percentage = (score / totalQuestions) * 100;

	const getScoreMessage = () => {
		if (percentage >= 80) {
			return {
				title: "ยอดเยี่ยม! 🎉",
				message: "คุณมีความรู้เรื่องการป้องกันการโกงออนไลน์ในระดับดี",
				color: "text-green-600",
				bgColor: "bg-green-50",
			};
		} else if (percentage >= 60) {
			return {
				title: "ดีมาก! 👍",
				message: "คุณมีความรู้พื้นฐานที่ดี แต่ควรศึกษาเพิ่มเติม",
				color: "text-blue-600",
				bgColor: "bg-blue-50",
			};
		} else {
			return {
				title: "ควรศึกษาเพิ่มเติม 📚",
				message: "คุณควรเรียนรู้เพิ่มเติมเกี่ยวกับการป้อง���ันการโกงออนไลน์",
				color: "text-orange-600",
				bgColor: "bg-orange-50",
			};
		}
	};

	const scoreInfo = getScoreMessage();

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center p-4"
		>
			<div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<h1 className="text-3xl font-bold text-gray-800 mb-4">
						เสร็จสิ้นแล้ว!
					</h1>

					<div className={`${scoreInfo.bgColor} rounded-2xl p-6 mb-6`}>
						<h2 className={`text-2xl font-bold ${scoreInfo.color} mb-2`}>
							{scoreInfo.title}
						</h2>
						<p className="text-gray-700 mb-4">{scoreInfo.message}</p>

						<div className="text-4xl font-bold text-gray-800 mb-2">
							{score}/{totalQuestions}
						</div>
						<div className="text-lg text-gray-600">
							{percentage.toFixed(0)}% ถูกต้อง
						</div>
					</div>

					<div className="space-y-4">
						<Button
							onClick={onRestart}
							className="w-full bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
						>
							ทำแบบทดสอบอีกครั้ง
						</Button>

						<Button
							variant="outline"
							asChild
							className="w-full border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
						>
							<Link href="/">กลับหน้าหลัก</Link>
						</Button>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};
