"use client";

import { PageContent } from "@/components/page-content";
import { ContentArea } from "@/components/content-area";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Answer, QuizResult, QuestionWithAnswers } from "@/lib/types";
import { useQuizResultStore } from "@/store/quiz-store";

// Components
import { QuestionSection } from "./question-section";
import { AnswerPanel } from "./answer-panel";
import { ResultCard } from "./result-card";
import { QuizBackground } from "./quiz-background";

export function QuizClient({
	initialQuestions,
}: {
	initialQuestions: QuestionWithAnswers[];
}) {
	const router = useRouter();
	const { startQuiz, addResponse, getSummary, resetQuiz } =
		useQuizResultStore();

	// --- New State Management ---
	const [questions] = useState(initialQuestions);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [showResult, setShowResult] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);

	// Start quiz session on component mount
	useEffect(() => {
		startQuiz(initialQuestions.length);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const currentQuestion = useMemo(() => {
		return questions[currentIndex];
	}, [questions, currentIndex]);

	// ✨ NEW: Transform answers from DB to match frontend type
	const answers = useMemo((): Answer[] => {
		if (!currentQuestion?.answers || !Array.isArray(currentQuestion.answers)) {
			return [];
		}
		// DB returns `answer_text` and `is_correct`, frontend expects `text` and `isCorrect`.
		return (currentQuestion.answers as any[]).map((dbAnswer) => ({
			id: dbAnswer.id,
			text: dbAnswer.answer_text,
			isCorrect: dbAnswer.is_correct,
		}));
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

	const goToNextQuestion = () => {
		setShowResult(false);
		setSelectedAnswer(null);

		if (!isLastQuestion) {
			setCurrentIndex((prevIndex) => prevIndex + 1);
		} else {
			// Navigate to the result page on quiz completion
			router.push("/result");
		}
	};
	// --------------------------

	// 🔄 Enhanced reset handler with loading
	const handleReset = () => {
		setIsTransitioning(true);
		setTimeout(() => {
			goToNextQuestion();
			setIsTransitioning(false);
		}, 1200); // Wait for result card animation
	};

	// Loading state ถ้ายังไม่มี currentQuestion
	if (!currentQuestion) {
		return (
			<PageContent>
				<div className="w-full h-full flex items-center justify-center">
					<div className="text-center text-gray-500">ไม่มีคำถามในระบบ...</div>
				</div>
			</PageContent>
		);
	}

	return (
		<PageContent>
			<QuizBackground showResult={showResult}>
				<div className="w-full h-full flex flex-col p-2 sm:p-4 md:p-6">
					{/* Header: Question Section */}
					<div className="flex justify-end items-end basis-[15%] sm:basis-[18%] md:basis-[20%] pt-2 sm:pt-4 md:pt-5 pb-2 sm:pb-3 md:pb-4">
						<div className="w-full max-w-[340px] sm:max-w-md md:max-w-lg mx-auto">
							<QuestionSection
								question={currentQuestion.question_text || ""}
								showResult={showResult}
							/>
						</div>
					</div>

					{/* Content: Chat/Feed Scenario */}
					<div className="basis-[60%] sm:basis-[57%] md:basis-[55%] flex items-center justify-center py-2 sm:py-4">
						<ContentArea
							questionData={currentQuestion}
							showResult={showResult}
							variant="fullscreen"
						/>
					</div>

					{/* Footer: Answer Buttons */}
					<div className="basis-[25%] pb-4 sm:pb-6 md:pb-8">
						<AnswerPanel
							answers={answers}
							selectedAnswer={selectedAnswer}
							showResult={showResult}
							onAnswerSelect={handleAnswerSelect}
						/>
					</div>
				</div>

				{/* Result Card with Loading */}
				<ResultCard
					showResult={showResult}
					isCorrect={isCorrect}
					result={currentQuestion.result as unknown as QuizResult}
					onReset={handleReset}
					isLoading={isTransitioning}
				/>
			</QuizBackground>
		</PageContent>
	);
}
