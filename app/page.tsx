"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
	return (
		<motion.div
			className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex flex-col items-center justify-center p-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 2.4, duration: 0.4, ease: "easeIn" }}
		>
			<motion.div
				className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-pink-100"
				initial={{ opacity: 0, y: 30, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ delay: 2.6, duration: 0.5, ease: "easeOut" }}
			>
				<motion.h1
					className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 2.8, duration: 0.4 }}
				>
					Jone Loy Nuan
				</motion.h1>

				<motion.p
					className="text-rose-600/80 mb-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 3.0, duration: 0.4 }}
				>
					Scam Awareness Quiz
				</motion.p>

				{/* CTA Button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 3.2, duration: 0.4 }}
				>
					<Button
						className="block w-full bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl border-0"
						asChild
					>
						<Link href="/quiz">
							<motion.span
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="mx-auto"
							>
								เริ่มทำแบบทดสอบ
							</motion.span>
						</Link>
					</Button>
				</motion.div>
			</motion.div>

			{/* Footer */}
			<motion.p
				className="text-xs text-rose-500/70 mt-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 3.4, duration: 0.4 }}
			>
				ป้องกันตัวเองจากการโกงออนไลน์ เริ่มต้นที่นี่
			</motion.p>
		</motion.div>
	);
}
