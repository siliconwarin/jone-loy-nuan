"use client";

import type { Database } from "./database.types";

// ✨ Global Types for Quiz Application

export interface QuizContent {
	type: "image" | "text" | "svg" | "component";
	data: string;
	alt?: string;
	component?: string;
	images?: {
		normal: string;
		result: string;
	};
}

export interface Answer {
	id: string;
	text: string;
	isCorrect: boolean;
}

export interface QuizResult {
	correctTitle: string;
	wrongTitle: string;
	header: string;
	explanation: string;
}

// 🆕 เพิ่ม type สำหรับ Scam Categories
export type ScamCategory =
	| "SMS_SCAM"
	| "LOAN_APP_SCAM"
	| "JOB_SCAM"
	| "INVESTMENT_SCAM"
	| "ROMANCE_SCAM"
	| "GROUP_SCAM"
	| "PIN_SCAM"
	| "POLICE_AD_SCAM"
	| "POLICE_CALL_SCAM"
	| "MULE_ACCOUNT_SCAM";

export interface QuizQuestion {
	id: string;
	question: string;
	content: QuizContent;
	answers: Answer[];
	result: QuizResult;

	category?: ScamCategory;
	difficulty?: "easy" | "medium" | "hard";
	tags?: string[];
	orderIndex: number;
}

// Component Props Types
export interface ContentAreaProps {
	content: QuizContent;
	className?: string;
	variant?: "default" | "compact" | "fullscreen";
	animate?: boolean;
	tooltipContent?: string;
	tooltipVariant?: "default" | "warning" | "danger" | "info";
	showResult?: boolean;
	onAnswer?: (isCorrect: boolean) => void;
}

// เพิ่มใหม่ - Answer Panel Layout Types
export type AnswerPanelLayout = "auto" | "vertical" | "horizontal" | "hidden";

// อัปเดต AnswerPanelProps
export interface AnswerPanelProps {
	answers?: Answer[] | null;
	selectedAnswer: string | null;
	showResult: boolean;
	hideAnswers?: boolean;
	onAnswerSelect: (answerId: string) => void;
	layout?: AnswerPanelLayout;
	className?: string;
}

export interface QuestionSectionProps {
	question: string;
	className?: string;
}

export interface ResultCardProps {
	showResult: boolean;
	isCorrect: boolean | null;
	result: QuizResult;
	onReset: () => void;
	isLoading?: boolean;
}

export interface ChatScenarioProps {
	className?: string;
	animate?: boolean;
	showResult?: boolean;
}

// Button Variants
export type ButtonVariant = "quiz" | "quiz-correct" | "quiz-wrong";

// Animation Types
export interface AnimationConfig {
	duration: number;
	delay: number;
	ease: string;
}

export interface PageTransitionProps {
	children: React.ReactNode;
	className?: string;
}

// เพิ่ม type สำหรับ interactive scenario
export interface InteractiveAdScenarioProps {
	className?: string;
	animate?: boolean;
	showResult?: boolean;
}

// Database Types
export interface DatabaseQuestion {
	id: string;
	question_text: string;
	category: string | null;
	content: any;
	answers: any;
	result: any;
	order_index: number | null;
	created_at: string;
	updated_at: string | null;
}

export interface QuestionWithImages extends DatabaseQuestion {
	normal_image_url: string | null;
	result_image_url: string | null;
}

export type QuestionWithAnswers =
	Database["public"]["Functions"]["get_questions_with_answers"]["Returns"][number];

// --- Database & API Related Types ---

export interface Question {
	// ... existing code ...
}
