"use client";

import { cn } from "@/lib/utils";

interface ExplanationCardProps {
	show: boolean;
	isDarkMode: boolean;
	// You can add more props like title, content, etc.
}

export const ExplanationCard = ({ show, isDarkMode }: ExplanationCardProps) => {
	if (!show) {
		return null;
	}

	return (
		<div
			className={cn(
				"p-4 mt-4 rounded-lg border",
				isDarkMode
					? "bg-gray-800 border-gray-700 text-gray-200"
					: "bg-white border-gray-300 text-gray-800",
				"transition-all duration-300 animate-fade-in"
			)}
		>
			<h3 className="font-bold text-lg mb-2">คำอธิบาย</h3>
			<p>
				นี่คือส่วนที่จะอธิบายว่าทำไมตัวเลือกนั้นถึงถูกต้อง
				เพื่อให้ผู้ใช้ได้เรียนรู้และเข้าใจมากขึ้น
			</p>
		</div>
	);
};
