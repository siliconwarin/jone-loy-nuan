"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useTransition, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal, Search } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteQuestionAction } from "@/lib/actions/questions";
import type { QuestionWithAnswers } from "@/lib/types";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";

// This type is based on the return type of our database function
// (ย้ายมาจาก page.tsx เดิม)
type Question = QuestionWithAnswers;

// --- Columns Definition ---
const CellAction = ({ questionId }: { questionId: string }) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this question?")) {
			startTransition(async () => {
				const result = await deleteQuestionAction(questionId);
				if (result.success) {
					toast.success("Question deleted successfully!");
					// Note: a full page reload or re-fetch is needed to see the change.
					// Server actions + router.refresh() is a common pattern for this.
				} else {
					toast.error(result.error || "Failed to delete question.");
				}
			});
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem asChild>
					<Link href={`/admin/quizzes/${questionId}/edit`}>Edit</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={`/admin/quizzes/${questionId}/images`}>
						Manage Images
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={handleDelete} disabled={isPending}>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const columns: ColumnDef<Question>[] = [
	{
		accessorKey: "question_text",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Question
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const text = row.original.question_text;
			return (
				<div className="pl-4 font-medium" title={text}>
					{text.length > 80 ? `${text.substring(0, 80)}...` : text}
				</div>
			);
		},
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction questionId={row.original.id} />,
	},
];
// --- End Columns Definition ---

export default function AdminContent() {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const searchParams = useSearchParams();
	const router = useRouter();
	const query = searchParams.get("query") || "";

	const fetchQuestions = useCallback(async () => {
		setIsLoading(true);
		const supabase = createClient();
		let queryBuilder = supabase
			.rpc("get_questions_with_answers")
			.order("order_index", { ascending: true });

		if (query) {
			queryBuilder = queryBuilder.ilike("question_text", `%${query}%`);
		}

		const { data, error } = await queryBuilder;

		if (error) {
			toast.error("Failed to fetch questions.");
			console.error(error);
			setQuestions([]);
		} else {
			setQuestions(data || []);
		}
		setIsLoading(false);
	}, [query]); // query เป็น dependency ของ useCallback

	useEffect(() => {
		fetchQuestions();
	}, [fetchQuestions]);

	// Handle search form submission
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const searchQuery = formData.get("query") as string;
		router.push(`/admin?query=${searchQuery}`);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b gap-4">
				<h1 className="text-xl font-semibold">จัดการ Quiz</h1>
				<div className="flex items-center gap-4">
					<form onSubmit={handleSearch} className="relative flex-1">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							name="query"
							placeholder="ค้นหาคำถาม..."
							defaultValue={query}
							className="pl-9"
						/>
					</form>
					<Button asChild>
						<Link href="/admin/quizzes/new">เพิ่มคำถาม</Link>
					</Button>
				</div>
			</header>
			<main className="flex-1 p-4 md:p-6">
				{isLoading ? (
					<div className="text-center py-8 text-gray-500">Loading...</div>
				) : (
					<DataTable columns={columns} data={questions} />
				)}
			</main>
		</div>
	);
}
