"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2, Plus, CheckCircle, AlertCircle } from "lucide-react";
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

export function AnswerFields({
	initialAnswers = [],
	onChange,
}: AnswerFieldsProps) {
	// แปลง format ของ initialAnswers ให้ถูกต้อง
	const formatAnswers = (answers: any[]): Answer[] => {
		if (!Array.isArray(answers)) return [];

		return answers.map((answer, index) => {
			// รองรับทั้ง format เก่าและใหม่
			const answerText = answer.text || answer.answer_text || "";
			const isCorrect = answer.isCorrect ?? answer.is_correct ?? false;

			return {
				id: answer.id || `answer-${index}-${Date.now()}`,
				text: answerText,
				isCorrect: Boolean(isCorrect),
			};
		});
	};

	const [answers, setAnswers] = useState<Answer[]>(() => {
		const formatted = formatAnswers(initialAnswers);

		// ถ้าไม่มีคำตอบเลย สร้างขึ้นมา 2 ข้อ
		if (formatted.length === 0) {
			return [
				{ id: crypto.randomUUID(), text: "", isCorrect: false },
				{ id: crypto.randomUUID(), text: "", isCorrect: false },
			];
		}

		// จำกัดไม่เกิน 4 ข้อ
		return formatted.slice(0, 4);
	});

	const [correctAnswerId, setCorrectAnswerId] = useState<string>(() => {
		const formatted = formatAnswers(initialAnswers);
		const correct = formatted.find((a) => a.isCorrect);
		return correct?.id || "";
	});

	// Sync เมื่อ initialAnswers เปลี่ยน
	useEffect(() => {
		console.log("AnswerFields: initialAnswers changed", initialAnswers);
		const formatted = formatAnswers(initialAnswers);
		console.log("AnswerFields: formatted answers", formatted);
		if (formatted.length > 0) {
			const limitedAnswers = formatted.slice(0, 4);
			setAnswers(limitedAnswers);
			const correct = limitedAnswers.find((a) => a.isCorrect);
			console.log("AnswerFields: correct answer", correct);
			setCorrectAnswerId(correct?.id || "");
		}
	}, [initialAnswers]);

	const updateAnswers = (newAnswers: Answer[]) => {
		console.log("AnswerFields: updateAnswers called with", newAnswers);
		setAnswers(newAnswers);
		onChange(newAnswers);
	};

	const handleTextChange = (id: string, text: string) => {
		console.log("AnswerFields: handleTextChange called", { id, text });
		const newAnswers = answers.map((answer) =>
			answer.id === id ? { ...answer, text } : answer
		);
		updateAnswers(newAnswers);
	};

	const handleCorrectChange = (answerId: string) => {
		console.log("AnswerFields: handleCorrectChange called with", answerId);
		setCorrectAnswerId(answerId);
		const newAnswers = answers.map((answer) => ({
			...answer,
			isCorrect: answer.id === answerId,
		}));
		console.log("AnswerFields: newAnswers after correct change", newAnswers);
		updateAnswers(newAnswers);
	};

	const addAnswer = () => {
		if (answers.length >= 4) return; // จำกัดสูงสุด 4 ข้อ
		const newAnswer = { id: crypto.randomUUID(), text: "", isCorrect: false };
		updateAnswers([...answers, newAnswer]);
	};

	const removeAnswer = (id: string) => {
		if (answers.length <= 2) return; // ต้องมีอย่างน้อย 2 ข้อ
		const newAnswers = answers.filter((answer) => answer.id !== id);

		// ถ้าลบคำตอบที่ถูก ให้ reset
		if (id === correctAnswerId) {
			setCorrectAnswerId("");
			updateAnswers(newAnswers.map((a) => ({ ...a, isCorrect: false })));
		} else {
			updateAnswers(newAnswers);
		}
	};

	const correctAnswersCount = answers.filter((a) => a.isCorrect).length;
	const hasValidAnswers =
		answers.length >= 2 &&
		correctAnswersCount === 1 &&
		answers.every((a) => a.text.trim().length > 0);

	console.log("AnswerFields render:", { answers, correctAnswerId, initialAnswers });

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
							<Badge variant="destructive">
								<AlertCircle className="w-3 h-3 mr-1" />
								ไม่สมบูรณ์
							</Badge>
						)}
						<Badge variant="outline">{answers.length}/4 ตัวเลือก</Badge>
					</div>
				</div>
				<p className="text-sm text-muted-foreground">
					เพิ่มคำตอบ 2-4 ข้อ และเลือกคำตอบที่ถูกต้อง 1 ข้อ
				</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-3">
					<Label className="text-sm font-medium">
						เลือกคำตอบที่ถูกต้อง: <span className="text-red-500">*</span>
					</Label>
					<RadioGroup
						value={correctAnswerId || ""}
						onValueChange={handleCorrectChange}
						className="space-y-2"
					>
						{answers.map((answer, index) => (
							<div key={`answer-${index}-${answer.id}`} className="space-y-2">
								<div className="flex items-start space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
									<RadioGroupItem
										value={answer.id}
										id={answer.id}
										className="mt-2"
									/>
									<div className="flex-1 space-y-2">
										<Label
											htmlFor={answer.id}
											className="text-sm font-medium flex items-center gap-2 cursor-pointer"
										>
											ตัวเลือกที่ {index + 1}
											{answer.isCorrect && (
												<Badge
													variant="default"
													className="text-xs bg-green-600"
												>
													<CheckCircle className="w-3 h-3 mr-1" />
													คำตอบที่ถูก
												</Badge>
											)}
										</Label>
										<Input
											value={answer.text}
											onChange={(e) =>
												handleTextChange(answer.id, e.target.value)
											}
											placeholder={`กรอกคำตอบที่ ${index + 1}...`}
											className="w-full"
											required
										/>
									</div>
									{answers.length > 2 && (
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => removeAnswer(answer.id)}
											className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-1"
											title="ลบตัวเลือกนี้"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									)}
								</div>
							</div>
						))}
					</RadioGroup>
				</div>

				{answers.length < 4 && (
					<Button
						type="button"
						variant="outline"
						onClick={addAnswer}
						className="w-full"
					>
						<Plus className="h-4 w-4 mr-2" />
						เพิ่มตัวเลือก (เหลืออีก {4 - answers.length} ข้อ)
					</Button>
				)}

				{/* Validation Messages */}
				<div className="bg-gray-50 rounded-lg p-3 space-y-1">
					<div className="text-sm font-medium mb-2">สถานะ:</div>
					{answers.length < 2 && (
						<p className="text-sm text-red-600 flex items-center gap-1">
							<AlertCircle className="w-3 h-3" />
							ต้องมีคำตอบอย่างน้อย 2 ข้อ
						</p>
					)}
					{correctAnswersCount === 0 && (
						<p className="text-sm text-red-600 flex items-center gap-1">
							<AlertCircle className="w-3 h-3" />
							กรุณาเลือกคำตอบที่ถูกต้อง
						</p>
					)}
					{correctAnswersCount > 1 && (
						<p className="text-sm text-red-600 flex items-center gap-1">
							<AlertCircle className="w-3 h-3" />
							เลือกคำตอบที่ถูกต้องได้เพียง 1 ข้อ
						</p>
					)}
					{answers.some((a) => a.text.trim().length === 0) && (
						<p className="text-sm text-red-600 flex items-center gap-1">
							<AlertCircle className="w-3 h-3" />
							กรุณากรอกข้อความในทุกตัวเลือก
						</p>
					)}
					{hasValidAnswers && (
						<p className="text-sm text-green-600 flex items-center gap-1">
							<CheckCircle className="w-3 h-3" />
							คำตอบสมบูรณ์แล้ว
						</p>
					)}
				</div>

				{/* Hidden input for form submission */}
				<input type="hidden" name="answers" value={JSON.stringify(answers)} />
			</CardContent>
		</Card>
	);
}
