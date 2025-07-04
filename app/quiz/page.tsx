import { createClient } from "@/utils/supabase/server";
import { QuizClient } from "./_component/quiz-client";
import { type Database } from "@/lib/database.types";

export type QuestionWithImages =
	Database["public"]["Functions"]["get_questions_with_images"]["Returns"][0];

type QuestionRow = Database["public"]["Tables"]["questions"]["Row"];

function buildImageUrl(bucketUrl: string, path: string) {
	return `${bucketUrl}/object/public/${encodeURIComponent(path)}`;
}

export default async function QuizPage() {
	const supabase = await createClient();

	// Use the new RPC function to get questions with image URLs
	let { data: questions, error } = await supabase.rpc(
		"get_questions_with_images"
	);

	if (error || !questions) {
		// fallback to manual construction
		const { data: rows, error: tableError } = await supabase
			.from("questions")
			.select("*")
			.order("order_index", { ascending: true });

		if (tableError || !rows) {
			console.error("Error fetching questions fallback:", tableError);
			return <div>Failed to load quiz. Please try again later.</div>;
		}

		// Build public URLs manually
		const bucketUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(
			/^https?:\/\//,
			""
		);
		const fullBucketBase = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1`;

		questions = (rows as QuestionRow[]).map((q) => {
			const originalId = (q.content as any)?.original_id ?? "";
			const normalPath = `${originalId}/normal.svg`;
			const resultPath = `${originalId}/result.svg`;
			const normal_image_url = supabase.storage
				.from("scenario-images")
				.getPublicUrl(normalPath).data.publicUrl;
			const result_image_url = supabase.storage
				.from("scenario-images")
				.getPublicUrl(resultPath).data.publicUrl;

			return {
				...q,
				normal_image_url,
				result_image_url,
			};
		}) as unknown as QuestionWithImages[];
	}

	if (!questions) {
		return <div>Failed to load quiz questions.</div>;
	}

	return <QuizClient initialQuestions={questions} />;
}
