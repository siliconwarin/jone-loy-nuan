"use client";

import { PageContent } from "@/components/page-content";
import { ContentArea } from "@/components/content-area";
import { useQuiz } from "@/hooks/useQuiz";
import { useState } from "react";

// Components
import { QuestionSection } from "./_component/question-section";
import { AnswerPanel } from "./_component/answer-panel";
import { ResultCard } from "./_component/result-card";
import { QuizBackground } from "./_component/quiz-background";

export default function QuizPage() {
	const {
		currentQuestion,
		selectedAnswer,
		showResult,
		isCorrect,
		handleAnswerSelect,
		goToNextQuestion,
	} = useQuiz();

	// 🆕 Loading state for transitions
	const [isTransitioning, setIsTransitioning] = useState(false);

	// 🔄 Enhanced reset handler with loading
	const handleReset = () => {
		setIsTransitioning(true);
		goToNextQuestion();
		// Loading จะรีเซ็ตเมื่อโหลดคำถามใหม่เสร็จ
		setTimeout(() => setIsTransitioning(false), 1200);
	};

	// Loading state ถ้ายังไม่มี currentQuestion
	if (!currentQuestion) {
		return (
			<PageContent>
				<div className="w-full h-full flex items-center justify-center">
					<div className="text-center text-gray-500">กำลังโหลด...</div>
				</div>
			</PageContent>
		);
	}

	const isInteractive = currentQuestion.interactive || false;

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
								question={currentQuestion.question}
								showResult={showResult}
							/>
						</div>
					</div>

					{/* Content: Chat/Feed Scenario */}
					<div className="basis-[60%] sm:basis-[57%] md:basis-[55%] flex items-center justify-center py-2 sm:py-4">
						<ContentArea
							content={currentQuestion.content}
							showResult={showResult}
							variant="compact"
							onAnswer={handlePinAnswer}
						/>
					</div>

					{/* Footer: Answer Buttons */}
					<div className="basis-[25%] pb-4 sm:pb-6 md:pb-8">
						<AnswerPanel
							answers={currentQuestion.answers}
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
					result={currentQuestion.result}
					onReset={handleReset}
					isLoading={isTransitioning}
				/>
			</QuizBackground>
		</PageContent>
	);
}
