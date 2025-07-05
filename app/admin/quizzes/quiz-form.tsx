"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Database } from "@/lib/database.types";

type Question = Database["public"]["Tables"]["questions"]["Row"];

interface QuizFormProps {
	open: boolean;
	initialData: Partial<Question> | null;
	onClose: () => void;
	onSubmit: (data: Partial<Question>) => void;
}

export function QuizForm({
	open,
	initialData,
	onClose,
	onSubmit,
}: QuizFormProps) {
	const [formData, setFormData] = React.useState<Partial<Question>>({});

	React.useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		} else {
			setFormData({});
		}
	}, [initialData]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value === "" ? null : Number(value),
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>
							{initialData?.id ? "Edit Question" : "Create Question"}
						</DialogTitle>
						<DialogDescription>
							{initialData?.id
								? "Make changes to the question here."
								: "Add a new question to the quiz."}{" "}
							Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="question_text" className="text-right">
								Question
							</Label>
							<Textarea
								id="question_text"
								name="question_text"
								value={formData.question_text ?? ""}
								onChange={handleChange}
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="category" className="text-right">
								Category
							</Label>
							<Input
								id="category"
								name="category"
								value={formData.category ?? ""}
								onChange={handleChange}
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
								value={formData.order_index ?? ""}
								onChange={handleOrderChange}
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
