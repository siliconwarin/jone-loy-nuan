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
			className="min-h-screen bg-gradient-bg flex flex-col items-center justify-center p-4 relative overflow-hidden"
			{...landingAnimation.container}
		>
			<div className="relative z-10 flex flex-col items-center max-w-md w-full">
				<motion.h1
					className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2"
					{...landingAnimation.title}
				>
					สแกนโจร.online
				</motion.h1>

				<motion.p
					className="text-rose-600/80 mb-8 text-center text-lg font-medium"
					{...landingAnimation.subtitle}
				>
					แบบทดสอบความรู้เท่าทันมิจฉาชีพ
				</motion.p>
				<motion.div
					className="w-full aspect-square max-w-[375px] bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl/20 mb-12 overflow-hidden"
					{...landingAnimation.card}
				>
					<Image
						src="/cover-01.svg"
						alt="สแกนโจร.online"
						fill
						className="object-contain rounded-3xl"
					/>
				</motion.div>
				{/* CTA Button */}
				<motion.div {...landingAnimation.cta}>
					<Button
						asChild
						className="w-full shadow-xl bg-amber-300 text-blue-950"
						size="lg"
					>
						<Link href="/quiz">เริ่มทำแบบทดสอบ</Link>
					</Button>
				</motion.div>
				{/* Footer */}
				<motion.div
					className="flex flex-wrap items-center justify-center gap-6 md:gap-12 w-full mt-4"
					{...landingAnimation.footer}
				>
					<div className="w-1/2 max-w-[160px]">
						<Image
							src="/Logo_TMF_left.svg"
							alt="กองทุนพัฒนาสื่อ ปลอดภัยและสร้างสรรค์"
							width={0}
							height={0}
							sizes="100vw"
							className="w-full h-auto object-contain"
						/>
					</div>
					<div className="w-1/2 max-w-[160px]">
						<Image
							src="/Logo_BoT_right.svg"
							alt="ธนาคารแห่งประเทศไทย"
							width={0}
							height={0}
							sizes="100vw"
							className="w-full h-auto object-contain"
						/>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
}
