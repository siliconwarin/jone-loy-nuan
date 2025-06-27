"use client";

import { PageContent } from "@/components/page-content";
import { ContentArea } from "@/components/content-area";
import { useQuiz } from "@/hooks/useQuiz";

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

	return (
		<PageContent>
			<QuizBackground showResult={showResult}>
				<div className="w-full h-full flex flex-col p-2 sm:p-4 md:p-6">
					{/* Header: Question Section */}
					<div className="flex-none pt-4 sm:pt-6 md:pt-8 pb-2 sm:pb-3 md:pb-4">
						<div className="w-full max-w-[340px] sm:max-w-md md:max-w-lg mx-auto">
							<QuestionSection
								question={currentQuestion.question}
								showResult={showResult}
							/>
						</div>
					</div>

					{/* Content: Chat/Feed Scenario */}
					<div className="flex-1 flex items-center justify-center py-2 sm:py-4">
						<ContentArea
							content={currentQuestion.content}
							showResult={showResult}
							variant="compact"
						/>
					</div>

					{/* Footer: Answer Buttons */}
					<div className="flex-none pb-4 sm:pb-6 md:pb-8">
						<AnswerPanel
							answers={currentQuestion.answers}
							selectedAnswer={selectedAnswer}
							showResult={showResult}
							isCorrect={isCorrect}
							onAnswerSelect={handleAnswerSelect}
							hideAnswers={isInteractive}
						/>
					</div>
				</div>

				{/* Result Card (เป็น fixed อยู่แล้ว) */}
				<ResultCard
					showResult={showResult}
					isCorrect={isCorrect}
					result={currentQuestion.result}
					onReset={goToNextQuestion}
				/>
			</QuizBackground>
		</PageContent>
	);
}
