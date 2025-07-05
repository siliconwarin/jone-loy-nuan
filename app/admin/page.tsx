import { createClient } from "@/utils/supabase/server";
import { LoginForm } from "@/components/login-form";
import QuizTable from "./quizzes/quiz-table";
import { redirect } from "next/navigation";

export default async function AdminPage() {
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

	// Fetch questions for initial table render
	const { data: questions, error } = await supabase
		.from("questions")
		.select("*")
		.order("order_index", { ascending: true });

	if (error) {
		console.error("Error fetching questions:", error.message);
		return (
			<p className="text-center text-red-600 p-6">
				เกิดข้อผิดพลาดในการโหลดคำถาม: {error.message}
			</p>
		);
	}

	return <QuizTable initialData={questions ?? []} />;
}
