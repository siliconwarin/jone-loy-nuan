"use client";

import { useActionState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

// 🎨 shadcn/ui Components
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// 🔥 Modern Imports
import { useQuizResultStore } from "@/store/quiz-store";
import { surveySchema, type SurveyFormData } from "@/lib/schema";

// 📊 Form Data Constants (เหลือแค่ 3 หัวข้อแรก)
const FORM_DATA = {
	ageGroups: [
		{ value: "under18", label: "ต่ำกว่า 18 ปี" },
		{ value: "18-24", label: "18-24 ปี" },
		{ value: "25-34", label: "25-34 ปี" },
		{ value: "35-44", label: "35-44 ปี" },
		{ value: "45-54", label: "45-54 ปี" },
		{ value: "55-64", label: "55-64 ปี" },
		{ value: "65+", label: "65 ปีขึ้นไป" },
	],
	educationLevels: [
		{ value: "none", label: "ไม่มีวุฒิการศึกษา" },
		{ value: "primary", label: "ประถมศึกษา" },
		{ value: "secondary", label: "มัธยมศึกษา" },
		{ value: "vocational", label: "ปวช./ปวส." },
		{ value: "bachelor", label: "ปริญญาตรี" },
		{ value: "master", label: "ปริญญาโท" },
		{ value: "doctorate", label: "ปริญญาเอก" },
	],
	occupations: [
		{ value: "student", label: "นักเรียน/นักศึกษา" },
		{ value: "government", label: "ข้าราชการ/พนักงานรัฐวิสาหกิจ" },
		{ value: "private", label: "พนักงานบริษัทเอกชน" },
		{ value: "business", label: "ธุรกิจส่วนตัว/ค้าขาย" },
		{ value: "freelance", label: "อาชีพอิสระ/ฟรีแลนซ์" },
		{ value: "labor", label: "รับจ้างทั่วไป" },
		{ value: "agriculture", label: "เกษตรกร" },
		{ value: "retired", label: "เกษียณอายุ" },
		{ value: "unemployed", label: "ว่างงาน" },
		{ value: "other", label: "อื่นๆ" },
	],
};

// 🚀 Modern Action State Type
type ActionState = {
	status: "idle" | "loading" | "success" | "error";
	message?: string;
};

// 🔥 Modern Server Action (Async Function)
async function submitSurveyAction(
	prevState: ActionState,
	formData: FormData
): Promise<ActionState> {
	try {
		// 🔄 Simulate API delay for UX
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// 📊 Parse form data
		const rawData = Object.fromEntries(formData.entries());

		// 🎯 Get quiz score data from hidden fields
		const totalScore = parseInt(formData.get("totalScore") as string) || 0;
		const totalQuestions =
			parseInt(formData.get("totalQuestions") as string) || 10;

		// ✅ เพิ่ม debug log
		console.log("Form data entries:", Array.from(formData.entries()));
		console.log("Raw form data:", rawData);
		console.log("Total score:", totalScore);
		console.log("Total questions:", totalQuestions);

		// ✅ สร้าง surveyData ให้ตรงกับ schema ใหม่
		const surveyData = {
			ageGroup: rawData.ageGroup,
			education: rawData.education,
			occupation: rawData.occupation,
			totalScore,
			totalQuestions,
		};

		// ✅ เพิ่ม debug log
		console.log("Survey data before validation:", surveyData);

		// 🔍 Validate with Zod
		const validatedData = surveySchema.parse(surveyData);

		// 🚀 Call API
		const response = await fetch("/api/survey-response", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(validatedData),
		});

		if (!response.ok) {
			throw new Error("Failed to submit survey");
		}

		return {
			status: "success",
			message: "ขอบคุณสำหรับการให้ข้อมูล! 🎉",
		};
	} catch (error) {
		console.error("Survey submission error:", error);
		return {
			status: "error",
			message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
		};
	}
}

