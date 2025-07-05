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
