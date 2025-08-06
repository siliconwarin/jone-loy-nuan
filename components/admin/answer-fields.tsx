"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2, Plus, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Answer {
	id: string;
	text: string;
	isCorrect: boolean;
}

interface AnswerFieldsProps {
	initialAnswers?: Answer[];
	onChange: (answers: Answer[]) => void;
}

export function AnswerFields({ initialAnswers = [], onChange }: AnswerFieldsProps) {
	const [answers, setAnswers] = useState<Answer[]>(() => {
		if (initialAnswers.length === 0) {
			// Start with 2 empty answers
			return [
				{ id: crypto.randomUUID(), text: "", isCorrect: false },
				{ id: crypto.randomUUID(), text: "", isCorrect: false },
			];
		}
		return initialAnswers;
	});

	const [correctAnswerId, setCorrectAnswerId] = useState<string>(() => {
		const correct = answers.find(a => a.isCorrect);
		return correct?.id || "";
	});

	const updateAnswers = (newAnswers: Answer[]) => {
		setAnswers(newAnswers);
		onChange(newAnswers);
	};

	const handleTextChange = (id: string, text: string) => {
		const newAnswers = answers.map(answer =>
			answer.id === id ? { ...answer, text } : answer
		);
		updateAnswers(newAnswers);
	};

	const handleCorrectChange = (answerId: string) => {
		setCorrectAnswerId(answerId);
		const newAnswers = answers.map(answer => ({
			...answer,
			isCorrect: answer.id === answerId
		}));
		updateAnswers(newAnswers);
	};

	const addAnswer = () => {
		if (answers.length >= 6) return; // Max 6 answers
		const newAnswer = { id: crypto.randomUUID(), text: "", isCorrect: false };
		updateAnswers([...answers, newAnswer]);
	};

	const removeAnswer = (id: string) => {
		if (answers.length <= 2) return; // Min 2 answers
		const newAnswers = answers.filter(answer => answer.id !== id);
		
		// If we removed the correct answer, reset selection
		if (id === correctAnswerId) {
			setCorrectAnswerId("");
			updateAnswers(newAnswers.map(a => ({ ...a, isCorrect: false })));
		} else {
			updateAnswers(newAnswers);
		}
	};

	const correctAnswersCount = answers.filter(a => a.isCorrect).length;
	const hasValidAnswers = answers.length >= 2 && correctAnswersCount === 1 && 
		answers.every(a => a.text.trim().length > 0);

	return (
		<Card>
			<CardHeader className="space-y-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg">จัดการคำตอบ</CardTitle>
					<div className="flex items-center gap-2">
						{hasValidAnswers ? (
							<Badge variant="default" className="bg-green-100 text-green-800">
								<CheckCircle className="w-3 h-3 mr-1" />
								พร้อมใช้งาน
							</Badge>
						) : (
							<Badge variant="destructive">ไม่สมบูรณ์</Badge>
						)}
					</div>
				</div>
				<p className="text-sm text-muted-foreground">
					เพิ่มคำตอบ 2-6 ข้อ และเลือกคำตอบที่ถูกต้อง 1 ข้อ
				</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-3">
					<Label className="text-sm font-medium">เลือกคำตอบที่ถูกต้อง:</Label>
					<RadioGroup value={correctAnswerId} onValueChange={handleCorrectChange}>
						{answers.map((answer, index) => (
							<div key={answer.id} className="space-y-2">
								<div className="flex items-start space-x-3 p-3 rounded-lg border bg-card">
									<RadioGroupItem 
										value={answer.id} 
										id={answer.id}
										className="mt-2"
									/>
									<div className="flex-1 space-y-2">
										<Label 
											htmlFor={answer.id} 
											className="text-sm font-medium flex items-center gap-2"
										>
											ตัวเลือกที่ {index + 1}
											{answer.isCorrect && (
												<Badge variant="default" className="text-xs">
													<CheckCircle className="w-3 h-3 mr-1" />
													ถูกต้อง
												</Badge>
											)}
										</Label>
										<Input
											value={answer.text}
											onChange={(e) => handleTextChange(answer.id, e.target.value)}
											placeholder={`คำตอบที่ ${index + 1}`}
											className="w-full"
										/>
									</div>
									{answers.length > 2 && (
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => removeAnswer(answer.id)}
											className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-1"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									)}
								</div>
							</div>
						))}
					</RadioGroup>
				</div>

				{answers.length < 6 && (
					<Button
						type="button"
						variant="outline"
						onClick={addAnswer}
						className="w-full"
					>
						<Plus className="h-4 w-4 mr-2" />
						เพิ่มตัวเลือก ({answers.length}/6)
					</Button>
				)}

				{/* Validation Messages */}
				<div className="text-sm space-y-1">
					{answers.length < 2 && (
						<p className="text-red-600">❌ ต้องมีคำตอบอย่างน้อย 2 ข้อ</p>
					)}
					{correctAnswersCount === 0 && (
						<p className="text-red-600">❌ กรุณาเลือกคำตอบที่ถูกต้อง</p>
					)}
					{correctAnswersCount > 1 && (
						<p className="text-red-600">❌ เลือกคำตอบที่ถูกต้องได้เพียง 1 ข้อ</p>
					)}
					{answers.some(a => a.text.trim().length === 0) && (
						<p className="text-red-600">❌ กรุณากรอกข้อความในทุกตัวเลือก</p>
					)}
					{hasValidAnswers && (
						<p className="text-green-600">✅ คำตอบสมบูรณ์แล้ว</p>
					)}
				</div>

				{/* Hidden input for form submission */}
				<input
					type="hidden"
					name="answers"
					value={JSON.stringify(answers)}
				/>
			</CardContent>
		</Card>
	);
}