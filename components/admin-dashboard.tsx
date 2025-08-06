"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { 
	BookOpen, 
	Plus, 
	BarChart3, 
	Users, 
	FileText,
	TrendingUp,
	Clock,
	CheckCircle
} from "lucide-react";

interface DashboardStats {
	totalQuestions: number;
	totalResponses: number;
	recentQuestions: any[];
}

export function AdminDashboard() {
	const [stats, setStats] = useState<DashboardStats>({
		totalQuestions: 0,
		totalResponses: 0,
		recentQuestions: []
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchDashboardData = async () => {
			const supabase = createClient();
			
			try {
				// Get total questions count
				const { count: questionsCount } = await supabase
					.from("questions")
					.select("*", { count: "exact", head: true });

				// Get total quiz responses count (if quiz_responses table exists)
				// For now, we'll use a placeholder
				const totalResponses = 0; // TODO: Implement when quiz_responses table is available

				// Get recent questions (last 5)
				const { data: recentQuestions } = await supabase
					.from("questions")
					.select("id, question_text, category, created_at")
					.order("created_at", { ascending: false })
					.limit(5);

				setStats({
					totalQuestions: questionsCount || 0,
					totalResponses,
					recentQuestions: recentQuestions || []
				});
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDashboardData();
	}, []);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
					<p className="mt-2 text-gray-600">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
					<p className="text-gray-600">จัดการและติดตาม Quiz ความตระหนักเรื่องการหลอกลวงออนไลน์</p>
				</div>
				<Button asChild>
					<Link href="/admin/quizzes/new">
						<Plus className="mr-2 h-4 w-4" />
						เพิ่มคำถามใหม่
					</Link>
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">คำถามทั้งหมด</CardTitle>
						<BookOpen className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalQuestions}</div>
						<p className="text-xs text-muted-foreground">
							คำถามที่สร้างในระบบ
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">การตอบ Quiz</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalResponses}</div>
						<p className="text-xs text-muted-foreground">
							จำนวนครั้งที่ทำ Quiz
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">อัตราการตอบถูก</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">--%</div>
						<p className="text-xs text-muted-foreground">
							เฉลี่ยทั้งหมด
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Status</CardTitle>
						<CheckCircle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">Active</div>
						<p className="text-xs text-muted-foreground">
							ระบบทำงานปกติ
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center">
							<FileText className="mr-2 h-5 w-5" />
							การจัดการเนื้อหา
						</CardTitle>
						<CardDescription>
							จัดการคำถาม คำตอب และเนื้อหา Quiz
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<Button asChild className="w-full justify-start">
							<Link href="/admin/quizzes">
								<BookOpen className="mr-2 h-4 w-4" />
								จัดการคำถาม Quiz
							</Link>
						</Button>
						<Button asChild variant="outline" className="w-full justify-start">
							<Link href="/admin/quizzes/new">
								<Plus className="mr-2 h-4 w-4" />
								เพิ่มคำถามใหม่
							</Link>
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center">
							<BarChart3 className="mr-2 h-5 w-5" />
							รายงานและสถิติ
						</CardTitle>
						<CardDescription>
							ติดตามผลการใช้งานและประสิทธิภาพ
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<Button asChild variant="outline" className="w-full justify-start">
							<Link href="/admin/analytics">
								<BarChart3 className="mr-2 h-4 w-4" />
								ดูสถิติการใช้งาน
							</Link>
						</Button>
						<Button asChild variant="outline" className="w-full justify-start">
							<Link href="/admin/reports">
								<FileText className="mr-2 h-4 w-4" />
								รายงานผลการเรียนรู้
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<Clock className="mr-2 h-5 w-5" />
						คำถามล่าสุด
					</CardTitle>
					<CardDescription>
						คำถามที่เพิ่มเข้ามาใหม่ล่าสุด
					</CardDescription>
				</CardHeader>
				<CardContent>
					{stats.recentQuestions.length > 0 ? (
						<div className="space-y-3">
							{stats.recentQuestions.map((question) => (
								<div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
									<div className="flex-1">
										<p className="font-medium text-sm">
											{question.question_text?.substring(0, 80)}
											{question.question_text?.length > 80 && '...'}
										</p>
										<div className="flex items-center space-x-4 mt-1">
											<span className="text-xs text-gray-500">
												หมวดหมู่: {question.category}
											</span>
											<span className="text-xs text-gray-500">
												สร้างเมื่อ: {new Date(question.created_at).toLocaleDateString('th-TH')}
											</span>
										</div>
									</div>
									<Button asChild size="sm" variant="outline">
										<Link href={`/admin/quizzes/${question.id}/edit`}>
											แก้ไข
										</Link>
									</Button>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-gray-500">
							<BookOpen className="mx-auto h-12 w-12 text-gray-300" />
							<p className="mt-2">ยังไม่มีคำถามในระบบ</p>
							<Button asChild className="mt-4">
								<Link href="/admin/quizzes/new">
									สร้างคำถามแรก
								</Link>
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}