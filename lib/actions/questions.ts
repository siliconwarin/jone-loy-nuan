"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import type { Database } from "@/lib/database.types";
import { redirect } from "next/navigation";

// Re-use generated types from database.types.ts
type QuestionRow =
	Database["public"]["Functions"]["get_questions_with_answers"]["Returns"][number];

export interface AdminQuestionDisplay {
	id: string;
	question: string;
	category: string | null;
	answerCount: number;
	orderIndex: number | null;
}

// Transform DB function row -> Admin display
function toAdminDisplay(q: QuestionRow): AdminQuestionDisplay {
	return {
		id: q.id,
		question: q.question_text ?? "",
		category: q.category,
		answerCount: Array.isArray(q.answers) ? q.answers.length : 0,
		orderIndex: q.order_index,
	};
}

export async function fetchQuestions(search: string) {
	const supabase = await createClient();
	const { data, error } = await supabase.rpc("get_questions_with_answers");

	if (error) {
		console.error("Error fetching questions:", error);
		return [];
	}

	const filteredData = search
		? data.filter((q: QuestionRow) =>
				q.question_text?.toLowerCase().includes(search.toLowerCase())
		  )
		: data;

	return (filteredData ?? []).map(toAdminDisplay);
}

// NEW: Function to fetch questions for the actual quiz client
export async function fetchQuizQuestions() {
	const supabase = await createClient();
	// Fetch all questions and their answers, ordered by `order_index`
	const { data, error } = await supabase
		.rpc("get_questions_with_answers")
		.order("order_index", { ascending: true });

	if (error) {
		console.error("Error fetching questions for quiz:", error);
		return [];
	}

	// Return the full data structure, including the nested answers array
	return data ?? [];
}

// GET single question by id
export async function fetchQuestionById(id: string) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.rpc("get_questions_with_answers")
		.eq("id", id)
		.single();

	if (error) {
		console.error(`Error fetching question ${id}:`, error);
		return null;
	}
	return data;
}

// UPSERT question action
// This now needs to handle answers separately.
// For simplicity, we'll focus on fetching first.
// The upsert form needs a major refactor to handle separate answer fields.
export async function upsertQuestion(
	previousState: { error: string } | null,
	formData: FormData
) {
	const supabase = await createClient();
	const id = formData.get("id") as string | null;

	try {
		const questionData = {
			question_text: formData.get("question_text") as string,
			category: formData.get("category") as string,
			order_index: Number(formData.get("order_index")),
		};

		if (id) {
			// Update existing question
			const { error } = await supabase
				.from("questions")
				.update(questionData)
				.eq("id", id);
			if (error) throw error;
		} else {
			// Create new question
			const { error } = await supabase.from("questions").insert({
				...questionData,
				content: {}, // Provide default empty JSON
				result: {}, // Provide default empty JSON
			});
			if (error) throw error;
		}

		revalidatePath("/admin");
		redirect("/admin");
	} catch (e: unknown) {
		const error = e as Error;
		return { error: error.message };
	}
}

// DELETE question by id (new standalone action)
// This works as intended because of "ON DELETE CASCADE" in the database.
export async function deleteQuestionAction(id: string) {
	"use server";
	const supabase = await createClient();
	const { error } = await supabase.from("questions").delete().eq("id", id);
	if (error) {
		// Log the error for server-side debugging
		console.error("Delete error:", error);
		// In a real app, you might want to handle this more gracefully
		// For now, we'll just log it. The revalidation might not happen
		// but the user will see the item is not deleted.
	}
	revalidatePath("/admin");
}
