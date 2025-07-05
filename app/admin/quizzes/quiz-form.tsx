"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertQuestion } from "@/lib/actions/questions";
import { QuestionWithAnswers } from "@/lib/types";

interface QuizUpsertFormProps {
	initialData?: Partial<QuestionWithAnswers> | null;
}

export function QuizUpsertForm({ initialData }: QuizUpsertFormProps) {
	const router = useRouter();
	const [state, formAction] = useActionState(upsertQuestion, null);

	useEffect(() => {
		if (state?.error) {
			toast.error(state.error);
		}
	}, [state]);

	return (
		<form action={formAction}>
			<Card>
				<CardHeader>
					<CardTitle>
						{initialData?.id ? "Edit Question" : "Create New Question"}
					</CardTitle>
					<CardDescription>
						{initialData?.id
							? "Make changes to the question here."
							: "Add a new question to the quiz."}{" "}
						Click save when you&apos;re done.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 py-4">
					{initialData?.id && (
						<input type="hidden" name="id" value={initialData.id} />
					)}

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="question_text" className="text-right">
							Question
						</Label>
						<Textarea
							id="question_text"
							name="question_text"
							defaultValue={initialData?.question_text ?? ""}
							className="col-span-3"
							required
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right">
							Category
						</Label>
						<Input
							id="category"
							name="category"
							defaultValue={initialData?.category ?? ""}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="order_index" className="text-right">
							Order
						</Label>
						<Input
							id="order_index"
							name="order_index"
							type="number"
							defaultValue={initialData?.order_index ?? ""}
							className="col-span-3"
							required
						/>
					</div>
				</CardContent>
				<CardFooter className="justify-end gap-2">
					<Button type="button" variant="outline" onClick={() => router.back()}>
						Cancel
					</Button>
					<Button type="submit">Save changes</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
