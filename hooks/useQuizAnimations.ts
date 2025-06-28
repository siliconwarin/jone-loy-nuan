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
		const yMove = isMobile ? -60 : isTablet ? -75 : -75;
		const scaleDown = isMobile ? 0.92 : isTablet ? 0.92 : 0.9;
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
		function getAnswerPanelLayoutAnimation(layout: AnswerPanelLayout) {
			const baseAnimation = {
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

			// Layout-specific adjustments
			if (layout === "horizontal") {
				return {
					...baseAnimation,
					// Horizontal layout ใช้ scale น้อยกว่า
					animate: showResult
						? { ...baseAnimation.animate, scale: 0.95 }
						: baseAnimation.animate,
				};
			}

			return baseAnimation;
		}

		/**
		 * Animation สำหรับ Answer Button
		 * (responsive)
		 */
		function getAnswerButtonLayoutAnimation(
			index: number,
			layout: AnswerPanelLayout
		) {
			if (layout === "horizontal") {
				// Horizontal: Stagger จากซ้ายไปขวา
				return {
					initial: { opacity: 0, x: index === 0 ? -20 : 20 },
					animate: { opacity: 1, x: 0 },
					transition: { delay: index * 0.1, duration: 0.3 },
				};
			}

			// Vertical: Stagger จากบนลงล่าง
			return {
				initial: { opacity: 0, y: responsiveValues.buttonY },
				animate: { opacity: 1, y: 0 },
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

		/**
		 * Animation สำหรับ Romance Scam Scenario
		 * (responsive และ state-aware)
		 */
		function getRomanceScenarioAnimation() {
			return {
				// Question state
				question: {
					initial: { opacity: 0, scale: 0.9 },
					animate: { opacity: 1, scale: 1 },
					exit: { opacity: 0, scale: 0.9 },
					transition: { duration: 0.6 },
				},
				// Result state
				result: {
					initial: { opacity: 0, scale: 0.9 },
					animate: { opacity: 1, scale: 1 },
					transition: { duration: 0.8, delay: 0.2 },
				},
			};
		}

		/**
		 * Animation สำหรับ Result Card
		 * (responsive timing และ spring animations)
		 */
		function getResultCardAnimation() {
			return {
				// Overlay background
				overlay: {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
				},
				// Main card
				card: {
					initial: { y: "100vh", opacity: 0 },
					animate: {
						y: 0,
						opacity: 1,
						transition: {
							type: "spring" as const,
							stiffness: 90,
							damping: 15,
							delay: 1.6,
						},
					},
					exit: {
						y: "100vh",
						opacity: 0,
						transition: { duration: 0.4, ease: "easeInOut" as const },
					},
				},
				// Title text
				title: {
					initial: { opacity: 0, y: 20 },
					animate: {
						opacity: 1,
						y: 0,
						transition: {
							delay: 2.2,
							duration: 0.6,
							ease: "easeOut" as const,
						},
					},
				},
				// Content text
				content: {
					initial: { opacity: 0, y: 20 },
					animate: {
						opacity: 1,
						y: 0,
						transition: {
							delay: 2.6,
							duration: 0.6,
							ease: "easeOut" as const,
						},
					},
				},
				// Action button
				button: {
					initial: { opacity: 0, scale: 0.8 },
					animate: {
						opacity: 1,
						scale: 1,
						transition: {
							delay: 3.0,
							duration: 0.5,
							type: "spring" as const,
							stiffness: 200,
							damping: 15,
						},
					},
				},
				// Top colored bar
				topBar: {
					initial: {
						opacity: 0,
						scale: 0.3,
						y: -50,
						rotateX: -90,
					},
					animate: {
						opacity: 1,
						scale: 1,
						y: 0,
						rotateX: 0,
						transition: {
							type: "spring" as const,
							stiffness: 150,
							damping: 10,
							delay: 3.5,
							duration: 0.8,
						},
					},
					exit: {
						opacity: 0,
						scale: 0.3,
						y: -50,
						rotateX: -90,
						transition: {
							duration: 0.3,
							ease: "easeInOut" as const,
						},
					},
				},
			};
		}

		/**
		 * Animation สำหรับ Landing Page
		 * (staggered entry sequence)
		 */
		function getLandingPageAnimation() {
			return {
				// Main container
				container: {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: { delay: 2.4, duration: 0.4, ease: "easeIn" as const },
				},
				// Card container
				card: {
					initial: { opacity: 0, y: 30, scale: 0.95 },
					animate: { opacity: 1, y: 0, scale: 1 },
					transition: { delay: 2.6, duration: 0.5, ease: "easeOut" as const },
				},
				// Title
				title: {
					initial: { opacity: 0, y: 20 },
					animate: { opacity: 1, y: 0 },
					transition: { delay: 2.8, duration: 0.4 },
				},
				// Subtitle
				subtitle: {
					initial: { opacity: 0, y: 20 },
					animate: { opacity: 1, y: 0 },
					transition: { delay: 3.0, duration: 0.4 },
				},
				// CTA Button
				cta: {
					initial: { opacity: 0, y: 20 },
					animate: { opacity: 1, y: 0 },
					transition: { delay: 3.2, duration: 0.4 },
					// Interactive states
					hover: { scale: 1.02 },
					tap: { scale: 0.98 },
				},
				// Footer
				footer: {
					initial: { opacity: 0, y: 20 },
					animate: { opacity: 1, y: 0 },
					transition: { delay: 3.4, duration: 0.4 },
				},
			};
		}

		return {
			// Content animations
			getContentMotionProps,
			getChatScenarioMotionProps,
			getChatBubbleAnimation,

			// UI component animations
			getAnswerPanelLayoutAnimation,
			getAnswerButtonLayoutAnimation,
			getQuestionExitAnimation,

			// Environment animations
			getBackgroundAnimation,
			getRedFlagAnimation,

			// Page-specific animations
			getRomanceScenarioAnimation,
			getResultCardAnimation,
			getLandingPageAnimation,

			// Utility
			getStaggeredTextVariants,
		};
	}, [showResult, responsiveValues]); // เพิ่ม responsiveValues เป็น dependency

	return animations;
};
