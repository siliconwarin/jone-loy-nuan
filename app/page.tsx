"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";

export default function Home() {
	// 🎨 Animation Logic - ใช้จาก centralized hook
	const { getLandingPageAnimation } = useQuizAnimations(false);
	const landingAnimation = getLandingPageAnimation();

	return (
		<motion.div
			className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex flex-col items-center justify-center p-4"
			{...landingAnimation.container}
		>
			<motion.div
				className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-pink-100"
				{...landingAnimation.card}
			>
				<motion.h1
					className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2"
					{...landingAnimation.title}
				>
					Jone Loy Nuan
				</motion.h1>

				<motion.p
					className="text-rose-600/80 mb-6"
					{...landingAnimation.subtitle}
				>
					Scam Awareness Quiz
				</motion.p>

				{/* CTA Button */}
				<motion.div {...landingAnimation.cta}>
					<Button asChild className="w-full">
						<Link href="/quiz">เริ่มทำแบบทดสอบ</Link>
					</Button>
				</motion.div>
			</motion.div>

			{/* Footer */}
			<motion.p
				className="text-xs text-rose-500/70 mt-6"
				{...landingAnimation.footer}
			>
				ป้องกันตัวเองจากการโกงออนไลน์ เริ่มต้นที่นี่
			</motion.p>
		</motion.div>
	);
}
