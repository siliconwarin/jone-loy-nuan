/**
 * 📊 Scam Awareness Quiz & Survey Data Collection
 * Google Apps Script Web App for unified data collection
 *
 * Features:
 * - Single sheet for all data (quiz summary + survey)
 * - Privacy-focused: No detailed question-answer tracking
 * - Quiz: Only total score and question count
 * - Survey: Complete demographic data
 */

// 📋 Configuration
const SPREADSHEET_ID = "1c_PVbsZwt_XLbI6uiAt4_PiUn9v7fvcM8rQSK788rU8";
const SHEET_NAME = "jone-loy-noan"; // Single sheet for all data

/**
 * 🔥 Main POST Handler - Unified Data Collection
 */
function doPost(e) {
	try {
		// Parse incoming JSON data
		const data = JSON.parse(e.postData.contents);
		const dataType = data.type || "quiz"; // default to quiz

		// Route to appropriate handler
		switch (dataType) {
			case "quiz":
				return handleQuizSummary(data);
			case "survey":
				return handleSurveyResponse(data);
			default:
				throw new Error(`Unknown data type: ${dataType}`);
		}
	} catch (error) {
		console.error("doPost Error:", error);
		return createErrorResponse(error.message);
	}
}

/**
 * 🎯 Handle Quiz Summary (total score only)
 */
function handleQuizSummary(data) {
	try {
		const sheet = getOrCreateSheet(SHEET_NAME, getUnifiedHeaders());

		// Validate required fields for quiz summary
		const required = ["sessionId", "totalQuestions", "correctAnswers"];
		for (const field of required) {
			if (data[field] === undefined || data[field] === null) {
				throw new Error(`Missing required field: ${field}`);
			}
		}

		// Prepare row data for quiz summary (simplified format)
		const rowData = [
			new Date(), // Timestamp
			"quiz", // Data_Type
			data.sessionId, // Session_ID
			data.totalQuestions || 7, // Total_Questions
			data.correctAnswers || 0, // Correct_Answers
			"", // Age_Group (empty for quiz)
			"", // Education (empty for quiz)
			"", // Occupation (empty for quiz)
			"", // Has_Scam_Experience (empty for quiz)
			"", // Scam_Types (empty for quiz)
			"", // Social_Media_Usage (empty for quiz)
			"", // Platforms (empty for quiz)
			"", // Feedback (empty for quiz)
			data.deviceType || "unknown", // Device_Type
			data.userAgent || "unknown", // User_Agent
		];

		// Append to sheet
		sheet.appendRow(rowData);

		return createSuccessResponse("Quiz summary saved successfully", {
			type: "quiz",
			sessionId: data.sessionId,
			score: `${data.correctAnswers}/${data.totalQuestions}`,
		});
	} catch (error) {
		console.error("Quiz Summary Error:", error);
		throw error;
	}
}

/**
 * 📝 Handle Survey Response (complete survey)
 */
function handleSurveyResponse(data) {
	try {
		const sheet = getOrCreateSheet(SHEET_NAME, getUnifiedHeaders());

		// Validate required fields for survey
		const required = [
			"ageGroup",
			"education",
			"occupation",
			"hasScamExperience",
			"socialMediaUsage",
			"platforms",
		];
		for (const field of required) {
			if (!data[field]) {
				throw new Error(`Missing required field: ${field}`);
			}
		}

		// Prepare row data for survey (unified format)
		const rowData = [
			new Date(), // Timestamp
			"survey", // Data_Type
			data.sessionId || "", // Session_ID (optional for survey)
			data.totalQuestions || 7, // Total_Questions (from quiz)
			data.totalScore || 0, // Correct_Answers (from quiz)
			data.ageGroup, // Age_Group
			data.education, // Education
			data.occupation, // Occupation
			data.hasScamExperience, // Has_Scam_Experience
			Array.isArray(data.scamTypes) ? data.scamTypes.join(", ") : "", // Scam_Types
			data.socialMediaUsage, // Social_Media_Usage
			Array.isArray(data.platforms) ? data.platforms.join(", ") : "", // Platforms
			data.feedback || "", // Feedback
			data.deviceType || "unknown", // Device_Type
			data.userAgent || "unknown", // User_Agent
		];

		// Append to sheet
		sheet.appendRow(rowData);

		return createSuccessResponse("Survey response saved successfully", {
			type: "survey",
			totalScore: data.totalScore,
			responses: sheet.getLastRow() - 1, // Total responses count
		});
	} catch (error) {
		console.error("Survey Response Error:", error);
		throw error;
	}
}

/**
 * 📊 Get or Create Unified Sheet with Headers
 */
