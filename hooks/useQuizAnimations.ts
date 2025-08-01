"use client";

import { useMemo, useEffect, useState, useCallback } from "react";
import type { AnswerPanelLayout } from "@/lib/types";

/**
 * Optimized hook for screen size detection
 */
function useScreenSize() {
	const [screenSize, setScreenSize] = useState<{
		width: number;
		height: number;
	}>(() => ({
		width: 1024,
		height: 768,
	}));

	const handleResize = useCallback(() => {
		setScreenSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [handleResize]);

	return screenSize;
}

function getLandingPageAnimation() {
	return {
		// Main container
		container: {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			transition: { delay: 0.5, duration: 0.4, ease: "easeIn" as const },
		},
		// Card container
		card: {
			initial: { opacity: 0, y: 30, scale: 0.95 },
			animate: { opacity: 1, y: 0, scale: 1 },
			transition: { delay: 0.7, duration: 0.5, ease: "easeOut" as const },
		},
		// Title
		title: {
			initial: { opacity: 0, y: 20 },
			animate: { opacity: 1, y: 0 },
			transition: { delay: 0.9, duration: 0.4 },
		},
		// Subtitle
		subtitle: {
			initial: { opacity: 0, y: 20 },
			animate: { opacity: 1, y: 0 },
			transition: { delay: 1.1, duration: 0.4 },
		},
		// CTA Button
		cta: {
			initial: { opacity: 0, y: 20 },
			animate: { opacity: 1, y: 0 },
			transition: { delay: 1.3, duration: 0.4 },
			// Interactive states
			hover: { scale: 1.02 },
			tap: { scale: 0.98 },
		},
		// Footer
		footer: {
			initial: { opacity: 0, y: 20 },
			animate: { opacity: 1, y: 0 },
			transition: { delay: 1.5, duration: 0.4 },
		},
	};
}

/**
 * 🎨 Animation Logic - Fixed infinite loop issues
 */
export const useQuizAnimations = (showResult: boolean) => {
	const { width, height } = useScreenSize();
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsInitialized(true);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	// ✅ FIXED: Memoize responsive values with proper dependencies
	const responsiveValues = useMemo(() => {
		const isMobile = width < 640;
		const isTablet = width >= 640 && width < 1024;
		const isDesktop = width >= 1024;

		return {
			yMove: isMobile ? -120 : isTablet ? -75 : -75,
			scaleDown: isMobile ? 0.95 : isTablet ? 0.92 : 0.9,
			answerPanelMove: isMobile ? -10 : isTablet ? -15 : -20,
			questionExitY: isMobile ? -20 : isTablet ? -25 : -30,
			bubbleY: isMobile ? 15 : 20,
			bubbleScale: isMobile ? 0.85 : 0.8,
			buttonY: isMobile ? 15 : 20,
			isMobile,
			isTablet,
			isDesktop,
		};
	}, [width, height]); // Only depend on primitive values

	const getContentMotionProps = useCallback(() => {
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
	}, [showResult, responsiveValues.yMove, responsiveValues.scaleDown]);

	const getChatScenarioMotionProps = useCallback(() => {
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
	}, [showResult, responsiveValues.yMove]);

	const getChatBubbleAnimation = useCallback(() => {
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
	}, [responsiveValues.bubbleScale, responsiveValues.bubbleY]);

	const getAnswerPanelLayoutAnimation = useCallback(
		(layout: AnswerPanelLayout) => {
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

			if (layout === "horizontal") {
				return {
					...baseAnimation,
					animate: showResult
						? { ...baseAnimation.animate, scale: 0.95 }
						: baseAnimation.animate,
				};
			}

			return baseAnimation;
		},
		[showResult, responsiveValues.answerPanelMove, responsiveValues.scaleDown]
	);

	const getAnswerButtonLayoutAnimation = useCallback(
		(index: number, layout: AnswerPanelLayout) => {
			if (layout === "horizontal") {
				return {
					initial: { opacity: 0, x: index === 0 ? -20 : 20 },
					animate: { opacity: 1, x: 0 },
					transition: { delay: index * 0.1, duration: 0.3 },
				};
			}

			return {
				initial: { opacity: 0, y: responsiveValues.buttonY },
				animate: { opacity: 1, y: 0 },
				transition: { delay: index * 0.1, duration: 0.3 },
			};
		},
		[responsiveValues.buttonY]
	);

	const getQuestionExitAnimation = useCallback(() => {
		return {
			initial: { opacity: 0, y: 20 },
			animate: isInitialized ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
			exit: {
				opacity: 0,
				y: responsiveValues.questionExitY,
			},
			transition: {
				duration: 0.4,
				ease: "easeInOut" as const,
				delay: isInitialized ? 0.2 : 0,
			},
		};
	}, [responsiveValues.questionExitY, isInitialized]);

	const getBackgroundAnimation = useCallback(
		(theme: "light" | "dark" = "light") => {
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
		},
		[showResult]
	);

	const getResultCardAnimation = () => {
		return {
			overlay: {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: 0.3 },
			},
			card: {
				initial: { y: "100%", opacity: 0 },
				animate: { y: 0, opacity: 1 },
				exit: { y: "100%", opacity: 0 },
				transition: {
					type: "spring" as const,
					damping: 25,
					stiffness: 300,
				},
			},
			title: {
				initial: { opacity: 0, y: 20 },
				animate: { opacity: 1, y: 0 },
				transition: { delay: 0.2, duration: 0.4 },
			},
			content: {
				initial: { opacity: 0, y: 20 },
				animate: { opacity: 1, y: 0 },
				transition: { delay: 0.3, duration: 0.4 },
			},
			button: {
				initial: { opacity: 0, y: 20 },
				animate: { opacity: 1, y: 0 },
				transition: { delay: 0.4, duration: 0.4 },
			},
		};
	};

	return useMemo(
		() => ({
			getContentMotionProps,
			getChatScenarioMotionProps,
			getChatBubbleAnimation,
			getAnswerPanelLayoutAnimation,
			getAnswerButtonLayoutAnimation,
			getQuestionExitAnimation,
			getBackgroundAnimation,
			getResultCardAnimation,
			getLandingPageAnimation,
			isInitialized,
		}),
		[
			getContentMotionProps,
			getChatScenarioMotionProps,
			getChatBubbleAnimation,
			getAnswerPanelLayoutAnimation,
			getAnswerButtonLayoutAnimation,
			getQuestionExitAnimation,
			getBackgroundAnimation,
			getResultCardAnimation,
			getLandingPageAnimation,
			isInitialized,
		]
	);
};
