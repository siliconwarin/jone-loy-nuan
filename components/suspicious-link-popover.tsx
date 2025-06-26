"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ExternalLink, Shield, Eye } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface SuspiciousLinkPopoverProps {
	children: React.ReactNode;
	link: string;
	reason: string;
	details?: string[];
	severity?: "low" | "medium" | "high";
}

export const SuspiciousLinkPopover = ({
	children,
	link,
	reason,
	details = [],
	severity = "medium",
}: SuspiciousLinkPopoverProps) => {
	const getSeverityColor = () => {
		switch (severity) {
			case "low":
				return "from-yellow-400 to-orange-400";
			case "high":
				return "from-red-400 to-pink-500";
			default:
				return "from-orange-400 to-pink-400";
		}
	};

	const getSeverityBg = () => {
		switch (severity) {
			case "low":
				return "bg-yellow-50 border-yellow-200";
			case "high":
				return "bg-red-50 border-red-200";
			default:
				return "bg-orange-50 border-orange-200";
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<motion.div
					whileHover={{ scale: 1.02 }}
					className="inline-block cursor-pointer"
				>
					{children}
				</motion.div>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.2 }}
					className="space-y-3"
				>
					{/* Header */}
					<div className="flex items-center gap-2">
						<div
							className={`p-2 rounded-full bg-gradient-to-r ${getSeverityColor()}`}
						>
							<AlertTriangle className="h-4 w-4 text-white" />
						</div>
						<div>
							<h3 className="font-semibold text-gray-800">ลิ้งที่น่าสงสัย</h3>
							<p className="text-xs text-gray-500 capitalize">
								{severity} risk
							</p>
						</div>
					</div>

					{/* Link Display */}
					<div className={`p-3 rounded-lg ${getSeverityBg()} border`}>
						<div className="flex items-center gap-2 mb-2">
							<ExternalLink className="h-4 w-4 text-gray-600" />
							<span className="text-sm font-medium text-gray-700">
								ลิ้งที่ตรวจพบ:
							</span>
						</div>
						<code className="text-xs bg-white/60 px-2 py-1 rounded border break-all">
							{link}
						</code>
					</div>

					{/* Reason */}
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Eye className="h-4 w-4 text-pink-600" />
							<span className="text-sm font-medium text-gray-700">
								เหตุผลที่น่าสงสัย:
							</span>
						</div>
						<p className="text-sm text-gray-600 bg-pink-50 p-2 rounded border-l-4 border-pink-300">
							{reason}
						</p>
					</div>

					{/* Details */}
					{details.length > 0 && (
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Shield className="h-4 w-4 text-rose-600" />
								<span className="text-sm font-medium text-gray-700">
									สิ่งที่ควรระวัง:
								</span>
							</div>
							<ul className="text-sm text-gray-600 space-y-1">
								{details.map((detail, index) => (
									<motion.li
										key={index}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
										className="flex items-start gap-2"
									>
										<span className="inline-block w-1.5 h-1.5 bg-rose-400 rounded-full mt-2 flex-shrink-0" />
										{detail}
									</motion.li>
								))}
							</ul>
						</div>
					)}

					{/* Footer */}
					<div className="pt-2 border-t border-pink-100">
						<p className="text-xs text-gray-500 text-center">
							💡 เคล็ดลับ: ตรวจสอบลิ้งให้ดีก่อนคลิก
						</p>
					</div>
				</motion.div>
			</PopoverContent>
		</Popover>
	);
};
