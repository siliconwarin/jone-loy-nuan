"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import type { Database } from "@/lib/database.types";

// Re-use generated types from database.types.ts
export type QuestionRow = Database["public"]["Tables"]["questions"]["Row"];
export type QuestionInsert =
	Database["public"]["Tables"]["questions"]["Insert"];
export type QuestionUpdate =
	Database["public"]["Tables"]["questions"]["Update"];

export interface AdminQuestionDisplay {
	id: string;
	question: string;
	category: string | null;
	content: Json;
	answerCount: number;
	redFlagsCount: number;
	orderIndex: number | null;
	createdAt: string;
}

// Transform DB row -> Admin display
function toAdminDisplay(q: QuestionRow): AdminQuestionDisplay {
	return {
		id: q.id,
		question: q.question_text ?? "",
		category: q.category,
		content: q.content,
		answerCount: Array.isArray(q.answers) ? q.answers.length : 0,
		redFlagsCount: Array.isArray(q.red_flags) ? q.red_flags.length : 0,
		orderIndex: q.order_index,
		createdAt: q.created_at,
	};
}

// GET all questions with optional search
export async function fetchQuestions(
	search?: string
): Promise<AdminQuestionDisplay[]> {
	const supabase = await createClient();

	let query = supabase
		.from("questions")
		.select("*")
		.order("order_index", { ascending: true });

	if (search) {
		query = query.ilike("question_text", `%${search}%`);
	}

	const { data, error } = await query;
	if (error) throw new Error(error.message);

	return (data ?? []).map(toAdminDisplay);
}

// DELETE question by id
export async function removeQuestion(id: string) {
	const supabase = await createClient();
	const { error } = await supabase.from("questions").delete().eq("id", id);
	if (error) throw new Error(error.message);
	revalidatePath("/admin/quizzes");
}
