import { QuizClient } from "./_component/quiz-client";
import { fetchQuizQuestions } from "@/lib/actions/questions";

export default async function QuizPage() {
	const questions = await fetchQuizQuestions();

	if (!questions || questions.length === 0) {
		return <div>Failed to load quiz questions.</div>;
	}

	return <QuizClient initialQuestions={questions} />;
}
