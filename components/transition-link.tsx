"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionLinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

// Global state for transition
let isTransitioning = false;
let transitionCallbacks: (() => void)[] = [];

export const useTransition = () => {
	const [isActive, setIsActive] = useState(false);

	const startTransition = (callback: () => void) => {
		if (isTransitioning) return;

		isTransitioning = true;
		setIsActive(true);
		transitionCallbacks.push(callback);

		// Start stairs animation
		setTimeout(() => {
			// Execute navigation after stairs animation
			transitionCallbacks.forEach((cb) => cb());
			transitionCallbacks = [];

			// End transition after content loads
			setTimeout(() => {
				isTransitioning = false;
				setIsActive(false);
			}, 800); // Content animation duration
		}, 750); // Stairs animation duration
	};

	return { isTransitioning: isActive, startTransition };
};

export const TransitionLink = ({
	href,
	children,
	className = "",
	onClick,
}: TransitionLinkProps) => {
	const router = useRouter();
	const { startTransition } = useTransition();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();

		if (onClick) onClick();

		startTransition(() => {
			router.push(href);
		});
	};

	return (
		<a href={href} onClick={handleClick} className={className}>
			{children}
		</a>
	);
};

// Stairs Animation Component
const StairsOverlay = () => {
	const stairAnimation = {
		initial: { top: "0%" },
		animate: { top: "100%" },
		exit: { top: ["100%", "0%"] },
	};

	const reverseIndex = (index: number): number => {
		const totalSteps = 6;
		return totalSteps - index - 1;
	};

	return (
		<div className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-50 flex">
			{[...Array(6)].map((_, index) => (
				<motion.div
					key={index}
					variants={stairAnimation}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{
						duration: 0.35,
						ease: "easeInOut",
						delay: reverseIndex(index) * 0.08,
					}}
					className="h-full w-full bg-gradient-to-br from-purple-200 to-pink-200 relative"
				/>
			))}
		</div>
	);
};

// Global Transition Provider
export const TransitionProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { isTransitioning } = useTransition();

	return (
		<>
			<AnimatePresence>
				{isTransitioning && (
					<motion.div
						key="stairs-transition"
						initial={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, delay: 0.6 }}
					>
						<StairsOverlay />
					</motion.div>
				)}
			</AnimatePresence>

			{children}
		</>
	);
};
