import { fetchQuestionById } from "@/lib/actions/questions";
import { QuizUpsertForm } from "../../quiz-form";

export default async function EditQuizPage({
	params,
}: {
	params: { id: string };
}) {
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
