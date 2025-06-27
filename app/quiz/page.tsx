"use client";

import { useEffect } from "react";
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
		initializeQuiz,
		handleAnswerSelect,
		goToNextQuestion,
	} = useQuiz();

	// Initialize quiz with first question - React 19: Run once on mount
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		initializeQuiz();
	}, []);

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
				<div className="relative w-full h-full flex flex-col items-center justify-start pt-16 sm:pt-20 md:pt-28 p-3 sm:p-4 md:p-6">
					{/* Container สำหรับคำถามและเนื้อหา */}
					<div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto flex flex-col items-center space-y-4 sm:space-y-6">
						{/* Question Section */}
						<QuestionSection
							question={currentQuestion.question}
							showResult={showResult}
						/>
					</div>

					{/* Content Area */}
					<ContentArea
						content={currentQuestion.content}
						showResult={showResult}
						variant="compact"
					/>

					{/* ใช้ absolute positioning สำหรับปุ่มคำตอบ */}
					<div className="absolute bottom-[8dvh] sm:bottom-[10dvh] md:bottom-[12dvh] left-1/2 -translate-x-1/2 w-full px-3 sm:px-4 md:px-6">
						<AnswerPanel
							answers={currentQuestion.answers}
							showResult={showResult}
							selectedAnswer={selectedAnswer}
							isCorrect={isCorrect}
							onAnswerSelect={handleAnswerSelect}
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
