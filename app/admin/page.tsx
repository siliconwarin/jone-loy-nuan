import { createClient } from "@/utils/supabase/server";
import { LoginForm } from "@/components/login-form";
import { redirect } from "next/navigation";
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
import { Search, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { deleteQuestionAction } from "@/lib/actions/questions";

interface PageProps {
	searchParams: Promise<{ search?: string }>;
}

export default async function AdminPage({ searchParams }: PageProps) {
	// 🔒 Check authentication via Supabase (server-side)
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// If not logged in → show login form right on this page
	if (!user) {
		return (
			<div className="flex min-h-screen items-center justify-center p-6">
				<LoginForm />
			</div>
		);
	}

	// OPTIONAL: Limit access to specific admin emails
	const allowedAdmins = ["memographic.dev@gmail.com"];
	if (!allowedAdmins.includes(user.email ?? "")) {
		redirect("/");
	}

	// Get search params
	const { search: rawSearch } = await searchParams;
	const search = rawSearch?.trim() ?? "";

	// Fetch questions with search
	let query = supabase
		.from("questions")
		.select("*")
		.order("order_index", { ascending: true });

	if (search) {
		query = query.ilike("question_text", `%${search}%`);
	}

	const { data: questions, error } = await query;

	if (error) {
		console.error("Error fetching questions:", error.message);
		return (
			<p className="text-center text-red-600 p-6">
				เกิดข้อผิดพลาดในการโหลดคำถาม: {error.message}
			</p>
		);
	}

	// Transform data for display
	const displayQuestions = (questions ?? []).map((q) => ({
		id: q.id,
		question: q.question_text ?? "",
		category: q.category,
		answerCount: Array.isArray(q.answers) ? q.answers.length : 0,
		orderIndex: q.order_index,
	}));

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">จัดการคำถาม Quiz</h1>
					<p className="text-sm text-gray-600 mt-1">
						ทั้งหมด {displayQuestions.length} คำถาม
					</p>
				</div>

				{/* Search and Actions */}
				<div className="flex flex-col sm:flex-row gap-4">
					{/* Search */}
					<form className="w-full sm:w-72" action="/admin" method="get">
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

					{/* Add New Question Button */}
					<Button asChild>
						<Link href="/admin/quizzes/new">
							<Plus className="h-4 w-4 mr-2" />
							เพิ่มคำถาม
						</Link>
					</Button>
				</div>
			</div>

			{/* Table */}
			<div className="bg-white rounded-lg shadow overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-1/12">ลำดับ</TableHead>
							<TableHead className="w-3/12">คำถาม</TableHead>
							<TableHead className="w-2/12 text-center">หมวดหมู่</TableHead>
							<TableHead className="w-2/12 text-center">ตัวเลือก</TableHead>
							<TableHead className="w-2/12 text-center">รูปภาพ</TableHead>
							<TableHead className="w-2/12 text-center">จัดการ</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{displayQuestions.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center py-8 text-gray-500"
								>
									{search ? "ไม่พบคำถามที่ค้นหา" : "ยังไม่มีคำถาม"}
								</TableCell>
							</TableRow>
						) : (
							displayQuestions.map((q) => (
								<TableRow key={q.id}>
									<TableCell className="text-center">
										{q.orderIndex || "-"}
									</TableCell>
									<TableCell className="py-3">
										<Link
											href={`/quiz?start=${q.id}`}
											target="_blank"
											className="text-blue-600 hover:underline"
										>
											{q.question.length > 80
												? `${q.question.substring(0, 80)}...`
												: q.question}
										</Link>
									</TableCell>
									<TableCell className="text-center">
										{q.category || "-"}
									</TableCell>
									<TableCell className="text-center">
										{q.answerCount} ตัวเลือก
									</TableCell>
									<TableCell className="text-center">
										<Button variant="outline" size="sm" asChild>
											<Link href={`/admin/quizzes/${q.id}/images`}>
												อัปโหลดรูป
											</Link>
										</Button>
									</TableCell>
									<TableCell className="text-center">
										<div className="flex justify-center gap-2">
											{/* Edit Button */}
											<Button variant="ghost" size="sm" asChild>
												<Link href={`/admin/quizzes/${q.id}/edit`}>แก้ไข</Link>
											</Button>

											{/* Delete Button */}
											<form action={deleteQuestionAction.bind(null, q.id)}>
												<Button
													variant="ghost"
													size="sm"
													className="hover:text-red-600"
													type="submit"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</form>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Quick Stats */}
			<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-sm font-medium text-gray-500">คำถามทั้งหมด</h3>
					<p className="text-2xl font-bold text-gray-900">
						{displayQuestions.length}
					</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-sm font-medium text-gray-500">หมวดหมู่</h3>
					<p className="text-2xl font-bold text-gray-900">
						{
							new Set(displayQuestions.map((q) => q.category).filter(Boolean))
								.size
						}
					</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-sm font-medium text-gray-500">ตัวเลือกเฉลี่ย</h3>
					<p className="text-2xl font-bold text-gray-900">
						{displayQuestions.length > 0
							? Math.round(
									displayQuestions.reduce((sum, q) => sum + q.answerCount, 0) /
										displayQuestions.length
							  )
							: 0}
					</p>
				</div>
			</div>
		</div>
	);
}
