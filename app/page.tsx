"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuizAnimations } from "@/hooks/useQuizAnimations";
import Image from "next/image";

export default function Home() {
	const { getLandingPageAnimation } = useQuizAnimations(false);
	const landingAnimation = getLandingPageAnimation();

	return (
		<motion.div
			className="min-h-screen bg-blue-50 px-4 py-8 flex flex-col justify-center items-center w-full safe-height pb-8"
			{...landingAnimation.container}
		>
			<div className="relative z-10 flex flex-col items-center w-full max-w-sm">
				{/* Header Section */}
				<motion.div className="text-center mb-8" {...landingAnimation.title}>
					<motion.h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
						สแกนโจร.online
					</motion.h1>
					<motion.p
						className="text-blue-900 text-base font-medium"
						{...landingAnimation.subtitle}
					>
						แบบทดสอบความรู้เท่าทันมิจฉาชีพ
					</motion.p>
				</motion.div>

				{/* Main Illustration */}
				<motion.div
					className="relative mb-8 w-full aspect-square overflow-hidden"
					{...landingAnimation.card}
				>
					<Image
						src="/cover-01.svg"
						alt="สแกนโจร.online"
						fill
						className="object-contain p-4"
					/>
				</motion.div>

				{/* CTA Button */}
				<motion.div className="w- mb-8 px-8" {...landingAnimation.cta}>
					<Button
						asChild
						className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold rounded-full"
						size="xl"
					>
						<Link href="/quiz">เริ่มทำแบบทดสอบ</Link>
					</Button>
				</motion.div>

				{/* Footer with Logos */}
				<motion.div
					className="w-full flex items-center justify-center space-x-6 bg-white rounded-2xl px-4 shadow-md"
					{...landingAnimation.footer}
				>
					<div className="flex items-center">
						<Image
							src="/Logo_TMF_left.svg"
							alt="กองทุนพัฒนาสื่อ ปลอดภัยและสร้างสรรค์"
							width={0}
							height={0}
							quality={100}
							className="w-full h-auto object-contain"
						/>
					</div>
					<div className="flex items-center justify-center scale-90">
						<Image
							src="/Logo_BoT_right.svg"
							alt="ธนาคารแห่งประเทศไทย"
							width={0}
							height={0}
							quality={100}
							className="w-full h-auto object-contain"
						/>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
}
