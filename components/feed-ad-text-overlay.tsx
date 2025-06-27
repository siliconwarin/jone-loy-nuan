"use client";

import { memo } from "react";

interface FeedAdTextOverlayProps {
	header: string;
	body: string[];
	footer: string;
}

/**
 * FeedAdTextOverlay - Pure Static Version
 * ไม่มี animations, state, หรือ effects เพื่อป้องกัน re-render
 */
function FeedAdTextOverlayComponent({
	header,
	body,
	footer,
}: FeedAdTextOverlayProps) {
	return (
		<div className="absolute top-[22%] sm:top-[24%] md:top-[24%] left-[6%] sm:left-[8%] w-[72%] sm:w-[70%] font-bold leading-snug space-y-2 sm:space-y-3 md:space-y-4">
			{/* Header - Static */}
			<p className="text-yellow-200 text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] leading-tight opacity-100">
				{header}
			</p>

			{/* Body - Static */}
			<div className="text-white text-[11px] sm:text-[12px] md:text-[14px] space-y-0.5 sm:space-y-1">
				{body.map((line, idx) => (
					<p key={idx} className="opacity-100">
						{line}
					</p>
				))}
			</div>

			{/* Footer - Static */}
			<p className="text-white text-[10px] sm:text-[11px] md:text-[12px] opacity-100">
				{footer}
			</p>
		</div>
	);
}

// Memoized to prevent unnecessary re-renders
const FeedAdTextOverlay = memo(FeedAdTextOverlayComponent);

export default FeedAdTextOverlay;
