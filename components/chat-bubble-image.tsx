"use client";

import Image from "next/image";
import { memo } from "react";

/**
 * ChatBubbleImage
 * ภาพ Chat Bubble คงที่ ใช้ React.memo เพื่อป้องกัน unnecessary re-render
 */
function ChatBubbleImage() {
	return (
		<Image
			src="/images/scenario-1/chat-bubble.jpg"
			alt="Scam message bubble"
			width={320}
			height={120}
			className="w-full h-auto drop-shadow-sm"
			priority
		/>
	);
}

export default memo(ChatBubbleImage);
