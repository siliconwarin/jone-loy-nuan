"use client";

import { ContentArea } from "@/components/content-area";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Answer, QuizResult, QuestionWithAnswers } from "@/lib/types";
import { useQuizResultStore } from "@/store/quiz-store";
import { motion } from "framer-motion";

// Components
import { QuestionSection } from "./question-section";
import { AnswerPanel } from "./answer-panel";
import { ResultCard } from "./result-card";
import { QuizBackground } from "./quiz-background";

// เพิ่ม getDeviceType utility
function getDeviceType() {
	if (typeof window === "undefined") return "desktop";
	const width = window.innerWidth;
	if (width < 640) return "mobile";
	if (width < 1024) return "tablet";
	return "desktop";
}

export function QuizClient({
	initialQuestions,
}: {
	initialQuestions: QuestionWithAnswers[];
}) {
	const router = useRouter();

	// Zustand store hooks with error handling
	const startQuiz = useQuizResultStore((state) => state.startQuiz);
	const addResponse = useQuizResultStore((state) => state.addResponse);

	// --- New State Management ---
	const [questions] = useState(initialQuestions);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [showResult, setShowResult] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [isQuizReady, setIsQuizReady] = useState(false);

	// Start quiz session on component mount with error handling
	useEffect(() => {
		try {
			startQuiz(initialQuestions.length);

			// รอให้ transition จบก่อนแสดง quiz content
			const timer = setTimeout(() => {
				setIsQuizReady(true);
			}, 100);

			return () => clearTimeout(timer);
		} catch (error) {
			console.error("Error starting quiz:", error);
			// Fallback: set quiz ready even if store fails
			setIsQuizReady(true);
		}
	}, [startQuiz, initialQuestions.length]);

	const currentQuestion = useMemo(() => {
		return questions[currentIndex];
	}, [questions, currentIndex]);

	// ✨ NEW: Transform answers from DB to match frontend type
	const answers = useMemo((): Answer[] => {
		if (!currentQuestion?.answers || !Array.isArray(currentQuestion.answers)) {
			return [];
		}

		type DbAnswer = {
			id: string;
			answer_text: string;
			is_correct: boolean;
		};

		type RawAnswer = Answer | DbAnswer;

		const rawAnswers = currentQuestion.answers as RawAnswer[];

		return rawAnswers.map((ans) => {
			if ("text" in ans && "isCorrect" in ans) {
				return ans; // already Answer type
			}

			const dbAns = ans as DbAnswer;
			return {
				id: dbAns.id,
				text: dbAns.answer_text,
				isCorrect: dbAns.is_correct,
			} satisfies Answer;
		});
	}, [currentQuestion]);

	const isCorrect = useMemo(() => {
		if (!selectedAnswer) return null;
		const answer = answers.find((a) => a.id === selectedAnswer);
		return answer?.isCorrect || false;
	}, [answers, selectedAnswer]);

	const isLastQuestion = currentIndex === questions.length - 1;

	const handleAnswerSelect = (answerId: string) => {
		if (showResult) return;
		setSelectedAnswer(answerId);
		setShowResult(true);

		// Also, add the response to our global store
		const answer = answers.find((a) => a.id === answerId);
		addResponse({
			questionId: currentQuestion.id,
			isCorrect: answer?.isCorrect || false,
		});
	};

	const goToNextQuestion = async () => {
		setShowResult(false);
		setSelectedAnswer(null);

		if (!isLastQuestion) {
			setCurrentIndex((prevIndex) => prevIndex + 1);
		} else {
			// Complete quiz: save summary via API then navigate to survey
			try {
				const { sessionId, responses, totalQuestions } =
					useQuizResultStore.getState();
				const correctAnswers = responses.filter((r) => r.isCorrect).length;
				await fetch("/api/quiz-response", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						session_id: sessionId,
						total_questions: totalQuestions,
						correct_answers: correctAnswers,
						device_type: getDeviceType(),
						user_agent:
							typeof navigator !== "undefined" ? navigator.userAgent : "",
					}),
				});
			} catch (err) {
				console.error("Failed to save quiz summary:", err);
			}
			router.push("/survey");
		}
	};

	// เพิ่ม handler สำหรับ PinScenario (ข้อแรก)
	const handlePinScenarioAnswer = (isCorrect: boolean) => {
		if (showResult) return;
		setShowResult(true);
		// บันทึก response (ข้อแรกไม่มี answerId)
		addResponse({
			questionId: currentQuestion.id,
			isCorrect,
		});
	};

	// 🔄 Enhanced reset handler with loading
	const handleReset = () => {
		// ถ้าเป็นข้อสุดท้าย ให้ไป survey ทันทีเพื่อไม่โชว์ข้อซ้ำ
		if (isLastQuestion) {
			(async () => {
				try {
					const { sessionId, responses, totalQuestions } =
						useQuizResultStore.getState();
					const correctAnswers = responses.filter((r) => r.isCorrect).length;
					await fetch("/api/quiz-response", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							session_id: sessionId,
							total_questions: totalQuestions,
							correct_answers: correctAnswers,
							device_type: getDeviceType(),
							user_agent:
								typeof navigator !== "undefined" ? navigator.userAgent : "",
						}),
					});
				} catch (err) {
					console.error("Failed to save quiz summary:", err);
				}
				router.push("/survey");
			})();
			return;
		}

		// กรณีไม่ใช่ข้อสุดท้าย รอ transition แล้วไปข้อถัดไป
		setIsTransitioning(true);
		setTimeout(() => {
			goToNextQuestion();
			setIsTransitioning(false);
		}, 2000);
	};

	// Loading state ถ้ายังไม่มี currentQuestion หรือยังไม่พร้อม
	if (!currentQuestion || !isQuizReady) {
		return (
			<div className="h-[100dvh] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
				<div className="text-center">
					<div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
					<div className="text-gray-500">กำลังเตรียมคำถาม...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="relative h-[100dvh] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
			{/* Quiz Background */}
			<QuizBackground showResult={showResult}>
				<motion.div
					className="h-[100dvh] relative flex flex-col p-4 md:p-8"
					animate={{
						scale: showResult ? 0.95 : 1,
						opacity: showResult ? 0.7 : 1,
					}}
					transition={{ duration: 1.2, ease: "easeInOut" }}
				>
					{/* Content Area */}
					<div className="relative w-full h-full flex flex-col">
						{/* Question Section */}
						<div className="flex justify-end items-end basis-[15%] sm:basis-[18%] md:basis-[20%] pt-2 sm:pt-4 md:pt-5 pb-2 sm:pb-3 md:pb-4">
							<div className="w-full max-w-[95%] sm:max-w-md md:max-w-lg mx-auto">
								<QuestionSection
									question={currentQuestion?.question_text ?? ""}
									showResult={showResult}
								/>
							</div>
						</div>

						{/* Content Area */}
						<div className="basis-[60%] sm:basis-[57%] md:basis-[55%] flex items-center justify-center py-2 sm:py-4">
							<ContentArea
								questionData={currentQuestion}
								showResult={showResult}
								variant="fullscreen"
								// ส่ง onPinScenarioAnswer เฉพาะข้อแรก
								onPinScenarioAnswer={
									currentQuestion.order_index === 1
										? handlePinScenarioAnswer
										: undefined
								}
							/>
						</div>

						{/* Answer Panel */}
						<div className="basis-[25%] pb-4 sm:pb-6 md:pb-8">
							{/* ข้อแรกไม่ต้องแสดง AnswerPanel */}
							{currentQuestion.order_index !== 1 && (
								<div className="w-full max-w-[95%] sm:max-w-md md:max-w-lg mx-auto">
									<AnswerPanel
										answers={answers}
										selectedAnswer={selectedAnswer}
										showResult={showResult}
										onAnswerSelect={handleAnswerSelect}
									/>
								</div>
							)}
						</div>
					</div>
				</motion.div>
			</QuizBackground>

			{/* Result Card - ตอนนี้จะติดขอบล่าง */}
			<ResultCard
				showResult={showResult}
				isCorrect={isCorrect}
				result={currentQuestion.result as unknown as QuizResult}
				onReset={handleReset}
				isLoading={isTransitioning}
				isLastQuestion={isLastQuestion}
			/>
		</div>
	);
}
