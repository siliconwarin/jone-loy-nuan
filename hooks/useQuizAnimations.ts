"use client";

/**
 * 🎨 Animation Logic - React Compiler Optimized
 * จัดการ animation states และ motion props แยกจาก business logic
 */
export const useQuizAnimations = (showResult: boolean) => {
	// React 19: React Compiler จะ optimize animations เหล่านี้อัตโนมัติ

	/**
	 * Motion props สำหรับ Content Area
	 */
	function getContentMotionProps() {
		return {
			initial: { opacity: 1, y: 0, scale: 1 },
			animate: showResult
				? { y: -20, scale: 1, opacity: 0.7 }
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
	 */
	function getChatScenarioMotionProps() {
		return {
			initial: { opacity: 1, y: 0, scale: 1 },
			animate: showResult
				? { y: -60, scale: 1, opacity: 1.0 }
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
	 */
	function getChatBubbleAnimation() {
		return {
			initial: { opacity: 0, scale: 0.8, y: 20 },
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
	 */
	function getAnswerPanelMotionProps() {
		return {
			initial: { opacity: 1, y: 0 },
			animate: showResult
				? { opacity: 1, y: -20, scale: 0.95 }
				: { opacity: 1, y: 0, scale: 1 },
			transition: { duration: 0.6, ease: "easeInOut" as const },
		};
	}

	/**
	 * Animation สำหรับ Answer Button
	 */
	function getAnswerButtonAnimation(index: number) {
		return {
			initial: { opacity: 0, y: 20 },
			animate: {
				opacity: 1,
				y: 0,
			},
			transition: { delay: index * 0.1, duration: 0.3 },
		};
	}

	/**
	 * Animation สำหรับ Question Exit
	 */
	function getQuestionExitAnimation() {
		return {
			initial: { opacity: 1, y: 0 },
			exit: {
				opacity: 0,
				y: -30,
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
	function getRedFlagAnimation(delay: number = 0) {
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
	};
};