export default function SurveyPage() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	// 🔥 Modern useActionState Hook
	const [actionState, formAction] = useActionState(submitSurveyAction, {
		status: "idle" as const,
	});

	// 🎯 Quiz Store for Score
	const { getSummary } = useQuizResultStore();
	const { score, total } = getSummary();

	// ✅ เพิ่ม debug log
	console.log("Quiz store data:", { score, total });

	// 🎨 React Hook Form Setup
	const form = useForm<SurveyFormData>({
		resolver: zodResolver(surveySchema),
		defaultValues: {
			// ✅ ไม่ต้องใส่ default values เพราะใช้ hidden fields
		},
	});

	// 🚀 Handle Success State
	useEffect(() => {
		if (actionState.status === "success") {
			toast.success(actionState.message);
			startTransition(() => {
				router.push("/result");
			});
		} else if (actionState.status === "error") {
			toast.error(actionState.message);
		}
	}, [actionState.status, actionState.message, router]);

	// 🎨 Loading State
	const isLoading = actionState.status === "loading" || isPending;

	return (
		<div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 overflow-y-auto">
			<div className="max-w-2xl mx-auto">
				{/* 🏆 Score Display */}
				<Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl font-bold text-gray-900">
							🎉 คุณทำคะแนนได้ {score} คะแนน!
						</CardTitle>
						<CardDescription className="text-gray-600">
							กรุณากรอกแบบสอบถามเพื่อช่วยปรับปรุงระบบของเรา
						</CardDescription>
					</CardHeader>
				</Card>

				{/* 📝 Survey Form */}
				<Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							📊 แบบสอบถามความคิดเห็น
						</CardTitle>
						<CardDescription>
							ข้อมูลของคุณจะถูกเก็บเป็นความลับและใช้เพื่อการศึกษาเท่านั้น
						</CardDescription>
					</CardHeader>

					<CardContent>
						<Form {...form}>
							<form action={formAction} className="space-y-6">
								{/* 🎯 Hidden Quiz Score Fields */}
								<input type="hidden" name="totalScore" value={score || 0} />
								<input
									type="hidden"
									name="totalQuestions"
									value={total || 10}
								/>

								{/* 👤 Age Group */}
								<FormField
									control={form.control}
									name="ageGroup"
									render={({ field }) => (
										<FormItem>
											<FormLabel>ช่วงอายุ *</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												name="ageGroup"
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="เลือกช่วงอายุ" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{FORM_DATA.ageGroups.map((age) => (
														<SelectItem key={age.value} value={age.value}>
															{age.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* 🎓 Education */}
								<FormField
									control={form.control}
									name="education"
									render={({ field }) => (
										<FormItem>
											<FormLabel>ระดับการศึกษา *</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												name="education"
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="เลือกระดับการศึกษา" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{FORM_DATA.educationLevels.map((edu) => (
														<SelectItem key={edu.value} value={edu.value}>
															{edu.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* 💼 Occupation */}
								<FormField
									control={form.control}
									name="occupation"
									render={({ field }) => (
										<FormItem>
											<FormLabel>อาชีพ *</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												name="occupation"
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="เลือกอาชีพ" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{FORM_DATA.occupations.map((occ) => (
														<SelectItem key={occ.value} value={occ.value}>
															{occ.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* 🚀 Submit Button */}
								<div className="pt-6">
									<Button
										type="submit"
										disabled={isLoading}
										className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
									>
										{isLoading ? (
											<>
												<Loader2 className="mr-2 h-5 w-5 animate-spin" />
												กำลังส่งข้อมูล...
											</>
										) : actionState.status === "success" ? (
											<>
												<CheckCircle className="mr-2 h-5 w-5" />
												ส่งสำเร็จ!
											</>
										) : actionState.status === "error" ? (
											<>
												<AlertCircle className="mr-2 h-5 w-5" />
												ลองใหม่อีกครั้ง
											</>
										) : (
											"ส่งแบบสอบถาม"
										)}
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
