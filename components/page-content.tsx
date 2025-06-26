"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageContentProps {
	children: React.ReactNode;
	className?: string;
}

export const PageContent = ({ children, className = "" }: PageContentProps) => {
	const [shouldAnimate, setShouldAnimate] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		// Wait for transition to complete before animating content
		const timer = setTimeout(() => {
			setShouldAnimate(true);
		}, 800); // Match transition timing

		return () => {
			clearTimeout(timer);
			setShouldAnimate(false);
		};
	}, [pathname]);

	const contentVariants = {
		hidden: {
			opacity: 0,
			y: 30,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
		},
	};

	const itemVariants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<motion.div
			key={pathname} // Re-animate on route change
			variants={contentVariants}
			initial="hidden"
			animate={shouldAnimate ? "visible" : "hidden"}
			className={className}
		>
			<motion.div variants={itemVariants}>{children}</motion.div>
		</motion.div>
	);
};
