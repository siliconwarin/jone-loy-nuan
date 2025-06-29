import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const surveyData = await request.json();

		const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

		// 🔧 Check if Google Script URL is configured
		if (!GOOGLE_SCRIPT_URL) {
			console.log("Survey Response (Local Mode):", surveyData);

			// Simulate API delay for development
			await new Promise((resolve) => setTimeout(resolve, 1000));

			return NextResponse.json(
				{
					success: true,
					message: "Survey submitted successfully (Local Mode)",
				},
				{ status: 200 }
			);
		}

		// Send to Google Apps Script (Production Mode)
		const response = await fetch(GOOGLE_SCRIPT_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				type: "survey", // 🆕 Specify data type
				...surveyData,
			}),
		});

		const result = await response.json();

		if (!result.success) {
			throw new Error(result.error || "Failed to save survey data");
		}

		return NextResponse.json(
			{
				success: true,
				message: "Survey submitted successfully",
				data: result,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Survey API Error:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to submit survey",
			},
			{ status: 500 }
		);
	}
}
