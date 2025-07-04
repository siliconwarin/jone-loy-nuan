"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { RedFlagTooltip } from "./red-flag-tooltip";
import { RED_FLAGS_DATA } from "@/lib/constants";
import { PinScenario } from "@/app/quiz/_component/pin-scenario";
import { type QuestionWithImages } from "@/app/quiz/page";

interface ScenarioViewerProps {
	questionData: QuestionWithImages;
	showResult?: boolean;
	animate?: boolean;
	onInteraction?: (answerId: string, isCorrect: boolean) => void;
	className?: string;
}

export const ScenarioViewer = ({
	questionData,
	showResult = false,
	animate = true,
	className,
}: ScenarioViewerProps) => {
	const { content, normal_image_url, result_image_url } = questionData;
	const isInteractive = (content as any)?.interactive || false;

	const normalImage = normal_image_url;
	const resultImage = result_image_url;
	const currentImage = showResult ? resultImage : normalImage;

	if (isInteractive) {
		return <PinScenario onAnswer={() => {}} disabled={showResult} />;
	}

	return (
		<div className={cn("relative w-full max-w-sm mx-auto", className)}>
			<AnimatePresence mode="wait">
				<motion.div
					key={currentImage || "image-container"}
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.4, ease: "easeInOut" }}
					className="relative"
				>
					{currentImage ? (
						<img
							src={currentImage}
							alt={(content as any)?.alt || "Scenario Image"}
							className="w-full h-auto object-contain rounded-lg"
							// Add width/height for better performance if known
						/>
					) : (
						<div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
							<p className="text-gray-500">Image not available</p>
						</div>
					)}
				</motion.div>
			</AnimatePresence>
			{showResult && (
				<div className="absolute inset-0">
					{RED_FLAGS_DATA.map((flag) => (
						<RedFlagTooltip
							key={flag.id}
							message={flag.message}
							position={flag.position}
							direction={flag.direction}
							show={animate}
							delay={flag.delay}
						/>
					))}
				</div>
			)}
		</div>
	);
};
