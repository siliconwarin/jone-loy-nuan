// ⚙️ Application Constants and Configurations

export const QUIZ_CONFIG = {
	RESULT_DELAY: 800, // milliseconds before showing result
	ANIMATION_DELAYS: {
		PAGE_CONTENT: 0.8,
		STAIR_STEP: 0.1,
		RED_FLAG_BASE: 0.5,
		RED_FLAG_INCREMENT: 0.5,
	},
	DURATIONS: {
		TRANSITION: 1.0,
		STAIR_ANIMATION: 0.4,
		RED_FLAG_ANIMATION: 0.6,
	},
} as const;

export const BUTTON_VARIANTS = {
	QUIZ: "quiz",
	QUIZ_CORRECT: "quiz-correct",
	QUIZ_WRONG: "quiz-wrong",
} as const;

export const RED_FLAGS_DATA = [
	{
		id: "sender",
		message: "ผู้ส่งไม่ระบุชื่อ",
		position: { top: "8%", left: "55%" },
		direction: "right" as const,
		delay: 0.5,
	},
	{
		id: "urgent",
		message: "ข้อความเร่งด่วน",
		position: { top: "45%", left: "50%" },
		direction: "down" as const,
		delay: 1.0,
	},
	{
		id: "suspicious-link",
		message: "ลิงก์แปลกปลอม",
		position: { top: "60%", left: "50%" },
		direction: "up" as const,
		delay: 1.5,
	},
] as const;

export const CONTENT_VARIANTS = {
	DEFAULT: "default",
	COMPACT: "compact",
	FULLSCREEN: "fullscreen",
} as const;

export const TOOLTIP_VARIANTS = {
	DEFAULT: "default",
	WARNING: "warning",
	DANGER: "danger",
	INFO: "info",
} as const;

export const DIRECTIONS = {
	UP: "up",
	DOWN: "down",
	LEFT: "left",
	RIGHT: "right",
} as const;

// Animation Presets
export const ANIMATION_PRESETS = {
	FADE_IN: {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.6, ease: "easeOut" },
	},
	SLIDE_UP: {
		initial: { opacity: 0, y: 60 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.8, ease: "easeOut" },
	},
	SCALE_IN: {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
		transition: { duration: 0.5, ease: "easeOut" },
	},
	CONTENT_RESULT: {
		initial: { opacity: 1, y: 0, scale: 1 },
		animate: { y: -20, scale: 1, opacity: 0.7 },
		transition: { duration: 1.0, ease: "easeInOut", delay: 0.2 },
	},
} as const;

// Responsive Breakpoints
export const BREAKPOINTS = {
	SM: "640px",
	MD: "768px",
	LG: "1024px",
	XL: "1280px",
} as const;
