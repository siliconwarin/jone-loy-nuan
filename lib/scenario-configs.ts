import {
	RED_FLAGS_DATA,
	FEED_AD_RED_FLAGS,
	INVESTMENT_SCAM_RED_FLAGS,
	LINE_GROUP_SCAM_RED_FLAGS,
} from "./quiz-data";

interface ScenarioConfig {
	baseImage: string;
	resultImage?: string;
	containerClass: string;
	redFlags?: Array<{
		id: string;
		message: string;
		position: { top: string; left: string };
		direction: "up" | "down" | "left" | "right";
		delay: number;
	}>;
	textOverlay?: {
		component?: string;
		position?: string;
		header?: string;
		body?: string[];
		footer?: string;
	};
	interactive?: boolean;
	buttons?: Array<{
		id: string;
		text: string;
		position: string;
		isCorrect: boolean;
	}>;
	alt: string;
}

export const SCENARIO_CONFIGS: Record<string, ScenarioConfig> = {
	"sms-scam-1": {
		baseImage: "/images/scenario-1/chat-ui.jpg",
		containerClass: "relative w-full max-w-[380px] mx-auto",
		redFlags: RED_FLAGS_DATA,
		textOverlay: {
			component: "ChatBubbleImage",
			position: "absolute top-[35%] left-[8%] w-[84%]",
		},
		alt: "Chat scenario showing SMS scam conversation",
	},

	"social-ad-2": {
		baseImage: "/images/scenario-2/feed-ui.jpg",
		containerClass: "relative w-full max-w-[380px] mx-auto",
		redFlags: FEED_AD_RED_FLAGS,
		textOverlay: {
			header: "เงินสดด่วน อนุมัติไว",
			body: ["ไม่ตรวจสอบเครดิต", "ไม่ต้องใช้เอกสารใดๆ"],
			footer: "ดอกน้อย ผ่อนสบาย",
			position:
				"absolute top-[22%] sm:top-[24%] md:top-[24%] left-[6%] sm:left-[8%] w-[72%] sm:w-[70%]",
		},
		alt: "Social feed loan ad",
	},

	"job-ad-3": {
		baseImage: "/images/scenario-3/ad-job.jpg",
		resultImage: "/images/scenario-3/result-ad-job.jpg",
		containerClass:
			"relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] mx-auto",
		interactive: true,
		buttons: [
			{
				id: "skip",
				text: "ข้าม",
				position:
					"bottom-[8%] left-[12%] w-[28%] h-[7%] sm:bottom-[9%] sm:left-[14%] sm:w-[30%] sm:h-[8%] md:bottom-[10%] md:left-[15%] md:w-[32%] md:h-[8%] lg:bottom-[11%] lg:left-[16%] lg:w-[30%] lg:h-[8%]",
				isCorrect: true,
			},
			{
				id: "register",
				text: "ลงทะเบียน",
				position:
					"bottom-[8%] right-[12%] w-[32%] h-[7%] sm:bottom-[9%] sm:right-[14%] sm:w-[34%] sm:h-[8%] md:bottom-[10%] md:right-[15%] md:w-[36%] md:h-[8%] lg:bottom-[11%] lg:right-[16%] lg:w-[34%] lg:h-[8%]",
				isCorrect: false,
			},
		],
		alt: "Interactive job advertisement scam",
	},

	"romance-scam-5": {
		baseImage: "/images/scenario-6/profile-social-ui.jpg",
		resultImage: "/images/scenario-6/result-profile-social-ui.jpg",
		containerClass:
			"relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] mx-auto",
		alt: "Romance scam social media profile",
	},

	"investment-scam-6": {
		baseImage: "/images/scenario-5/invest-ui.jpg",
		resultImage: "/images/scenario-5/result-invest-ui.jpg",
		containerClass:
			"relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] mx-auto",
		redFlags: INVESTMENT_SCAM_RED_FLAGS,
		alt: "Investment scam social media post with red flags",
	},

	"line-group-scam-7": {
		baseImage: "/images/scenario-1/chat-ui.jpg", // ใช้รูป chat UI ชั่วคราว
		containerClass:
			"relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] mx-auto",
		redFlags: LINE_GROUP_SCAM_RED_FLAGS,
		alt: "Line group invitation scam scenario",
	},
};
