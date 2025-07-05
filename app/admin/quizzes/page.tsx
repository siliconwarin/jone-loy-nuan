import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2 } from "lucide-react";
import { fetchQuestions, removeQuestion } from "@/lib/actions/questions";
import Link from "next/link";

interface PageProps {
	searchParams: Promise<{ search?: string }>;
}

export default async function AdminQuizPage({ searchParams }: PageProps) {
	const { search: rawSearch } = await searchParams;
	const search = rawSearch?.trim() ?? "";
	const questions = await fetchQuestions(search);

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">จัดการคำถาม Quiz</h1>
					<p className="text-sm text-gray-600 mt-1">
						ทั้งหมด {questions.length} คำถาม
					</p>
				</div>
				{/* Search */}
				<form className="w-full sm:w-72" action="/admin/quizzes" method="get">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							name="search"
							placeholder="ค้นหาคำถาม..."
							defaultValue={search}
							className="pl-9"
						/>
					</div>
				</form>
			</div>

			{/* Table */}
			<div className="bg-white rounded-lg shadow overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-2/5">คำถาม</TableHead>
							<TableHead className="text-center w-1/5">หมวดหมู่</TableHead>
							<TableHead className="text-center w-1/5">ตัวเลือก</TableHead>
							<TableHead className="text-center w-1/5">Red Flags</TableHead>
							<TableHead className="text-center">จัดการ</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{questions.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-center py-8 text-gray-500"
								>
									{search ? "ไม่พบคำถามที่ค้นหา" : "ยังไม่มีคำถาม"}
								</TableCell>
							</TableRow>
						) : (
							questions.map((q) => (
								<TableRow key={q.id}>
									<TableCell className="py-3">
										<Link
											href={`/quiz?start=${q.id}`}
											target="_blank"
											className="text-blue-600 hover:underline"
										>
											{q.question}
										</Link>
									</TableCell>
									<TableCell className="text-center">{q.category}</TableCell>
									<TableCell className="text-center">{q.answerCount}</TableCell>
									<TableCell className="text-center">
										{q.redFlagsCount}
									</TableCell>
									<TableCell className="text-center">
										<form
											action={async () => {
												"use server";
												await removeQuestion(q.id);
											}}
										>
											<Button
												variant="ghost"
												size="sm"
												className="hover:text-red-600"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</form>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
