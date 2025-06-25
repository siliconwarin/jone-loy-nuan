"use client";

import { cn } from "@/lib/utils";
import React from "react";

// Assuming Message and TypingIndicator might be defined elsewhere or here
// For now, let's create simple placeholders.

interface Message {
	text: string;
	isUser: boolean;
}

const TypingIndicator = () => (
	<div className="self-start bg-gray-200 p-2 rounded-lg shadow-sm max-w-[80%] mb-2">
		<div className="flex space-x-2">
			<div
				className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-500 rounded-full animate-bounce"
				style={{ animationDelay: "0ms" }}
			></div>
			<div
				className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-500 rounded-full animate-bounce"
				style={{ animationDelay: "150ms" }}
			></div>
			<div
				className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-500 rounded-full animate-bounce"
				style={{ animationDelay: "300ms" }}
			></div>
		</div>
	</div>
);

interface ChatInterfaceProps {
	visibleMessages: Message[];
	isTyping: boolean;
	hasAnswer: boolean;
	isDarkMode: boolean;
}

export const ChatInterface = ({
	visibleMessages,
	isTyping,
	isDarkMode,
}: ChatInterfaceProps) => {
	return (
		<div
			className={cn(
				"h-full w-full rounded-lg shadow-inner p-4 flex flex-col overflow-y-auto",
				isDarkMode ? "bg-gray-800" : "bg-white"
			)}
		>
			{visibleMessages.map((message, index) => (
				<div
					key={index}
					className={cn(
						"p-2 sm:p-3 rounded-lg shadow-sm max-w-[85%] mb-2 sm:mb-3 animate-fade-in text-sm sm:text-base",
						message.isUser
							? "self-end bg-blue-500 text-white"
							: "self-start bg-gray-200 text-gray-800"
					)}
				>
					<p className="whitespace-pre-line">{message.text}</p>
				</div>
			))}
			{isTyping && <TypingIndicator />}
		</div>
	);
};
