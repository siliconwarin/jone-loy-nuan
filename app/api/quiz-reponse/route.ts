import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
	try {
		const data = await req.json();

		// ตัวอย่าง expected data:
		// {
		//   session_id: "quiz_...",
		//   total_questions: 10,
		//   correct_answers: 7,
		//   device_type: "mobile",
		//   user_agent: "..."
		// }

		// Validate ข้อมูลเบื้องต้น (optional)
		if (
			!data.session_id ||
			typeof data.total_questions !== "number" ||
			typeof data.correct_answers !== "number"
		) {
			return NextResponse.json(
				{ success: false, message: "ข้อมูลไม่ครบถ้วน" },
				{ status: 400 }
			);
		}
		// บันทึกลง Supabase
		const supabase = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!
		);
		const { error } = await supabase.from("quiz_responses").insert([
			{
				session_id: data.session_id,
				total_questions: data.total_questions,
				correct_answers: data.correct_answers,
				device_type: data.device_type || null,
				user_agent: data.user_agent || null,
			},
		]);
		if (error) {
			return NextResponse.json(
				{ success: false, message: error.message },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true });
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, message: err?.message || "เกิดข้อผิดพลาด" },
			{ status: 500 }
		);
	}
}
