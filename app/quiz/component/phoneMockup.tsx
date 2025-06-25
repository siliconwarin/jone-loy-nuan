"use client";

import { motion } from "framer-motion";

interface PhoneMockupProps {
	className?: string;
	// เพิ่ม props สำหรับ custom SVG ในอนาคต
	customSvg?: React.ReactNode;
}

export const PhoneMockup = ({
	className = "",
	customSvg,
}: PhoneMockupProps) => {
	// ถ้ามี custom SVG ให้ใช้แทน
	if (customSvg) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className={`mx-auto w-full max-w-sm ${className}`}
			>
				{customSvg}
			</motion.div>
		);
	}

	// Default mockup (ปัจจุบัน)
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.4 }}
			className={`bg-gray-800 rounded-[20px] p-4 mx-auto w-full max-w-sm h-[400px] flex flex-col ${className}`}
		>
			{/* Phone Header - ปุ่ม < 99+ ซ้ายสุด, ไอคอนโปรไฟล์ตรงกลาง */}
			<div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center justify-center shrink-0 relative">
				{/* ปุ่มย้อนกลับ + 99+ */}
				<div className="absolute left-4 flex items-center space-x-1">
					<span className="text-xl font-bold select-none">←</span>
					<span className="text-white text-xs font-semibold px-2 py-0.5">
						99+
					</span>
				</div>
				{/* ไอคอนโปรไฟล์ตรงกลาง */}
				<div className="flex flex-col items-center">
					<div className="relative w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mx-auto">
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<circle cx="16" cy="16" r="16" fill="#60A5FA" />
							<ellipse cx="16" cy="14" rx="6" ry="6" fill="#fff" />
							<path d="M8 26c0-4 3.582-7 8-7s8 3 8 7" fill="#fff" />
						</svg>
						{/* วงกลมสีส้มมุมขวาล่าง */}
						<div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-orange-500 rounded-full border-2 border-blue-600"></div>
					</div>
					{/* ขีดอ้วนๆ ใต้ profile */}
					<div className="w-8 h-1 bg-gray-300 rounded-full mt-1"></div>
				</div>
				<div className="absolute right-4" />
			</div>

			{/* Message Area - ปรับให้เหมือนแชทจริงและขยับขึ้นบนสุดของหน้าจอ mockup ค่ะ */}
			<div className="bg-gray-100 p-4 rounded-b-lg flex-grow flex flex-col justify-start">
				{/* Bubble ฝั่งระบบ/เจ้าหน้าที่ */}
				<div className="flex flex-col items-start mt-2">
					<div className="bg-white rounded-2xl rounded-bl-sm shadow px-4 py-3 text-sm max-w-[80%] border border-gray-200">
						พัสดุของท่าน เกิดการเสียหาย
						<br />
						กรุณายืนยันคลมาค่าเสียหาย
						<br />
						<span className="text-blue-600 underline break-all">
							bit.ly/49dvdnhm
						</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

// สำหรับอนาคต - ตัวอย่างการใช้ custom SVG
export const CustomPhoneSvg = () => (
	<svg
		width="384"
		height="400"
		viewBox="0 0 384 400"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="w-full h-auto"
	>
		{/* คุณคิวสามารถใส่ SVG content ตรงนี้ */}
		<rect width="384" height="400" rx="20" fill="#1f2937" />
		<text x="192" y="200" textAnchor="middle" fill="white" fontSize="16">
			Your Custom SVG Here
		</text>
	</svg>
);
