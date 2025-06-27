import { QuizQuestion } from "./types";

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
	// เพิ่มข้ออื่นๆ ได้ตรงนี้
];

export const getCurrentQuestion = (questionId?: string): QuizQuestion => {
	if (questionId) {
		return quizData.find((q) => q.id === questionId) || quizData[0];
	}
	return quizData[0];
};
