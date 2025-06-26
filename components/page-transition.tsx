"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	return (
		<AnimatePresence>
			<div key={pathname}>
				<motion.div
					initial={{ opacity: 1 }}
					animate={{
						opacity: 0,
						transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
					}}
					className="h-screen w-screen fixed bg-gradient-to-br from-pink-50/80 via-rose-50/80 to-pink-100/80 top-0 pointer-events-none z-40"
				/>
				{children}
			</div>
		</AnimatePresence>
	);
};

export default PageTransition;
