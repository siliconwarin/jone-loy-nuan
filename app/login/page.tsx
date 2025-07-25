import { LoginForm } from "@/components/login-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
	// ถ้ามี session อยู่แล้วให้เข้า /admin/quizzes ทันที
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session?.user) {
		redirect("/admin/quizzes");
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
}
