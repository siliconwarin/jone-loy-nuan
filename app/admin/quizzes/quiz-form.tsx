"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertQuestion } from "@/lib/actions/questions";
import { QuestionWithAnswers } from "@/lib/types";
import { AnswerFields } from "@/components/admin/answer-fields";

interface QuizUpsertFormProps {
	initialData?: Partial<QuestionWithAnswers> | null;
}

export function QuizUpsertForm({ initialData }: QuizUpsertFormProps) {
	const router = useRouter();
	const [state, formAction] = useActionState(upsertQuestion, null);
	const [answers, setAnswers] = useState<any[]>([]);

	// Parse initial answers from the initialData and convert to proper format
	const initialAnswers = initialData?.answers ? 
		(Array.isArray(initialData.answers) ? initialData.answers.map((answer: any) => ({
			id: answer.id || crypto.randomUUID(),
			text: answer.text || answer.answer_text || "",
			isCorrect: answer.isCorrect || false
		})) : []) : [];

	useEffect(() => {
		if (state?.error) {
			toast.error(state.error);
		}
		if (state && !state.error) {
			toast.success("คำถามบันทึกเรียบร้อยแล้ว!");
		}
	}, [state]);

	return (
		<div className="space-y-6">
			<form action={formAction} className="space-y-6">
				{/* Question Details Card */}
				<Card>
					<CardHeader>
						<CardTitle>
							{initialData?.id ? "แก้ไขคำถาม" : "สร้างคำถามใหม่"}
						</CardTitle>
						<CardDescription>
							{initialData?.id
								? "แก้ไขข้อมูลคำถามและคำตอบ"
								: "เพิ่มคำถามและคำตอบใหม่ลงในระบบ"}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{initialData?.id && (
							<input type="hidden" name="id" value={initialData.id} />
						)}

						{/* Question Text */}
						<div className="space-y-2">
							<Label htmlFor="question_text">
								คำถาม <span className="text-red-500">*</span>
							</Label>
							<Textarea
								id="question_text"
								name="question_text"
								defaultValue={initialData?.question_text ?? ""}
								placeholder="กรอกคำถามสำหรับ Quiz..."
								rows={3}
								required
							/>
						</div>

						{/* Category */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="category">หมวดหมู่</Label>
								<Input
									id="category"
									name="category"
									defaultValue={initialData?.category ?? ""}
									placeholder="เช่น การหลอกลวงออนไลน์"
								/>
							</div>

							{/* Order Index */}
							<div className="space-y-2">
								<Label htmlFor="order_index">
									ลำดับคำถาม <span className="text-red-500">*</span>
								</Label>
								<Input
									id="order_index"
									name="order_index"
									type="number"
									min="1"
									defaultValue={initialData?.order_index ?? ""}
									placeholder="1"
									required
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Answers Management */}
				<AnswerFields 
					initialAnswers={initialAnswers}
					onChange={setAnswers}
				/>

				{/* Action Buttons */}
				<Card>
					<CardContent className="pt-6">
						<div className="flex justify-end gap-3">
							<Button 
								type="button" 
								variant="outline" 
								onClick={() => router.back()}
							>
								ยกเลิก
							</Button>
							<Button type="submit">
								{initialData?.id ? "บันทึกการเปลี่ยนแปลง" : "สร้างคำถาม"}
							</Button>
						</div>
					</CardContent>
				</Card>
			</form>
		</div>
	);
}
