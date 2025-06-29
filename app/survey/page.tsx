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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// 🔥 Modern Imports
import { useQuizStore } from "@/store/quiz-store";
import { surveySchema, type SurveyFormData } from "@/lib/schema";
import { quizData } from "@/lib/quiz-data";

// 📊 Form Data Constants
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
	scamTypes: [
		{ value: "investment", label: "หลอกลงทุน" },
		{ value: "shopping", label: "หลอกซื้อสินค้า" },
		{ value: "romance", label: "หลอกลวงความรัก" },
		{ value: "job", label: "หลอกงาน" },
		{ value: "lottery", label: "หลอกถูกรางวัล" },
		{ value: "banking", label: "หลอกธนาคาร/การเงิน" },
		{ value: "government", label: "หลอกเป็นหน่วยงานรัฐ" },
		{ value: "callcenter", label: "คอลเซ็นเตอร์" },
		{ value: "other", label: "อื่นๆ" },
	],
	socialMediaUsage: [
		{ value: "never", label: "ไม่ใช้เลย" },
		{ value: "rarely", label: "นานๆ ครั้ง (เดือนละ 1-2 ครั้ง)" },
		{ value: "sometimes", label: "บางครั้ง (สัปดาห์ละ 1-2 ครั้ง)" },
		{ value: "often", label: "บ่อย (2-3 วันต่อครั้ง)" },
		{ value: "daily", label: "ทุกวัน (วันละ 1-2 ครั้ง)" },
		{ value: "several_daily", label: "วันละหลายครั้ง" },
		{ value: "hourly", label: "เกือบทุกชั่วโมง" },
		{ value: "constantly", label: "ตลอดเวลา (เช็คทุก 5-10 นาที)" },
	],
	platforms: [
		{ value: "facebook", label: "Facebook" },
		{ value: "line", label: "Line" },
		{ value: "instagram", label: "Instagram" },
		{ value: "tiktok", label: "TikTok" },
		{ value: "twitter", label: "Twitter/X" },
		{ value: "youtube", label: "YouTube" },
		{ value: "telegram", label: "Telegram" },
		{ value: "whatsapp", label: "WhatsApp" },
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

		// Handle arrays (platforms, scamTypes)
		const platforms = formData.getAll("platforms");
		const scamTypes = formData.getAll("scamTypes");

		// 🎯 Get quiz score data from hidden fields
		const totalScore = parseInt(formData.get("totalScore") as string) || 0;
		const totalQuestions =
			parseInt(formData.get("totalQuestions") as string) || 0;

		const surveyData = {
			...rawData,
			totalScore,
			totalQuestions,
			platforms,
			scamTypes: scamTypes.length > 0 ? scamTypes : undefined,
		};

		// 🔍 Validate with Zod
		const validatedData = surveySchema.parse(surveyData);

		// 🚀 Call API (replace with actual API endpoint)
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
	const { getTotalScore, resetQuiz } = useQuizStore();
	const totalScore = getTotalScore();

	// 🎨 React Hook Form Setup
	const form = useForm<SurveyFormData>({
		resolver: zodResolver(surveySchema),
		defaultValues: {
			platforms: [],
			scamTypes: [],
		},
	});

	// 🎯 Watch for scam experience to show/hide scam types
	const hasScamExperience = form.watch("hasScamExperience");

	// 🚀 Handle Success State
	useEffect(() => {
		if (actionState.status === "success") {
			toast.success(actionState.message);
			startTransition(() => {
				resetQuiz();
				router.push("/result");
			});
		} else if (actionState.status === "error") {
			toast.error(actionState.message);
		}
	}, [actionState.status, actionState.message, router, resetQuiz]);

	// 🎨 Loading State
	const isLoading = actionState.status === "loading" || isPending;

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
			<div className="max-w-2xl mx-auto">
				{/* 🏆 Score Display */}
				<Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl font-bold text-gray-900">
							🎉 คุณทำคะแนนได้ {totalScore} คะแนน!
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
								<input type="hidden" name="totalScore" value={totalScore} />
								<input
									type="hidden"
									name="totalQuestions"
									value={quizData.length}
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

								{/* 🚨 Scam Experience */}
								<FormField
									control={form.control}
									name="hasScamExperience"
									render={({ field }) => (
										<FormItem className="space-y-3">
											<FormLabel>คุณเคยถูกหลอกลวงออนไลน์หรือไม่? *</FormLabel>
											<FormControl>
												<RadioGroup
													onValueChange={field.onChange}
													defaultValue={field.value}
													className="flex flex-col space-y-1"
													name="hasScamExperience"
												>
													<div className="flex items-center space-x-2">
														<RadioGroupItem value="yes" id="scam-yes" />
														<Label htmlFor="scam-yes">เคย</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem value="no" id="scam-no" />
														<Label htmlFor="scam-no">ไม่เคย</Label>
													</div>
												</RadioGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* 🎯 Scam Types (Conditional) */}
								{hasScamExperience === "yes" && (
									<FormField
										control={form.control}
										name="scamTypes"
										render={() => (
											<FormItem>
												<div className="mb-4">
													<FormLabel className="text-base">
														ประเภทการหลอกลวงที่เคยพบ (เลือกได้หลายข้อ)
													</FormLabel>
												</div>
												{FORM_DATA.scamTypes.map((item) => (
													<FormField
														key={item.value}
														control={form.control}
														name="scamTypes"
														render={({ field }) => {
															return (
																<FormItem
																	key={item.value}
																	className="flex flex-row items-start space-x-3 space-y-0"
																>
																	<FormControl>
																		<Checkbox
																			name="scamTypes"
																			value={item.value}
																			checked={field.value?.includes(
																				item.value
																			)}
																			onCheckedChange={(checked) => {
																				return checked
																					? field.onChange([
																							...(field.value || []),
																							item.value,
																					  ])
																					: field.onChange(
																							field.value?.filter(
																								(value) => value !== item.value
																							)
																					  );
																			}}
																		/>
																	</FormControl>
																	<FormLabel className="font-normal">
																		{item.label}
																	</FormLabel>
																</FormItem>
															);
														}}
													/>
												))}
												<FormMessage />
											</FormItem>
										)}
									/>
								)}

								{/* 📱 Social Media Usage */}
								<FormField
									control={form.control}
									name="socialMediaUsage"
									render={({ field }) => (
										<FormItem>
											<FormLabel>ความถี่ในการใช้สื่อสังคมออนไลน์ *</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												name="socialMediaUsage"
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="เลือกความถี่การใช้งาน" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{FORM_DATA.socialMediaUsage.map((usage) => (
														<SelectItem key={usage.value} value={usage.value}>
															{usage.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* 🌐 Platforms */}
								<FormField
									control={form.control}
									name="platforms"
									render={() => (
										<FormItem>
											<div className="mb-4">
												<FormLabel className="text-base">
													แพลตฟอร์มที่ใช้ (เลือกได้หลายข้อ) *
												</FormLabel>
											</div>
											{FORM_DATA.platforms.map((item) => (
												<FormField
													key={item.value}
													control={form.control}
													name="platforms"
													render={({ field }) => {
														return (
															<FormItem
																key={item.value}
																className="flex flex-row items-start space-x-3 space-y-0"
															>
																<FormControl>
																	<Checkbox
																		name="platforms"
																		value={item.value}
																		checked={field.value?.includes(item.value)}
																		onCheckedChange={(checked) => {
																			return checked
																				? field.onChange([
																						...(field.value || []),
																						item.value,
																				  ])
																				: field.onChange(
																						field.value?.filter(
																							(value) => value !== item.value
																						)
																				  );
																		}}
																	/>
																</FormControl>
																<FormLabel className="font-normal">
																	{item.label}
																</FormLabel>
															</FormItem>
														);
													}}
												/>
											))}
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* 💬 Feedback */}
								<FormField
									control={form.control}
									name="feedback"
									render={({ field }) => (
										<FormItem>
											<FormLabel>ความคิดเห็นเพิ่มเติม</FormLabel>
											<FormControl>
												<Textarea
													placeholder="แบ่งปันความคิดเห็นหรือข้อเสนอแนะ..."
													className="resize-none"
													{...field}
													name="feedback"
												/>
											</FormControl>
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
