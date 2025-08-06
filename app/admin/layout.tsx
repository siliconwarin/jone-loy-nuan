import { createClient } from "@/utils/supabase/server";
import { AdminHeader } from "@/components/admin-header";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AdminLayoutContent>{children}</AdminLayoutContent>;
}

async function AdminLayoutContent({ children }: { children: React.ReactNode }) {
	// เนื่องจาก ProtectedRoute ตรวจสอบ auth แล้ว เราแค่ต้องดึง user data มาแสดง
	const supabase = await createClient();
	const { data } = await supabase.auth.getUser();

	return (
		<div className="min-h-screen bg-gray-50">
			<AdminHeader user={data.user!} />
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
		</div>
	);
}
