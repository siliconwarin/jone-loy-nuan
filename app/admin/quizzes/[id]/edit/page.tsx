import { fetchQuestionById } from "@/lib/actions/questions";
import { QuizUpsertForm } from "../../quiz-form";

// ✨ Best Practice: Define a specific props interface for the page.
interface EditQuizPageProps {
	params: {
		id: string;
	};
}

export default async function EditQuizPage({ params }: EditQuizPageProps) {
	const { id } = params;
	const question = await fetchQuestionById(id);

	if (!question) {
		return <p>Question not found.</p>;
	}

	return (
		<div>
			<QuizUpsertForm initialData={question} />
		</div>
	);
}
