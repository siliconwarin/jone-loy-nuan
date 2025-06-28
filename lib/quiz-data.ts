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
	// Question 3 - Interactive Job Ad Scam
	{
		id: "job-ad-3",
		question: "ถ้าคุณกำลังหางาน และเห็นโฆษณาสมัครงานแบบนี้ คุณจะ…?",
		content: {
			type: "component",
			component: "InteractiveAdScenario",
			data: "",
			alt: "Interactive job advertisement scam",
		},
		interactive: true,
		answers: [
			{ id: "skip", text: "ข้าม", isCorrect: true },
			{ id: "register", text: "ลงทะเบียน", isCorrect: false },
		],
		result: {
			correctTitle: "เก่งมาก!",
			wrongTitle: "อย่าเชื่อง่ายๆ",
			header: "โฆษณาสมัครงานปลอม",
			explanation:
				"โฆษณาสมัครงานที่เงินเดือนสูงผิดปกติ และขอเงินมัดจำ มักเป็นกลลวง ควรตรวจสอบข้อมูลบริษัทและไม่โอนเงินให้ก่อนเริ่มงาน",
		},
	},
	// Question 4 - PIN Scenario
	{
		id: "pin-scam-4",
		question: "หากธนาคารขอให้คุณกรอกรหัส PIN ผ่านแอปพลิเคชัน คุณจะ...?",
		content: {
			type: "component",
			component: "PinScenario",
			data: "",
			alt: "PIN input scenario for scam awareness",
		},
		interactive: true,
		answers: [
			{ id: "cancel", text: "ยกเลิก", isCorrect: true },
			{ id: "confirm", text: "ยืนยัน", isCorrect: false },
		],
		result: {
			correctTitle: "ปกป้องตัวเองได้!",
			wrongTitle: "เสียง! ถูกหลอก",
			header: "อย่าแจกรหัส PIN",
			explanation:
				"ธนาคารจริงจะไม่ขอรหัส PIN หรือรหัสผ่านผ่านแอปหรือข้อความ การกรอกรหัส PIN ให้กับแอปที่น่าสงสัยอาจทำให้เงินในบัญชีถูกโอนหายได้",
		},
	},
	// Question 5 - Romance Scam
	{
		id: "romance-scam-5",
		question:
			"ถ้าคุณเจอโปรไฟล์แบบนี้บนโซเชียลมีเดีย และมีคนมาแชทหาคุยอ้างว่าเป็นคนต่างชาติ คุณจะ...?",
		content: {
			type: "component",
			component: "RomanceScamScenario",
			data: "",
			alt: "Romance scam social media profile",
		},
		answers: [
			{ id: "ignore", text: "ไม่สนใจ", isCorrect: true },
			{ id: "respond", text: "ตอบกลับและคุยต่อ", isCorrect: false },
		],
		result: {
			correctTitle: "ฉลาดมาก!",
			wrongTitle: "ระวัง Romance Scam!",
			header: "หลอกลวงด้วยความรัก",
			explanation:
				"Romance Scam เป็นการหลอกลวงด้วยการแสดงความรักและสร้างความสัมพันธ์เพื่อขอเงิน มักใช้รูปปลอมของคนต่างชาติ หากมีคนแปลกหน้ามาหาคุยแบบผิดปกติ ควรไม่ตอบกลับและตรวจสอบข้อมูลก่อน",
		},
	},
	// Question 6 - Investment Scam
	{
		id: "investment-scam-6",
		question:
			"ถ้าคุณเห็นโพสต์โฆษณาลงทุนแบบนี้บนโซเชียลมีเดีย และมีคนมาแชทชวนลงทุน คุณจะ...?",
		content: {
			type: "component",
			component: "InvestmentScamScenario",
			data: "",
			alt: "Investment scam social media post with red flags",
		},
		answers: [
			{
				id: "ignore",
				text: "ไม่สนใจ ข่าวไม่สนใจผู้โกง",
				isCorrect: true,
			},
			{
				id: "small_amount",
				text: "ลองถ้าใหม่ๆ อาจเริ่มจากน้อยๆก่อน",
				isCorrect: false,
			},
			{
				id: "invest_immediately",
				text: "ลงทุนทันที เชื่อผลโบรกเกอร์ อยากได้กำไรเลยกเลิก",
				isCorrect: false,
			},
		],
		result: {
			correctTitle: "ฉลาดมาก!",
			wrongTitle: "ระวัง Investment Scam!",
			header: "หลอกลงทุนปลอม",
			explanation:
				"โฆษณาลงทุนที่ให้ผลตอบแทนสูงผิดปกติ การันตีกำไร และมีการรีบเร่ง มักเป็นกลลวง ไม่มีการลงทุนใดที่การันตีผลได้ 100% ควรศึกษาข้อมูลและขอใบอนุญาตก่อนลงทุน",
		},
	},
	// Question 7 - Line Group Scam
	{
		id: "line-group-scam-7",
		question:
			"ถ้าคุณได้รับคำเชิญเข้ากลุ่ม Line ที่อ้างเป็นกลุ่มลงทุน แล้วมีปัญหากิจให้เข้าไป คุณจะ...?",
		content: {
			type: "component",
			component: "LineGroupScamScenario",
			data: "",
			alt: "Line group invitation scam scenario",
		},
		answers: [
			{
				id: "reject",
				text: "ปฏิเสธ",
				isCorrect: true,
			},
			{
				id: "join",
				text: "เข้าร่วม",
				isCorrect: false,
			},
		],
		result: {
			correctTitle: "ฉลาดมาก!",
			wrongTitle: "ระวัง Group Scam!",
			header: "กลุ่มลงทุนปลอม",
			explanation:
				"กลุ่ม Line ที่เชิญโดยคนแปลกหน้า อ้างเป็นกลุ่มลงทุนหรือสอนเทรด มักเป็นกลลวง ใช้การสร้างบรรยากาศกำไรปลอม แล้วหลอกให้โอนเงิน ไม่ควรเข้าร่วมกลุ่มที่ไม่รู้จักและไม่เชื่อถือได้",
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

// Red flag data for investment scam scenario
export const INVESTMENT_SCAM_RED_FLAGS = [
	{
		id: "guaranteed-profit",
		message: "การันตีผล 100% = เป็นไปไม่ได้! ไม่มีการลงทุนใดรับประกันกำไรได้",
		position: {
			top: "35%",
			left: "20%",
		},
		direction: "right" as const,
		delay: 0.8,
	},
	{
		id: "high-return",
		message: "ผลตอบแทนสูงผิดปกติ = ความเสี่ยงสูงหรือกลลวง",
		position: {
			top: "45%",
			left: "15%",
		},
		direction: "right" as const,
		delay: 1.2,
	},
	{
		id: "expert-recommendation",
		message: "อ้างผู้เชี่ยวชาญ = ตรวจสอบข้อมูลและใบอนุญาตก่อน",
		position: {
			top: "55%",
			left: "70%",
		},
		direction: "left" as const,
		delay: 1.6,
	},
	{
		id: "urgency-pressure",
		message: "เร่งให้ตัดสินใจเร็ว = เทคนิคกดดันทั่วไป",
		position: {
			top: "65%",
			left: "50%",
		},
		direction: "up" as const,
		delay: 2.0,
	},
];

// Line Group Scam Red Flags
export const LINE_GROUP_SCAM_RED_FLAGS = [
	{
		id: "unknown-inviter",
		message: "คำเชิญจากคนแปลกหน้า = น่าสงสัย! อย่าเข้าร่วมกลุ่มที่ไม่รู้จัก",
		position: {
			top: "15%",
			left: "20%",
		},
		direction: "right" as const,
		delay: 0.8,
	},
	{
		id: "high-member-count",
		message: "จำนวนสมาชิก 99+ = อาจเป็นบอทหรือบัญชีปลอม",
		position: {
			top: "25%",
			left: "70%",
		},
		direction: "left" as const,
		delay: 1.2,
	},
	{
		id: "investment-topic",
		message: "กลุ่มสอนลงทุน/เทรด = ระวัง! ตรวจสอบความน่าเชื่อถือก่อน",
		position: {
			top: "45%",
			left: "50%",
		},
		direction: "up" as const,
		delay: 1.6,
	},
	{
		id: "join-pressure",
		message: "กดดันให้เข้าร่วม = เทคนิคหลอกลวง อย่าตัดสินใจเร็ว",
		position: {
			top: "75%",
			left: "25%",
		},
		direction: "right" as const,
		delay: 2.0,
	},
];
