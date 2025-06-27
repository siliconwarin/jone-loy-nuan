"use client";

import { useMemo, useEffect, useState } from "react";

/**
 * Hook สำหรับตรวจสอบขนาดหน้าจอและปรับ animation ตาม device
 */
function useScreenSize() {
	const [screenSize, setScreenSize] = useState({
		width: typeof window !== "undefined" ? window.innerWidth : 1024,
		height: typeof window !== "undefined" ? window.innerHeight : 768,
	});

	useEffect(() => {
		if (typeof window === "undefined") return;

		function handleResize() {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return screenSize;
}

/**
 * 🎨 Animation Logic - React Compiler Optimized
 * จัดการ animation states และ motion props แยกจาก business logic
 */
export const useQuizAnimations = (showResult: boolean) => {
	const { width, height } = useScreenSize();

	// คำนวณค่า responsive animation ตามขนาดหน้าจอ
	const responsiveValues = useMemo(() => {
		// Breakpoints ตาม Tailwind
		const isMobile = width < 640;
		const isTablet = width >= 640 && width < 1024;
		const isDesktop = width >= 1024;

		// 📱 Mobile: เลื่อนน้อย, 📱 Tablet: กลาง, 🖥️ Desktop: เยอะ
		const yMove = isMobile ? -15 : isTablet ? -25 : -35;
		const scaleDown = isMobile ? 0.95 : isTablet ? 0.92 : 0.9;
		const answerPanelMove = isMobile ? -10 : isTablet ? -15 : -20;
		const questionExitY = isMobile ? -20 : isTablet ? -25 : -30;
		const bubbleY = isMobile ? 15 : 20;
		const bubbleScale = isMobile ? 0.85 : 0.8;
		const buttonY = isMobile ? 15 : 20;

		return {
			yMove,
			scaleDown,
			answerPanelMove,
			questionExitY,
			bubbleY,
			bubbleScale,
			buttonY,
			isMobile,
			isTablet,
			isDesktop,
		};
	}, [width, height]);

	// ใช้ useMemo เพื่อป้องกัน re-creation ของ animation functions
	const animations = useMemo(() => {
		/**
		 * Motion props สำหรับ Content Area
		 * เลื่อนขึ้นข้างบนแทนที่จะหายไป (responsive)
		 */
		function getContentMotionProps() {
			return {
				initial: { opacity: 1, y: 0, scale: 1 },
				animate: showResult
					? {
							y: responsiveValues.yMove,
							scale: responsiveValues.scaleDown,
							opacity: 1,
					  }
					: { y: 0, scale: 1, opacity: 1 },
				transition: {
					duration: 1.0,
					ease: "easeInOut" as const,
					delay: showResult ? 0.2 : 0,
				},
			};
		}

		/**
		 * Motion props สำหรับ Chat Scenario
		 * (responsive)
		 */
		function getChatScenarioMotionProps() {
			return {
				initial: { opacity: 1, y: 0, scale: 1 },
				animate: showResult
					? { y: responsiveValues.yMove, scale: 1, opacity: 1.0 }
					: { y: 0, scale: 1, opacity: 1 },
				transition: {
					duration: 1.0,
					ease: "easeInOut" as const,
					delay: showResult ? 0.2 : 0,
				},
			};
		}

		/**
		 * Animation สำหรับ Chat Bubble
		 * (responsive)
		 */
		function getChatBubbleAnimation() {
			return {
				initial: {
					opacity: 0,
					scale: responsiveValues.bubbleScale,
					y: responsiveValues.bubbleY,
				},
				animate: {
					opacity: 1,
					scale: 1,
					y: 0,
				},
				transition: {
					delay: 0.5,
					duration: 0.6,
					type: "spring" as const,
					stiffness: 200,
					damping: 20,
				},
			};
		}

		/**
		 * Motion props สำหรับ Answer Panel
		 * (responsive)
		 */
		function getAnswerPanelMotionProps() {
			return {
				initial: { opacity: 1, y: 0 },
				animate: showResult
					? {
							opacity: 1,
							y: responsiveValues.answerPanelMove,
							scale: responsiveValues.scaleDown,
					  }
					: { opacity: 1, y: 0, scale: 1 },
				transition: { duration: 0.6, ease: "easeInOut" as const },
			};
		}

		/**
		 * Animation สำหรับ Answer Button
		 * (responsive)
		 */
		function getAnswerButtonAnimation(index: number) {
			return {
				initial: { opacity: 0, y: responsiveValues.buttonY },
				animate: {
					opacity: 1,
					y: 0,
				},
				transition: { delay: index * 0.1, duration: 0.3 },
			};
		}

		/**
		 * Animation สำหรับ Question Exit
		 * (responsive)
		 */
		function getQuestionExitAnimation() {
			return {
				initial: { opacity: 1, y: 0 },
				exit: {
					opacity: 0,
					y: responsiveValues.questionExitY,
				},
				transition: { duration: 0.6, ease: "easeInOut" as const },
			};
		}

		/**
		 * Animation สำหรับ Background Gradient
		 */
		function getBackgroundAnimation(theme: "light" | "dark" = "light") {
			const getBackgroundGradient = () => {
				if (theme === "dark") {
					return showResult
						? "linear-gradient(to bottom, #0f172a, #020617)"
						: "linear-gradient(to bottom, #1e293b, #334155)";
				}

				return showResult
					? "linear-gradient(to bottom, #1e293b, #0f172a)"
					: "linear-gradient(to bottom, #dbeafe, #bfdbfe)";
			};

			return {
				animate: {
					background: getBackgroundGradient(),
				},
				transition: {
					duration: 1.2,
					ease: "easeInOut" as const,
				},
			};
		}

		/**
		 * Red Flag Tooltip Animation
		 */
		function getRedFlagAnimation(delay = 0) {
			return {
				initial: { opacity: 0, scale: 0.8, y: 10 },
				animate: {
					opacity: 1,
					scale: 1,
					y: 0,
					transition: {
						delay: delay,
						duration: 0.4,
						type: "spring" as const,
						stiffness: 200,
						damping: 15,
					},
				},
			};
		}

		/**
		 * Utility: สร้าง Framer Motion variants สำหรับ text ที่ต้องการ stagger ทีละบรรทัด
		 */
		function getStaggeredTextVariants(initialX = -20, baseDelay = 0.15) {
			return {
				hidden: { opacity: 0, x: initialX },
				visible: (i: number) => ({
					opacity: 1,
					x: 0,
					transition: { delay: i * baseDelay },
				}),
			};
		}

		return {
			// Content animations
			getContentMotionProps,
			getChatScenarioMotionProps,
			getChatBubbleAnimation,

			// UI component animations
			getAnswerPanelMotionProps,
			getAnswerButtonAnimation,
			getQuestionExitAnimation,

			// Environment animations
			getBackgroundAnimation,
			getRedFlagAnimation,

			// Utility
			getStaggeredTextVariants,
		};
	}, [showResult, responsiveValues]); // เพิ่ม responsiveValues เป็น dependency

	return animations;
};
