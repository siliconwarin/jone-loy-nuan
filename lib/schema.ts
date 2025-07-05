import { z } from "zod";

export const surveySchema = z.object({
	// 🎯 Quiz Score Data
	totalScore: z.number().min(0),
	totalQuestions: z.number().min(1),

	// 👤 Demographics (3 หัวข้อแรก)
	ageGroup: z.string({
		required_error: "กรุณาเลือกช่วงอายุ",
	}),
	education: z.string({
		required_error: "กรุณาเลือกระดับการศึกษา",
	}),
	occupation: z.string({
		required_error: "กรุณาเลือกอาชีพ",
	}),
});

export type SurveyFormData = z.infer<typeof surveySchema>;
