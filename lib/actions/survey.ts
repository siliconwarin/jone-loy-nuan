// lib/actions/survey.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { surveySchema } from "@/lib/schema";
import { ZodError } from "zod";

export async function submitSurveyAction(prevState: any, formData: FormData) {
	try {
		const rawData = Object.fromEntries(formData.entries());
		const totalScore = parseInt(rawData.totalScore as string) || 0;
		const totalQuestions = parseInt(rawData.totalQuestions as string) || 10;

		const surveyData = {
			ageGroup: rawData.ageGroup,
			education: rawData.education,
			occupation: rawData.occupation,
			totalScore,
			totalQuestions,
		};

		// Validate
		surveySchema.parse(surveyData);

		// บันทึกลง Supabase
		const supabase = await createClient();
		const { error } = await supabase.from("survey_responses").insert([
			{
				total_score: totalScore,
				total_questions: totalQuestions,
				age_group: surveyData.ageGroup,
				education: surveyData.education,
				occupation: surveyData.occupation,
			},
		]);
		if (error) throw error;

		return { success: true, message: "ขอบคุณสำหรับการให้ข้อมูล! 🎉" };
	} catch (error: any) {
		if (error instanceof ZodError) {
			return {
				success: false,
				message: error.errors.map((e) => e.message).join(", "),
			};
		}
		return { success: false, message: error?.message || "เกิดข้อผิดพลาด" };
	}
}
