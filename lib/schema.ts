import { z } from "zod";

export const surveySchema = z.object({
	// 🎯 Quiz Score Data
	totalScore: z.number().min(0),
	totalQuestions: z.number().min(1),

	// 👤 Demographics
	ageGroup: z.string({
		required_error: "กรุณาเลือกช่วงอายุ",
	}),
	education: z.string({
		required_error: "กรุณาเลือกระดับการศึกษา",
	}),
	occupation: z.string({
		required_error: "กรุณาเลือกอาชีพ",
	}),
	hasScamExperience: z.enum(["yes", "no"], {
		required_error: "กรุณาเลือกประสบการณ์การถูกหลอกลวง",
	}),
	scamTypes: z.array(z.string()).optional(),
	socialMediaUsage: z.string({
		required_error: "กรุณาเลือกความถี่ในการใช้สื่อสังคมออนไลน์",
	}),
	platforms: z
		.array(z.string(), {
			required_error: "กรุณาเลือกแพลตฟอร์มที่ใช้อย่างน้อย 1 อย่าง",
		})
		.min(1, "กรุณาเลือกแพลตฟอร์มที่ใช้อย่างน้อย 1 อย่าง"),
	feedback: z.string().optional(),
});

export type SurveyFormData = z.infer<typeof surveySchema>;
