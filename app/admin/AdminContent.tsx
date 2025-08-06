"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useTransition, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal, Search, Eye } from "lucide-react";
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
				<DropdownMenuLabel>การจัดการ</DropdownMenuLabel>
				<DropdownMenuItem asChild>
					<Link href={`/quiz?preview=${questionId}`}>
						<Eye className="mr-2 h-4 w-4" />
						ดูตัวอย่าง
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={`/admin/quizzes/${questionId}/edit`}>แก้ไขคำถาม</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={`/admin/quizzes/${questionId}/images`}>
						จัดการรูปภาพ
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={handleDelete} disabled={isPending} className="text-red-600">
					ลบคำถาม
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const columns: ColumnDef<Question>[] = [
	{
		accessorKey: "order_index",
		header: "#",
		cell: ({ row }) => (
			<div className="w-12 text-center font-mono text-sm">
				{row.original.order_index}
			</div>
		),
	},
	{
		accessorKey: "question_text",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				คำถาม
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const text = row.original.question_text;
			return (
				<div className="max-w-md" title={text}>
					<div className="font-medium line-clamp-2">
						{text.length > 100 ? `${text.substring(0, 100)}...` : text}
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "category",
		header: "หมวดหมู่",
		cell: ({ row }) => {
			const category = row.original.category;
			return (
				<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
					{category || "ไม่มีหมวดหมู่"}
				</span>
			);
		},
	},
	{
		accessorKey: "answers",
		header: "คำตอบ",
		cell: ({ row }) => {
			const answers = row.original.answers;
			const answerCount = Array.isArray(answers) ? answers.length : 0;
			const correctAnswers = Array.isArray(answers) ? 
				answers.filter((a: any) => a.isCorrect).length : 0;
			
			return (
				<div className="flex items-center gap-2">
					<span className="text-sm font-mono">
						{answerCount} ข้อ
					</span>
					{correctAnswers === 1 ? (
						<span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
							✓
						</span>
					) : (
						<span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
							✗
						</span>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "created_at",
		header: "สร้างเมื่อ",
		cell: ({ row }) => {
			const date = new Date(row.original.created_at);
			return (
				<div className="text-sm text-gray-500">
					{date.toLocaleDateString('th-TH')}
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "การจัดการ",
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
		<div className="space-y-6">
			{/* Header Section */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">จัดการคำถาม Quiz</h1>
					<p className="text-gray-600">จัดการคำถาม คำตอบ และเนื้อหา Quiz ความตระหนักเรื่องการหลอกลวงออนไลน์</p>
				</div>
				<Button asChild>
					<Link href="/admin/quizzes/new">เพิ่มคำถาม</Link>
				</Button>
			</div>

			{/* Search Section */}
			<div className="flex items-center space-x-4">
				<form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
					<Input
						name="query"
						placeholder="ค้นหาคำถาม..."
						defaultValue={query}
						className="pl-9"
					/>
				</form>
			</div>

			{/* Data Table Section */}
			<div className="bg-white border rounded-lg">
				{isLoading ? (
					<div className="text-center py-8 text-gray-500">Loading...</div>
				) : (
					<DataTable columns={columns} data={questions} />
				)}
			</div>
		</div>
	);
}
