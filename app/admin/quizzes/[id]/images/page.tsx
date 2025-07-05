import { fetchQuestionById } from "@/lib/actions/questions";
import { createClient } from "@/utils/supabase/server";
import { ImageUploadForm } from "./image-upload-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import type { QuestionWithAnswers } from "@/lib/types";

async function getExistingImages(questionId: string) {
	const supabase = await createClient();
	const bucket = "scenario-images";

	const { data: normalData } = supabase.storage
		.from(bucket)
		.getPublicUrl(`${questionId}/normal.svg`);

	const { data: resultData } = supabase.storage
		.from(bucket)
		.getPublicUrl(`${questionId}/result.svg`);

	// Check if files exist, as getPublicUrl doesn't throw an error for non-existent files.
	// We add a timestamp to the URL to bust the cache.
	const { data: normalList } = await supabase.storage
		.from(bucket)
		.list(questionId, {
			limit: 1,
			search: "normal.svg",
		});

	const { data: resultList } = await supabase.storage
		.from(bucket)
		.list(questionId, {
			limit: 1,
			search: "result.svg",
		});

	return {
		normal:
			normalList && normalList.length > 0
				? `${normalData.publicUrl}?t=${new Date().getTime()}`
				: null,
		result:
			resultList && resultList.length > 0
				? `${resultData.publicUrl}?t=${new Date().getTime()}`
				: null,
	};
}

interface PageProps {
	params: Promise<{ id: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function UploadImagesPage({ params }: PageProps) {
	const { id } = await params;
	const question = (await fetchQuestionById(id)) as QuestionWithAnswers | null;

	if (!question) {
		return <p className="text-center p-4">Question not found.</p>;
	}

	return (
		<div className="max-w-4xl mx-auto p-4">
			<Button asChild variant="outline" size="sm" className="mb-4">
				<Link href="/admin">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Questions
				</Link>
			</Button>

			<div className="bg-white p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-2">
					Images for Question {question.order_index}
				</h1>
				<p className="text-gray-600 mb-6">{question.question_text}</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
					<div>
						<h2 className="text-lg font-semibold mb-2">Normal State Image</h2>
						<div className="border rounded-md p-2 h-64 flex items-center justify-center bg-gray-50">
							<Image
								src={question.normal_image_url}
								alt="Normal state preview"
								width={300}
								height={200}
								className="object-contain"
							/>
						</div>
					</div>
					<div>
						<h2 className="text-lg font-semibold mb-2">Result State Image</h2>
						<div className="border rounded-md p-2 h-64 flex items-center justify-center bg-gray-50">
							<Image
								src={question.result_image_url}
								alt="Result state preview"
								width={300}
								height={200}
								className="object-contain"
							/>
						</div>
					</div>
				</div>

				<div className="border-t pt-6">
					<p className="text-gray-600">
						📁 Images are stored in:{" "}
						<code>public/images/scenarios/{question.id}/</code>
					</p>
					<p className="text-sm text-gray-500 mt-2">
						To update images, replace the SVG files in the public folder.
					</p>
				</div>
			</div>
		</div>
	);
}
