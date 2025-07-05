"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface UpsertScenarioImageParams {
	scenario_id: string;
	variant: "normal" | "result";
	file_path: string;
}

export async function upsertScenarioImage({
	scenario_id,
	variant,
	file_path,
}: UpsertScenarioImageParams) {
	if (!scenario_id) {
		throw new Error("Scenario ID is required.");
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("scenario_images")
		.upsert(
			{ scenario_id, variant, file_path },
			{ onConflict: "scenario_id, variant" }
		)
		.select();

	if (error) {
		console.error("Error upserting scenario image:", error);
		throw new Error(error.message);
	}

	// Revalidate the quiz page to show new images
	revalidatePath("/quiz");

	return data;
}

export async function uploadQuestionImages(
	previousState: { error?: string; success?: boolean } | null,
	formData: FormData
) {
	const questionId = formData.get("questionId") as string;
	const normalFile = formData.get("normal_svg") as File | null;
	const resultFile = formData.get("result_svg") as File | null;

	if (!questionId) {
		return { error: "Missing Question ID." };
	}
	if (!normalFile?.size && !resultFile?.size) {
		return { error: "Please provide at least one image file." };
	}

	const supabase = await createClient();

	try {
		if (normalFile && normalFile.size > 0) {
			await uploadVariant(supabase, questionId, normalFile, "normal");
		}
		if (resultFile && resultFile.size > 0) {
			await uploadVariant(supabase, questionId, resultFile, "result");
		}
	} catch (e: unknown) {
		const error = e as Error;
		return { error: error.message };
	}

	revalidatePath(`/admin/quizzes/${questionId}/images`);
	revalidatePath("/admin");
	return { success: true };
}

async function uploadVariant(
	supabase: Awaited<ReturnType<typeof createClient>>,
	questionId: string,
	file: File,
	variant: "normal" | "result"
) {
	const filePath = `${questionId}/${variant}.svg`;

	const { error: uploadError } = await supabase.storage
		.from("scenario-images")
		.upload(filePath, file, {
			upsert: true,
			contentType: "image/svg+xml",
		});

	if (uploadError) {
		throw new Error(`Storage Error: ${uploadError.message}`);
	}
}