function getOrCreateSheet(sheetName, headers) {
	const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
	let sheet = ss.getSheetByName(sheetName);

	if (!sheet) {
		sheet = ss.insertSheet(sheetName);
		sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

		// Format header row
		const headerRange = sheet.getRange(1, 1, 1, headers.length);
		headerRange.setFontWeight("bold");
		headerRange.setBackground("#4285f4");
		headerRange.setFontColor("white");

		// Auto resize columns
		sheet.autoResizeColumns(1, headers.length);

		// Freeze header row
		sheet.setFrozenRows(1);
	}

	return sheet;
}

/**
 * 📋 Simplified Headers for Quiz Summary and Survey Data
 */
function getUnifiedHeaders() {
	return [
		"Timestamp", // Universal
		"Data_Type", // quiz | survey
		"Session_ID", // Universal
		"Total_Questions", // Universal (usually 7)
		"Correct_Answers", // Universal (quiz score)
		"Age_Group", // Survey only
		"Education", // Survey only
		"Occupation", // Survey only
		"Has_Scam_Experience", // Survey only
		"Scam_Types", // Survey only
		"Social_Media_Usage", // Survey only
		"Platforms", // Survey only
		"Feedback", // Survey only
		"Device_Type", // Universal
		"User_Agent", // Universal
	];
}

/**
 * ✅ Create Success Response
 */
function createSuccessResponse(message, data = {}) {
	return ContentService.createTextOutput(
		JSON.stringify({
			success: true,
			message: message,
			data: data,
			timestamp: new Date().toISOString(),
		})
	).setMimeType(ContentService.MimeType.JSON);
}

/**
 * ❌ Create Error Response
 */
function createErrorResponse(message) {
	return ContentService.createTextOutput(
		JSON.stringify({
			success: false,
			error: message,
			timestamp: new Date().toISOString(),
		})
	).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 🔍 Health Check & API Info (GET)
 */
function doGet(e) {
	return ContentService.createTextOutput(
		JSON.stringify({
			status: "healthy",
			service: "Jone Loy Nuan - Privacy-Focused Data Collection API",
			version: "2.1.0",
			timestamp: new Date().toISOString(),
			storage: {
				spreadsheetId: SPREADSHEET_ID,
				sheetName: SHEET_NAME,
				dataTypes: ["quiz", "survey"],
				privacy: "Quiz details not stored - only summary scores",
			},
			endpoints: {
				quiz: 'POST with type: "quiz" - Quiz summary only (total questions + correct answers)',
				survey: 'POST with type: "survey" - Complete survey data',
				health: "GET - This endpoint",
			},
			sampleUsage: {
				quiz: {
					type: "quiz",
					sessionId: "quiz_123_abc",
					totalQuestions: 7,
					correctAnswers: 5,
					deviceType: "mobile",
					userAgent: "Mozilla/5.0...",
				},
				survey: {
					type: "survey",
					sessionId: "quiz_123_abc",
					totalQuestions: 7,
					totalScore: 5,
					ageGroup: "25-34",
					education: "bachelor",
					occupation: "private",
					hasScamExperience: false,
					scamTypes: [],
					socialMediaUsage: "daily",
					platforms: ["facebook", "line"],
					feedback: "Great quiz!",
					deviceType: "desktop",
					userAgent: "Mozilla/5.0...",
				},
			},
		})
	).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 📈 Analytics Helper Functions
 */

// Get quiz statistics
function getQuizStats() {
	const sheet =
		SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
	const data = sheet.getDataRange().getValues();

	// Filter quiz responses
	const quizData = data.filter((row) => row[1] === "quiz");

	if (quizData.length === 0) return { totalQuizzes: 0, averageScore: 0 };

	const totalQuizzes = quizData.length;
	const averageScore =
		quizData.reduce((sum, row) => sum + (row[4] || 0), 0) / totalQuizzes;
	const averagePercentage =
		quizData.reduce((sum, row) => {
			const total = row[3] || 7;
			const correct = row[4] || 0;
			return sum + correct / total;
		}, 0) / totalQuizzes;

	return {
		totalQuizzes,
		averageScore: Math.round(averageScore * 100) / 100,
		averagePercentage: Math.round(averagePercentage * 100),
	};
}

// Get survey statistics
function getSurveyStats() {
	const sheet =
		SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
	const data = sheet.getDataRange().getValues();

	// Filter survey responses
	const surveyData = data.filter((row) => row[1] === "survey");

	if (surveyData.length === 0) return { totalSurveys: 0, averageScore: 0 };

	const totalSurveys = surveyData.length;
	const averageScore =
		surveyData.reduce((sum, row) => sum + (row[4] || 0), 0) / totalSurveys;

	return {
		totalSurveys,
		averageScore: Math.round(averageScore * 100) / 100,
	};
}
