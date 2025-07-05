"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScenarioViewerProps {
	showResult?: boolean;
	normal_image_url: string | null;
	result_image_url: string | null;
	altText: string;
	className?: string;
}

export const ScenarioViewer = ({
	showResult = false,
	normal_image_url,
	result_image_url,
	altText,
	className,
}: ScenarioViewerProps) => {
	const currentImage = showResult ? result_image_url : normal_image_url;

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
							alt={altText}
							className="w-full h-auto object-contain rounded-lg"
						/>
					) : (
						<div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
							<p className="text-gray-500">Image not available</p>
						</div>
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};
