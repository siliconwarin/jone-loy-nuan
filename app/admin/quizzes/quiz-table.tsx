"use client";

import { useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { QuizForm } from "./quiz-form";
import type { Database } from "@/lib/database.types";
import { type QuestionRow as AdminQuestionRow } from "@/lib/actions/questions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SvgUploadDialog } from "./svg-upload-dialog";
import { toast } from "sonner";

export default function QuizTable({
	initialData,
}: {
	initialData: AdminQuestionRow[];
}) {
	const [data, setData] = useState(initialData);
	const [editingQuestion, setEditingQuestion] =
		useState<AdminQuestionRow | null>(null);
	const [search, setSearch] = useState("");
	const [isFormOpen, setFormOpen] = useState(false);
	const [isUploadOpen, setUploadOpen] = useState(false);
	const supabase = createClient();

	const filteredData = useMemo(() => {
		if (!search) return data;
		return data.filter((q) =>
			q.question_text?.toLowerCase().includes(search.toLowerCase())
		);
	}, [data, search]);

	async function handleUpsert(
		payload: Partial<Database["public"]["Tables"]["questions"]["Row"]>
	) {
		const submission = {
			...payload,
			content: payload.content ?? {},
			answers: payload.answers ?? [],
			result: payload.result ?? {},
		};
		const { data: saved, error } = await supabase
			.from("questions")
			.upsert(submission)
			.select()
			.single();

		if (error) {
			toast.error(`Error saving question: ${error.message}`);
			return;
		}

		if (saved) {
			toast.success("Question saved successfully!");
			setData((prev) => {
				const idx = prev.findIndex((q) => q.id === saved.id);
				if (idx === -1)
					return [...prev, saved as AdminQuestionRow].sort(
						(a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
					);
				const copy = [...prev];
				copy[idx] = saved as AdminQuestionRow;
				return copy.sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
			});
			setFormOpen(false);
		}
	}

	async function handleDelete(id: string) {
		const { error } = await supabase.from("questions").delete().eq("id", id);
		if (!error) {
			toast.success("Question deleted.");
			setData((prev) => prev.filter((q) => q.id !== id));
		} else {
			toast.error(`Error deleting question: ${error.message}`);
		}
	}

	const handleEdit = (question: AdminQuestionRow) => {
		setEditingQuestion(question);
		setFormOpen(true);
	};

	const handleUpload = (question: AdminQuestionRow) => {
		setEditingQuestion(question);
		setUploadOpen(true);
	};

	const handleFormSubmit = (
		formData: Partial<Database["public"]["Tables"]["questions"]["Row"]>
	) => {
		handleUpsert(formData);
		setEditingQuestion(null);
	};

	const tableData = filteredData.map((q) => ({
		...q,
		onEdit: () => handleEdit(q),
		onDelete: () => handleDelete(q.id),
		onUploadSvg: () => handleUpload(q),
	}));

	return (
		<div className="container mx-auto py-10">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Quiz Management</h1>
				<div className="flex items-center gap-2">
					<Input
						placeholder="Search questions..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="max-w-sm"
					/>
					<Button
						variant="outline"
						className="ml-auto"
						onClick={() => {
							setEditingQuestion(null);
							setFormOpen(true);
						}}
					>
						Create Question
					</Button>
				</div>
			</div>
			<DataTable columns={columns} data={tableData} />
			<QuizForm
				open={isFormOpen}
				initialData={editingQuestion}
				onClose={() => setFormOpen(false)}
				onSubmit={handleFormSubmit}
			/>
			<SvgUploadDialog
				open={isUploadOpen}
				onOpenChange={setUploadOpen}
				scenarioId={(editingQuestion?.content as any)?.original_id ?? ""}
				onUploadComplete={() => {
					setUploadOpen(false);
					toast.success("SVG uploaded and linked successfully!");
				}}
			/>
		</div>
	);
}
