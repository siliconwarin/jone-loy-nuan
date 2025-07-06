// lib/actions/quiz.ts
"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitQuizSummaryAction(
	prevState: any,
	formData: FormData
) {
	try {
		const rawData = Object.fromEntries(formData.entries());
		// ดึงข้อมูลจาก formData ตามที่ต้องการ
		const sessionId = rawData.sessionId as string;
		const totalQuestions = parseInt(rawData.totalQuestions as string) || 0;
		const correctAnswers = parseInt(rawData.correctAnswers as string) || 0;
		const deviceType = rawData.deviceType as string;
		const userAgent = rawData.userAgent as string;

		const supabase = await createClient();
		const { error } = await supabase.from("quiz_responses").insert([
			{
				session_id: sessionId,
				total_questions: totalQuestions,
				correct_answers: correctAnswers,
				device_type: deviceType,
				user_agent: userAgent,
			},
		]);
		if (error) throw error;

		return { success: true, message: "บันทึกผล quiz สำเร็จ!" };
	} catch (error: any) {
		return { success: false, message: error?.message || "เกิดข้อผิดพลาด" };
	}
}
