import { QuizClient } from "./_component/quiz-client";
import { fetchQuizQuestions } from "@/lib/actions/questions";

export default async function QuizPage() {
	let questions = await fetchQuizQuestions();
	// จำกัดให้เหลือ 10 ข้อตาม business rule
	if (questions.length > 10) {
		questions = questions.slice(0, 10);
	}

	if (!questions || questions.length === 0) {
		return <div>Failed to load quiz questions.</div>;
	}

	return <QuizClient initialQuestions={questions} />;
}
