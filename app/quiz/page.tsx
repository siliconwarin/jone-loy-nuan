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
		resetQuiz,
	} = useQuiz();

	// Initialize quiz with first question
	useEffect(() => {
		initializeQuiz();
	}, [initializeQuiz]);

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
				<div className="relative w-full h-full flex flex-col items-center justify-start pt-20 sm:pt-28 p-4">
					{/* Container สำหรับคำถามและเนื้อหา */}
					<div className="w-full max-w-md mx-auto flex flex-col items-center space-y-6">
						{/* Question Section */}
						<QuestionSection
							question={currentQuestion.question}
							showResult={showResult}
						/>

						{/* Content Area */}
						<ContentArea
							content={currentQuestion.content}
							showResult={showResult}
							variant="compact"
						/>
					</div>

					{/* ใช้ absolute positioning สำหรับปุ่มคำตอบ */}
					<div className="absolute bottom-[10dvh] left-1/2 -translate-x-1/2 w-full px-4">
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
					onReset={resetQuiz}
				/>
			</QuizBackground>
		</PageContent>
	);
}
