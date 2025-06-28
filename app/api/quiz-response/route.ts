import { NextRequest, NextResponse } from "next/server";

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";

export interface QuizResponseData {
	sessionId: string;
	questionId: string;
	answerId: string;
	isCorrect: boolean;
	timeSpent: number; // seconds
	deviceType: "mobile" | "tablet" | "desktop";
	userAgent: string;
}

export async function POST(request: NextRequest) {
	try {
		const data: QuizResponseData = await request.json();

		// Validate required fields
		if (!data.sessionId || !data.questionId || !data.answerId) {
			return NextResponse.json(
				{ success: false, error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Send to Google Apps Script
		const response = await fetch(GOOGLE_SCRIPT_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();

		if (!result.success) {
			throw new Error(result.error || "Failed to save data");
		}

		return NextResponse.json({
			success: true,
			message: "Quiz response saved successfully",
			data: result,
		});
	} catch (error) {
		console.error("Quiz API Error:", error);

		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Internal server error",
			},
			{ status: 500 }
		);
	}
}

// Health check endpoint
export async function GET() {
	return NextResponse.json({
		success: true,
		message: "Quiz API is running",
		timestamp: new Date().toISOString(),
	});
}
