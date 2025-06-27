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

export interface QuizQuestion {
	id: string;
	question: string;
	content: QuizContent;
	answers: Answer[];
	result: QuizResult;
	interactive?: boolean;
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
}

export interface AnswerPanelProps {
	answers: Answer[];
	selectedAnswer: string | null;
	showResult: boolean;
	isCorrect: boolean | null;
	onAnswerSelect: (answerId: string) => void;
	hideAnswers?: boolean;
}

export interface QuestionSectionProps {
	question: string;
	className?: string;
}

export interface ResultCardProps {
	result: QuizResult;
	isCorrect: boolean;
	onRestart?: () => void;
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
