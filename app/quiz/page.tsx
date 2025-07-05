import { QuizClient } from "./_component/quiz-client";
import { fetchQuizQuestions } from "@/lib/actions/questions";
import { QuestionWithAnswers } from "@/lib/types";

// The data from `fetchQuizQuestions` already includes answers and should
// include image URLs if the underlying `get_questions_with_answers` is correct.
// We can simplify the type here, or use the one from lib/types.
export type QuestionForQuiz = QuestionWithAnswers;

export default async function QuizPage() {
	const questions = await fetchQuizQuestions();

	if (!questions || questions.length === 0) {
		return <div>Failed to load quiz questions.</div>;
	}

	// We cast here to ensure the props match, but fetchQuizQuestions should
	// already return the correct shape.
	return <QuizClient initialQuestions={questions as QuestionForQuiz[]} />;
}
