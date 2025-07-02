// ✨ Global Types for Quiz Application

export interface QuizContent {
	type: "image" | "text" | "svg" | "component";
	data: string;
	alt?: string;
	component?: string;
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
	interactive?: boolean;
	category?: ScamCategory; // 🆕 เพิ่ม category
	difficulty?: "easy" | "medium" | "hard"; // 🆕 เพิ่ม difficulty
	tags?: string[]; // 🆕 เพิ่ม tags สำหรับ filtering
	redFlags?: string[]; // 🆕 เพิ่ม red flags แบบ raw data
}

export interface RedFlag {
	id: string;
	message: string;
	position: { top: string; left: string };
	direction: "down" | "left" | "right" | "up";
	delay: number;
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
	answers: Answer[];
	selectedAnswer: string | null;
	showResult: boolean;
	isCorrect: boolean | null;
	onAnswerSelect: (answerId: string) => void;
	hideAnswers?: boolean;
	layout?: AnswerPanelLayout; // 🆕 Layout variant
	className?: string; // 🆕 Custom styling
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
	isLoading?: boolean; // 🆕 External loading prop
}

export interface RedFlagTooltipProps {
	message: string;
	position: { top: string; left: string };
	direction: "down" | "left" | "right" | "up";
	delay?: number;
	show?: boolean;
	className?: string;
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
