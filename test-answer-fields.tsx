"use client";

import { useState } from "react";
import { AnswerFields } from "@/components/admin/answer-fields";

const testAnswers = [
	{ id: "1", text: "ตัวเลือก 1", isCorrect: false },
	{ id: "2", text: "ตัวเลือก 2", isCorrect: true },
	{ id: "3", text: "ตัวเลือก 3", isCorrect: false },
];

export default function TestAnswerFields() {
	const [answers, setAnswers] = useState(testAnswers);

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">ทดสอบ AnswerFields Component</h1>
			
			<div className="space-y-6">
				<div>
					<h2 className="text-lg font-semibold mb-4">Component:</h2>
					<AnswerFields 
						initialAnswers={testAnswers}
						onChange={(newAnswers) => {
							console.log("Parent received:", newAnswers);
							setAnswers(newAnswers);
						}}
					/>
				</div>
				
				<div>
					<h2 className="text-lg font-semibold mb-4">Current State:</h2>
					<pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
						{JSON.stringify(answers, null, 2)}
					</pre>
				</div>
			</div>
		</div>
	);
}