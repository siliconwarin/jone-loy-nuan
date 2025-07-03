"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScenarioViewer } from "@/components/scenario-viewer";
import { Button } from "@/components/ui/button";
import ChatBubbleImage from "@/components/chat-bubble-image";

export default function TestAnimatePage() {
	const [showResult, setShowResult] = useState(false);
	const [animate, setAnimate] = useState(true);
	const [step, setStep] = useState<"initial" | "bubble" | "result">("initial");

	const handleReset = () => {
		setShowResult(false);
		setStep("initial");
	};

	const handleShowBubble = () => {
		setStep("bubble");
	};

	const handleShowResult = () => {
		setShowResult(true);
		setStep("result");
	};

	const handleInteraction = (answerId: string, isCorrect: boolean) => {
		console.log("Interaction:", { answerId, isCorrect });
		setTimeout(() => {
			handleShowResult();
		}, 500);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						🧪 Test SMS Animation
					</h1>
					<p className="text-gray-600">
						ทดสอบ crossfade animation สำหรับ SMS scenario
					</p>
				</div>

				{/* Controls */}
				<div className="bg-white rounded-xl p-6 shadow-lg mb-8">
					<div className="flex flex-wrap gap-4 items-center justify-center">
						<Button
							onClick={handleReset}
							variant="outline"
							className="flex items-center gap-2"
						>
							🔄 Reset
						</Button>

						<Button
							onClick={handleShowBubble}
							variant="outline"
							disabled={step !== "initial"}
							className="flex items-center gap-2"
						>
							💬 Show Bubble
						</Button>

						<Button
							onClick={handleShowResult}
							variant="outline"
							disabled={step === "result"}
							className="flex items-center gap-2"
						>
							⚠️ Show Result
						</Button>

						<Button
							onClick={() => setAnimate(!animate)}
							variant={animate ? "default" : "secondary"}
							className="flex items-center gap-2"
						>
							{animate ? "🎬" : "⏸️"} Animation: {animate ? "ON" : "OFF"}
						</Button>
					</div>

					<div className="mt-4 text-center text-sm text-gray-500">
						Current Step: <span className="font-medium">{step}</span> | Show
						Result:{" "}
						<span className="font-medium">{showResult ? "TRUE" : "FALSE"}</span>
					</div>
				</div>

				{/* Main Animation Area */}
				<div className="bg-white rounded-xl p-8 shadow-lg">
					<div className="relative max-w-md mx-auto">
						{/* SMS UI with Crossfade */}
						<div className="relative">
							<AnimatePresence mode="wait">
								{!showResult ? (
									<motion.div
										key="normal-sms"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.5 }}
									>
										<img
											src="/images/scenario-1/sms-ui.svg"
											alt="SMS UI Normal"
											className="w-full h-auto rounded-lg shadow-md"
										/>
									</motion.div>
								) : (
									<motion.div
										key="result-sms"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.5 }}
									>
										<img
											src="/images/scenario-1/result-sms-ui.svg"
											alt="SMS UI Result"
											className="w-full h-auto rounded-lg shadow-md"
										/>
									</motion.div>
								)}
							</AnimatePresence>

							{/* Chat Bubble Overlay */}
							<AnimatePresence>
								{(step === "bubble" || step === "result") && (
									<motion.div
										initial={{ opacity: 0, y: 10, scale: 0.9 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: -10, scale: 0.9 }}
										transition={{
											duration: 0.6,
											ease: [0.23, 1, 0.32, 1],
										}}
										className="absolute top-[15%] left-[5%] w-[90%]"
									>
										<ChatBubbleImage />
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Alternative: Using ScenarioViewer Component */}
						<div className="mt-12 border-t pt-8">
							<h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
								📱 Using ScenarioViewer Component
							</h3>
							<ScenarioViewer
								scenarioId="sms-scam-1"
								showResult={showResult}
								animate={animate}
								onInteraction={handleInteraction}
								className="max-w-sm mx-auto"
							/>
						</div>
					</div>
				</div>

				{/* Debug Info */}
				<div className="mt-8 bg-gray-100 rounded-xl p-4 text-sm">
					<h4 className="font-semibold mb-2">🐛 Debug Info:</h4>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<strong>State:</strong>
							<ul className="list-disc list-inside mt-1 text-gray-600">
								<li>step: {step}</li>
								<li>showResult: {showResult.toString()}</li>
								<li>animate: {animate.toString()}</li>
							</ul>
						</div>
						<div>
							<strong>Files Used:</strong>
							<ul className="list-disc list-inside mt-1 text-gray-600">
								<li>sms-ui.svg ✅</li>
								<li>result-sms-ui.svg ✅</li>
								<li>chat-bubble.svg ✅</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
