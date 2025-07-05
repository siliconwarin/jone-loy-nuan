import type { QuizQuestion } from "./types";

export const quizData: QuizQuestion[] = [
	// Question 7 - Line Group Scam
	{
		id: "line-group-scam-7",
		question: "ถ้าคุณโพสต์ขายของ แล้วมีคนทักให้เข้าไป\nขายในกลุ่ม คุณจะ...",
		content: {
			type: "component",
			component: "ScenarioViewer",
			data: "line-group-scam-7",
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
			wrongTitle: "นี่คือมิจฉาชีพ",
			header: "หลอกมาซื้อของ",
			explanation:
				"มิจฉาชีพจะแกล้งสนใจซื้อของ ล่อให้เข้ากลุ่ม จากนั้นชวน\nสมัครหรือเปิดร้าน โดยอ้างว่าต้องโอนเงินก่อน\nพอเหยื่อโอนแล้วจะถอนเงินไม่ได้ และถูกหลอกให้โอนซ้าๆ จนหมดตัว\nทั้งที่คนซื้อของจริงจะไม่พาเข้ากลุ่มหรือขอให้โอนเงินก่อน",
		},
		category: "GROUP_SCAM",
		redFlags: [
			"คำเชิญจากคนแปลกหน้า = น่าสงสัย! อย่าเข้าร่วมกลุ่มที่ไม่รู้จัก",
			"จำนวนสมาชิก 99+ = อาจเป็นบอทหรือบัญชีปลอม",
			"เสนอให้เข้ากลุ่มเพื่อขายของ หรือกลุ่มลูกค้า VIP",
			"สนใจซื้อของมากเกินไป หรือผิดปกติไม่ต่อรองราคา",
		],
	},
	// Question 1 - SMS Scam
	{
		id: "sms-scam-1",
		question:
			"ถ้าคุณกําลังรอพัสดุ แล้วได้ SMS แจ้งพัสดุเสียหาย ทักไปมีเจ้าหน้าที่ เสนอเงินชดเชย คุณจะ…?",
		content: {
			type: "component",
			data: "sms-scam-1",
			component: "ScenarioViewer",
			alt: "Scenario showing SMS scam conversation",
			images: {
				normal: "/images/scenario-1/1.svg",
				result: "/images/scenario-1/1-result.svg",
			},
		},
		answers: [
			{
				id: "a",
				text: "ข้อมูลหลุดแน่ ถึงรู้พัสดุของเรา",
				isCorrect: true,
			},
			{
				id: "b",
				text: "บริษัทไม่น่าให้เงินชดเชยเยอะขนาดนี้",
				isCorrect: true,
			},
			{
				id: "c",
				text: "ดีใจ รีบส่งข้อมูล เพราะได้เงินเยอะ",
				isCorrect: false,
			},
		],
		result: {
			correctTitle: "ถูกต้อง!",
			wrongTitle: "นี่คือมิจฉาชีพ",
			header: "หลอกให้โอนเงิน",
			explanation:
				"หากได้รับ SMS อ้างว่าจะคืนเงิน อย่ารีบเชื่อทันที\nเพราะบริษัทจริงจะไม่แนบลิงก์และไม่เสนอชดเชยก้อน\nใหญ่โดยไม่มีขั้นตอนชัดเจน ควรติดต่อบริษัทโดยตรง\n ผ่านช่องทางทางการ",
		},
		category: "SMS_SCAM",
		redFlags: [
			"ลิงก์ bit.ly น่าสงสัย! ธนาคารจริงจะไม่ใช้ลิงก์สั้น",
			"ข้อความเร่งด่วนเพื่อสร้างความตื่นตระหนก",
			"การขู่ว่าจะระงับบัญชี เป็นเทคนิคหลอกลวงทั่วไป",
		],
	},
	// Question 2 - Social Ad Scam 3.แอพกู้เงิน
	{
		id: "social-ad-2",
		question:
			"ถ้าคุณกําลังร้อนเงิน และค้นหาเงินกู้ แล้วเจอโฆษณา\n แอพเงินกู้แบบนี้ คุณจะ.. ?",
		content: {
			type: "component",
			component: "ScenarioViewer",
			data: "social-ad-2",
			alt: "Social feed loan ad",
			images: {
				normal: "/images/scenario-2/2.svg",
				result: "/images/scenario-2/2-result.svg",
			},
		},
		answers: [
			{ id: "a", text: "ไม่สนใจ", isCorrect: true },
			{ id: "b", text: "กดติดตั้งแอปทันที", isCorrect: false },
		],
		result: {
			correctTitle: "ยอดเยี่ยม!",
			wrongTitle: "นี่คือมิจฉาชีพ",
			header: "แอพกู้เงินเถื่อน",
			explanation:
				"มิจฉาชีพใช้แอพกู้เงินเถื่อนคิดดอกเบี้ยโหด หักเงิน\nก่อนโอนจริง หลอกให้จ่ายเพิ่มเรื่อยๆ หากไม่จ่าย\n จะข่มขู่หรือประจาน ควรตรวจสอบชื่อแอพใน\n เว็บไซต์ธนาคารแห่งประเทศไทยก่อนกู้",
		},
		category: "LOAN_APP_SCAM",
		redFlags: [
			"ไม่ตรวจเครดิต = น่าสงสัย! สถาบันการเงินจริงต้องตรวจสอบ",
			"ไม่ต้องเอกสาร = เป็นไปไม่ได้! การกู้เงินจริงต้องมีเอกสาร",
			"ดอกน้อย + อนุมัติไว = ดีเกินจริง อาจเป็นกับดัก",
		],
	},
	// Question 3 - Interactive Job Ad Scam
	{
		id: "job-ad-3",
		question:
			"ถ้าคุณกําลังมองหางานออนไลน์ และเจอโฆษณา\n แบบนี้ในโซเชียล คุณจะ...",
		content: {
			type: "component",
			component: "ScenarioViewer",
			data: "job-ad-3",
			alt: "Job advertisement scam",
			images: {
				normal: "/images/scenario-3/3.svg",
				result: "/images/scenario-3/3-result.svg",
			},
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
				'กลโกงนี้มักเริ่มจากการให้ทํางานง่าย ๆ แล้วจ่ายเงินจริงเล็กน้อยเพื่อสร้างความน่าเชื่อถือ จากนั้นจะชวนให้โอนเงินเพื่อทํา"ภารกิจ" ต่อเนื่องอ้างว่าถอนเงินไม่ได้เพราะติดเงื่อนไขบางอย่าง และหลอกให้โอนเพิ่มเรื่อยๆ จนหมดตัว',
		},
		category: "JOB_SCAM",
		redFlags: [
			"เงินเดือนสูงผิดปกติ = ดีเกินจริง อาจเป็นกับดัก",
			"ไม่ระบุรายละเอียดงาน = น่าสงสัย งานจริงต้องมีรายละเอียด",
			"ขอเงินมัดจำ = ผิดปกติ! บริษัทจริงไม่เก็บเงินจากพนักงาน",
			"รีบรับสมัคร = เทคนิคกดดัน อาจเป็นการหลอกลวง",
		],
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
			wrongTitle: "นี่คือมิจฉาชีพ",
			header: "หลอกให้โอนเงิน",
			explanation:
				'มิจฉาชีพมักหลอกให้คุณ "ตั้งรหัสผ่าน" หรือ "ยืนยันตัวตน" ผ่านหน้าแอป/เว็บไซต์ปลอม แล้วนํารหัสที่คุณใช้เป็นประจําไปลองเข้าระบบต่างๆ เช่น แอปธนาคารออนไลน์เพื่อโอนเงินออกจากบัญชีของคุณ',
		},
		category: "PIN_SCAM",
		redFlags: [
			"ขอรหัส PIN ผ่านแอป = ผิดปกติ! ธนาคารจริงไม่ทำแบบนี้",
			"หน้าเว็บไซต์ปลอม = ตรวจสอบ URL และ SSL ให้ดี",
			"เร่งด่วนให้กรอก = เทคนิคกดดัน ให้เวลาคิดน้อย",
			"อ้างยืนยันตัวตน = ธนาคารมีขั้นตอนที่ชัดเจนกว่านี้",
		],
	},
	// Question 5 - Romance Scam
	{
		id: "romance-scam-5",
		question:
			"วันหนึ่งมีคนหน้าตาดีเพิ่มเพื่อนคุณในโซเชียล\n และทักมาคุย คุณจะทําอย่างไร?",
		content: {
			type: "component",
			component: "ScenarioViewer",
			data: "romance-scam-5",
			alt: "Romance scam social media profile",
			images: {
				normal: "/images/scenario-5/5.svg",
				result: "/images/scenario-5/5-result.svg",
			},
		},
		answers: [
			{ id: "ignore", text: "ไม่สนใจ", isCorrect: true },
			{ id: "respond", text: "ตอบกลับและคุยต่อ", isCorrect: false },
		],
		result: {
			correctTitle: "ฉลาดมาก!",
			wrongTitle: "นี่คือมิจฉาชีพ",
			header: "หลอกลวงด้วยความรัก",
			explanation:
				"มิจฉาชีพจะปลอมโปรไฟล์หน้าตาดี แล้วทักมาคุยตีสนิท\nสร้างความไว้วางใจ ก่อนจะชวนให้ลงทุนในแพลตฟอร์ม\nปลอม ช่วงแรกอาจให้ถอนเงินได้จริงเพื่อหลอกให้โอนเพิ่ม\nแต่สุดท้ายจะถอนเงินไม่ได้และหายไปพร้อมกับเงินและ\nความไว้ใจของเหยื่อ",
		},
		category: "ROMANCE_SCAM",
		redFlags: [
			"โปรไฟล์สวยเกินจริง = อาจใช้รูปปลอมจากอินเทอร์เน็ต",
			"ไม่มีเพื่อนร่วมกัน = บัญชีใหม่หรือปลอม",
			"รูปน้อยมาก = อาจไม่ใช่คนจริง",
			"ทักมาเอง = ผิดปกติ คนแปลกหน้าไม่ค่อยทำ",
		],
	},
	// Question 6 - Investment Scam
	{
		id: "investment-scam-6",
		question:
			'ถ้าคุณเจอโฆษณาในโซเชียล ที่ใช้ภาพคนดังชวน\n ลงทุน พร้อมคําว่า "การันตีผลตอบแทน" คุณจะ…?',
		content: {
			type: "component",
			component: "ScenarioViewer",
			data: "investment-scam-6",
			alt: "Investment scam social media post with red flags",
			images: {
				normal: "/images/scenario-6/6.svg",
				result: "/images/scenario-6/6-result.svg",
			},
		},
		answers: [
			{
				id: "ignore",
				text: "ไม่ลงทุน ข้อเสนอดูดีเกินจริง",
				isCorrect: true,
			},
			{
				id: "small_amount",
				text: "ลองทักไปดู อาจเริ่มลงทุนน้อยๆก่อน",
				isCorrect: false,
			},
			{
				id: "invest_immediately",
				text: "ลงทุนทันที เชื่อคนโปรโมท อยากได้กําไรเร็ว",
				isCorrect: false,
			},
		],
		result: {
			correctTitle: "ฉลาดมาก!",
			wrongTitle: "นี่คือมิจฉาชีพ",
			header: "หลอกให้ลงทุน",
			explanation:
				"มิจฉาชีพจะปลอมภาพคนดังเพื่อสร้างความน่าเชื่อถือ หลอกให้เหยื่อ\nลงทุนในแพลตฟอร์มปลอม โดยอนุญาตให้ถอนเงิน\nรอบแรกได้จริงเพื่อสร้างความมั่นใจ จากนั้นชวนให้เติม\nเงินเพิ่ม และสุดท้ายจะไม่สามารถถอนเงินคืนได้อีกเลย",
		},
		category: "INVESTMENT_SCAM",
		redFlags: [
			"การันตีผล 100% = เป็นไปไม่ได้! ไม่มีการลงทุนใดรับประกันกำไรได้",
			"ผลตอบแทนสูงผิดปกติ = ความเสี่ยงสูงหรือกลลวง",
			"อ้างผู้เชี่ยวชาญ = ตรวจสอบข้อมูลและใบอนุญาตก่อน",
			"เร่งให้ตัดสินใจเร็ว = เทคนิคกดดันทั่วไป",
		],
	},

	// Question 8 - Fake Ads
	{
		id: "fake-ads-8",
		question:
			"ถ้าคุณเพิ่งโดนหลอกเสียเงิน แล้วค้นหาวิธีแจ้งความ\nออนไลน์ และเจอโฆษณาแบบนี้ คุณจะ..",
		content: {
			type: "component",
			component: "ScenarioViewer",
			data: "fake-ads-8",
			alt: "Fake ads scam scenario",
		},
		answers: [
			{
				id: "ignore",
				text: "ไม่เชื่อ ตํารวจจริงคงไม่ซื้อโฆษณา",
				isCorrect: true,
			},
			{
				id: "ignore",
				text: "ไม่คลิก แจ้งความผ่านเว็บทางการเท่านั้น",
				isCorrect: true,
			},
			{
				id: "ignore",
				text: "คลิก/ทักไป ทําตามทุกขั้น ต้องรีบตามเงินคืน",
				isCorrect: false,
			},
		],
		result: {
			correctTitle: "ฉลาดมาก!",
			wrongTitle: "นี่คือมิจฉาชีพ",
			header: "หลอกให้โอนเงิน",
			explanation:
				"มิจฉาชีพมักแอบอ้างว่าจะช่วยแจ้งความให้จากนั้นพาเหยื่อเข้าแชท\nหลอกขอข้อมูลส่วนตัวแล้วอ้างว่าต้องโอนค่าดําเนินการ สุดท้ายเหยื่อไม่ได้รับเงินคืน\nมื่อคุณตกเป็นเหยื่ออาชญากรรมไซเบอร์แจ้งความได้ที่สถานีตํารวจใกล้บ้าน หรือที่ www.thaipoliceonline.com เท่านั้น",
		},
		category: "POLICE_AD_SCAM",
		redFlags: [
			"มีคำว่า 'Sponsored' = น่าสงสัย! ตำรวจจริงไม่โฆษณา",
			"ใช้ภาพเจ้าหน้าที่ปลอม แอบอ้างหน่วยงานรัฐ",
			"ให้ทักแชทหรือกรอกข้อมูลออนไลน์ = ผิดปกติ!",
			"โฆษณาปลอมที่ดูไม่กดได้ แต่จริงๆ คลิกไปได้ = กับดัก!",
			"หลอกคนที่เพิ่งโดนสแกมมาแจ้งความ = เหยื่อซ้ำ",
		],
	},
	// Question 9 - Fake Police Phone Call
	{
		id: "fake-police-phone-call-9",
		question:
			'ถ้าคุณได้รับสายจาก "ตํารวจ" แจ้งว่าคุณมีคดีพร้อมบอกชื่อคุณถูกต้อง ให้แอดไลน์ไปคุย คุณจะ...',
		content: {
			type: "component",
			component: "ScenarioViewer",
			data: "fake-police-phone-call-9",
			alt: "Fake police phone call scenario",
		},
		answers: [
			{
				id: "ignore",
				text: "ไม่เชื่อ ตํารวจจริงไม่โทรหรือแชท",
				isCorrect: true,
			},
			{
				id: "respond",
				text: "ตำรวจจริง เพราะมีข้อมูลเราครบ",
				isCorrect: false,
			},
			{ id: "ignore", text: "วางสายแล้วลองโทรกลับ", isCorrect: true },
		],
		result: {
			correctTitle: "ฉลาดมาก!",
			wrongTitle: "นี่คือมิจฉาชีพ",
			header: "แก๊งคอลเซ็นเตอร",
			explanation:
				"มิจฉาชีพมักแอบอ้างว่าจะช่วยแจ้งความให้จากนั้นพาเหยื่อเข้าแชทหลอกขอข้อมูลส่วนตัวแล้วอ้างว่าต้องโอนค่าดําเนินการ สุดท้ายเหยื่อไม่ได้รับเงินคืน\nมื่อคุณตกเป็นเหยื่ออาชญากรรมไซเบอร์แจ้งความได้ที่สถานีตํารวจใกล้บ้าน หรือที่ www.thaipoliceonline.com เท่านั้น",
		},
		category: "POLICE_CALL_SCAM",
		redFlags: [
			"รู้ข้อมูลส่วนตัวครบ = ไม่ได้หมายความว่าเป็นตำรวจจริง!",
			"อ้างเป็นตำรวจ บอกมีคดี แต่โทรมาเอง = น่าสงสัย",
			"บังคับโอนเงิน 'ค่าดำเนินคดี' = หลอกแน่นอน!",
			"รีบเร่ง ข่มขู่ ไม่ให้เวลาคิด = กลยุทธ์หลอก",
			"ตำรวจจริงไม่โทรมาเอง ต้องไปสถานีหรือเว็บทางการ",
		],
	},
	// Question 10 - Mule Account Scam
	{
		id: "mule-account-10",
		question:
			"ถ้ามีบริษัทเสนอรายได้ แต่ให้โอนค่าสมัครมา\nเลขบัญชีนี้ก่อน คุณจะ…",
		content: {
			type: "component",
			component: "ScenarioViewer",
			data: "mule-account-10",
			alt: "Mule account recruitment scam scenario",
		},
		answers: [
			{
				id: "reject",
				text: "ปฏิเสธ เป็นการกระทำผิดกฎหมาย",
				isCorrect: true,
			},
			{
				id: "accept-high-commission",
				text: "ยอมรับ เพราะได้ค่าคอมมิชชั่นสูง",
				isCorrect: false,
			},
			{
				id: "ask-more-details",
				text: "สอบถามรายละเอียดเพิ่มเติมก่อน",
				isCorrect: false,
			},
		],
		result: {
			correctTitle: "ปกป้องตัวเองได้!",
			wrongTitle: "นี่คือมิจฉาชีพ",
			header: "บัญชีกระต่าย = ผิดกฎหมาย",
			explanation:
				"การให้ยืมบัญชีธนาคารเพื่อรับโอนเงินจากการหลอกลวง\nถือเป็นความผิดฐานฟอกเงิน จะต้องรับผิดชอบทางกฎหมาย\nแม้ว่าจะไม่รู้ว่าเงินมาจากการทำผิด เพราะกฎหมายถือว่า\nเจ้าของบัญชีต้องรับผิดชอบ อาจโดนจับและติดคุกได้",
		},
		category: "MULE_ACCOUNT_SCAM",
		redFlags: [
			"ค่าคอมมิชชั่นสูงผิดปกติ = ความเสี่ยงสูง งานง่ายได้เงินเยอะ",
			"ขอยืมบัญชีธนาคาร = ผิดกฎหมาย! ไม่ควรให้คนอื่นใช้",
			"งานรับ-โอนเงิน = ส่วนหนึ่งของกระบวนการฟอกเงิน",
			"เจ้าของบัญชีต้องรับผิดชอบทางกฎหมาย = อาจโดนจับ",
		],
	},
];

export const getCurrentQuestion = (questionId?: string): QuizQuestion => {
	if (questionId) {
		return quizData.find((q) => q.id === questionId) || quizData[0];
	}
	return quizData[0];
};
