import { NextRequest, NextResponse } from "next/server";

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";

export interface QuizSummaryData {
	sessionId: string;
	totalQuestions: number;
	correctAnswers: number;
	deviceType: "mobile" | "tablet" | "desktop";
	userAgent: string;
}

export async function POST(request: NextRequest) {
	try {
		// 🔍 Debug environment variables
		console.log("🔍 GOOGLE_SCRIPT_URL:", process.env.GOOGLE_SCRIPT_URL);
		console.log(
			"🔍 Environment keys containing 'GOOGLE':",
			Object.keys(process.env).filter((key) => key.includes("GOOGLE"))
		);

		const data: QuizSummaryData = await request.json();

		// Validate required fields
		if (
			!data.sessionId ||
			data.totalQuestions === undefined ||
			data.correctAnswers === undefined
		) {
			return NextResponse.json(
				{
					success: false,
					error:
						"Missing required fields: sessionId, totalQuestions, correctAnswers",
				},
				{ status: 400 }
			);
		}

		// Validate score range
		if (data.correctAnswers < 0 || data.correctAnswers > data.totalQuestions) {
			return NextResponse.json(
				{
					success: false,
					error:
						"Invalid score: correctAnswers must be between 0 and totalQuestions",
				},
				{ status: 400 }
			);
		}

		// 🔧 Check if Google Script URL is configured
		if (!GOOGLE_SCRIPT_URL) {
			console.log("Quiz Summary (Local Mode):", {
				...data,
				score: `${data.correctAnswers}/${data.totalQuestions}`,
				percentage: Math.round(
					(data.correctAnswers / data.totalQuestions) * 100
				),
			});

			// Simulate API delay for development
			await new Promise((resolve) => setTimeout(resolve, 500));

			return NextResponse.json({
				success: true,
				message: "Quiz summary saved successfully (Local Mode)",
				data: {
					...data,
					score: `${data.correctAnswers}/${data.totalQuestions}`,
					percentage: Math.round(
						(data.correctAnswers / data.totalQuestions) * 100
					),
					saved: true,
					mode: "local",
				},
			});
		}

		// Send to Google Apps Script (Production Mode)
		const response = await fetch(GOOGLE_SCRIPT_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				type: "quiz", // 🆕 Specify data type
				...data,
			}),
		});

		const result = await response.json();

		if (!result.success) {
			throw new Error(result.error || "Failed to save quiz summary");
		}

		return NextResponse.json({
			success: true,
			message: "Quiz summary saved successfully",
			data: {
				...result.data,
				score: `${data.correctAnswers}/${data.totalQuestions}`,
				percentage: Math.round(
					(data.correctAnswers / data.totalQuestions) * 100
				),
			},
		});
	} catch (error) {
		console.error("Quiz Summary API Error:", error);

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
		message: "Quiz Summary API is running",
		description:
			"Privacy-focused: Only stores total questions and correct answers",
		timestamp: new Date().toISOString(),
		samplePayload: {
			sessionId: "quiz_123_abc",
			totalQuestions: 7,
			correctAnswers: 5,
			deviceType: "mobile",
			userAgent: "Mozilla/5.0...",
		},
	});
}
