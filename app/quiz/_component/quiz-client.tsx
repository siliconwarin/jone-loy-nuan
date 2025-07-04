"use client";

import { PageContent } from "@/components/page-content";
import { ContentArea } from "@/components/content-area";
import { useState, useMemo } from "react";
import type { Database } from "@/lib/database.types";
import type { Answer } from "@/lib/types";
import type { QuestionWithImages } from "../page";

// Components
import { QuestionSection } from "./question-section";
import { AnswerPanel } from "./answer-panel";
import { ResultCard } from "./result-card";
import { QuizBackground } from "./quiz-background";

type Question = Database["public"]["Tables"]["questions"]["Row"];

interface QuizClientProps {
	initialQuestions: QuestionWithImages[];
}

export function QuizClient({ initialQuestions }: QuizClientProps) {
	// --- New State Management ---
	const [questions, setQuestions] = useState(initialQuestions);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [showResult, setShowResult] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const currentQuestion = useMemo(() => {
		return questions[currentIndex];
	}, [questions, currentIndex]);

	const isCorrect = useMemo(() => {
		if (!currentQuestion || !selectedAnswer) return null;
		const answers = currentQuestion.answers as unknown as Answer[];
		const answer = answers.find((a) => a.id === selectedAnswer);
		return answer?.isCorrect || false;
	}, [currentQuestion, selectedAnswer]);

	const isLastQuestion = currentIndex === questions.length - 1;

	const handleAnswerSelect = (answerId: string) => {
		if (showResult) return;
		setSelectedAnswer(answerId);
		setShowResult(true);
	};

	const goToNextQuestion = () => {
		setShowResult(false);
		setSelectedAnswer(null);

		if (!isLastQuestion) {
			setCurrentIndex((prevIndex) => prevIndex + 1);
		} else {
			// TODO: Handle quiz completion (e.g., navigate to a summary page)
			console.log("Quiz finished!");
			setCurrentIndex(0); // For now, loop back to the start
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

	const isInteractive = (currentQuestion as any).interactive || false; // Cast to any to avoid TS error for now

	// Handle PIN scenario answer (convert boolean to answerId)
	const handlePinAnswer = (isCorrect: boolean) => {
		const answerId = isCorrect ? "cancel" : "confirm";
		handleAnswerSelect(answerId);
	};

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
							onAnswer={handlePinAnswer}
						/>
					</div>

					{/* Footer: Answer Buttons */}
					<div className="basis-[25%] pb-4 sm:pb-6 md:pb-8">
						<AnswerPanel
							answers={currentQuestion.answers as unknown as Answer[]}
							selectedAnswer={selectedAnswer}
							showResult={showResult}
							isCorrect={isCorrect}
							onAnswerSelect={handleAnswerSelect}
							hideAnswers={isInteractive}
							layout="auto"
						/>
					</div>
				</div>

				{/* Result Card with Loading */}
				<ResultCard
					showResult={showResult}
					isCorrect={isCorrect}
					result={currentQuestion.result as any} // Cast to any to avoid TS error for now
					onReset={handleReset}
					isLoading={isTransitioning}
				/>
			</QuizBackground>
		</PageContent>
	);
}
