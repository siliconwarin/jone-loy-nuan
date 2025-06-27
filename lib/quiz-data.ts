import type { QuizQuestion } from "./types";

export const quizData: QuizQuestion[] = [
	{
		id: "sms-scam-1",
		question:
			"ถ้าคุณกำลังรอพัสดุ แล้วได้ SMS แจ้งว่าพัสดุเสียหายและมีเจ้าหน้าที่เสนอเงินชดเชย คุณจะ...?",
		content: {
			type: "component",
			data: "",
			component: "ChatScenario",
			alt: "Chat scenario showing SMS scam conversation",
		},
		answers: [
			{
				id: "a",
				text: "ข้อมูลหลุดแน่! ถึงพร่องของเรา",
				isCorrect: false,
			},
			{
				id: "b",
				text: "บริษัทไม่มาหาก่อน ตรวจสอบเอาละย่อ",
				isCorrect: true,
			},
			{
				id: "c",
				text: "ติ่ง รับส่งข้อมูล เพราะได้เงินยอะ",
				isCorrect: false,
			},
		],
		result: {
			correctTitle: "ถูกต้อง!",
			wrongTitle: "นี่คือมิจฉาชีพ",
			header: "หลอกให้โอนเงิน",
			explanation:
				"หากได้รับ SMS อ้างว่าจะคืนเงิน อย่าเร่งตอบกลับ เพราะบริษัทจริงจะไม่แนบลิงก์และไม่ถามข้อมูลส่วนตัว ควรติดต่อสอบถามกับบริษัทโดยตรงเพื่อความปลอดภัย",
		},
	},
	// Question 2 - Social Ad Scam
	{
		id: "social-ad-2",
		question: "ถ้าคุณกำลังร้อนเงิน และเห็นโฆษณาสินเชื่อแบบนี้บนโซเชียล คุณจะ…?",
		content: {
			type: "component",
			component: "FeedAdScenario",
			data: "",
			alt: "Social feed loan ad",
		},
		answers: [
			{ id: "a", text: "ไม่สนใจ", isCorrect: true },
			{ id: "b", text: "กดติดตั้งแอปทันที", isCorrect: false },
		],
		result: {
			correctTitle: "ยอดเยี่ยม!",
			wrongTitle: "ระวังถูกหลอก",
			header: "โฆษณาสินเชื่อปลอม",
			explanation:
				"โฆษณาสินเชื่อที่ไม่ตรวจสอบเครดิตมักเป็นกลลวง ควรตรวจสอบกับสถาบันการเงินที่เชื่อถือได้ก่อนตัดสินใจ",
		},
	},
];

export const getCurrentQuestion = (questionId?: string): QuizQuestion => {
	if (questionId) {
		return quizData.find((q) => q.id === questionId) || quizData[0];
	}
	return quizData[0];
};

// Red flag data for chat scenario tooltips
export const RED_FLAGS_DATA = [
	{
		id: "suspicious-link",
		message: "ลิงก์ bit.ly น่าสงสัย! ธนาคารจริงจะไม่ใช้ลิงก์สั้น",
		position: {
			top: "60%",
			left: "70%",
		},
		direction: "up" as const,
		delay: 0.5,
	},
	{
		id: "urgent-tone",
		message: "ข้อความเร่งด่วนเพื่อสร้างความตื่นตระหนก",
		position: {
			top: "45%",
			left: "20%",
		},
		direction: "right" as const,
		delay: 1.0,
	},
	{
		id: "account-suspension",
		message: "การขู่ว่าจะระงับบัญชี เป็นเทคนิคหลอกลวงทั่วไป",
		position: {
			top: "50%",
			left: "50%",
		},
		direction: "down" as const,
		delay: 1.5,
	},
];

// Red flag data for feed ad scenario
export const FEED_AD_RED_FLAGS = [
	{
		id: "no-credit-check",
		message: "ไม่ตรวจเครดิต = น่าสงสัย! สถาบันการเงินจริงต้องตรวจสอบ",
		position: {
			top: "45%",
			left: "15%",
		},
		direction: "right" as const,
		delay: 0.8,
	},
	{
		id: "no-documents",
		message: "ไม่ต้องเอกสาร = เป็นไปไม่ได้! การกู้เงินจริงต้องมีเอกสาร",
		position: {
			top: "52%",
			left: "15%",
		},
		direction: "right" as const,
		delay: 1.2,
	},
	{
		id: "too-good-to-be-true",
		message: "ดอกน้อย + อนุมัติไว = ดีเกินจริง อาจเป็นกับดัก",
		position: {
			top: "65%",
			left: "50%",
		},
		direction: "up" as const,
		delay: 1.6,
	},
];
