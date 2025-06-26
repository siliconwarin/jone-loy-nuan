"use client";

import { useEffect } from "react";
import { PageContent } from "@/components/page-content";
import { ContentArea } from "@/components/content-area";
import { useQuizStore } from "@/store/quiz-store";
import { getCurrentQuestion } from "@/lib/quiz-data";

// Components
import { QuestionSection } from "./_component/question-section";
import { AnswerButtons } from "./_component/answer-buttons";
import { ResultCard } from "./_component/result-card";
import { QuizBackground } from "./_component/quiz-background";

export default function QuizPage() {
	const {
		currentQuestion,
		selectedAnswer,
		showResult,
		isCorrect,
		setCurrentQuestion,
		selectAnswer,
		resetQuiz,
	} = useQuizStore();

	// Initialize quiz with first question
	useEffect(() => {
		const question = getCurrentQuestion();
		setCurrentQuestion(question);
	}, [setCurrentQuestion]);

	if (!currentQuestion) {
		return (
			<PageContent>
				<div className="h-screen flex items-center justify-center">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
						<p className="mt-2 text-gray-600">กำลังโหลด...</p>
					</div>
				</div>
			</PageContent>
		);
	}

	return (
		<PageContent>
			<QuizBackground showResult={showResult}>
				<div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6">
					<div className="w-full max-w-md mx-auto flex flex-col items-center space-y-6">
						{/* Question Section */}
						<QuestionSection
							question={currentQuestion.question}
							showResult={showResult}
						/>

						{/* Content Area */}
						<div className="w-full flex justify-center">
							<ContentArea
								content={currentQuestion.content}
								showResult={showResult}
								variant="compact"
							/>
						</div>

						{/* Answer Buttons */}
						<AnswerButtons
							answers={currentQuestion.answers}
							showResult={showResult}
							selectedAnswer={selectedAnswer}
							onAnswerSelect={selectAnswer}
						/>
					</div>
				</div>

				{/* Result Card */}
				<ResultCard
					showResult={showResult}
					isCorrect={isCorrect}
					result={currentQuestion.result}
					onReset={resetQuiz}
				/>
			</QuizBackground>
		</PageContent>
	);
}
