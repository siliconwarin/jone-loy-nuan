"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

interface PinScenarioProps {
	onAnswer: (isCorrect: boolean) => void;
	disabled?: boolean;
}

export const PinScenario = ({
	onAnswer,
	disabled = false,
}: PinScenarioProps) => {
	const [value, setValue] = useState("");
	const maxLength = 6;

	// Handle number pad press
	const handleNumberPress = (num: string) => {
		if (disabled || value.length >= maxLength) return;
		setValue((prev) => prev + num);
	};

	// Handle backspace
	const handleBackspace = () => {
		if (disabled) return;
		setValue((prev) => prev.slice(0, -1));
	};

	// Handle cancel (Correct answer)
	const handleCancel = () => {
		if (disabled) return;
		onAnswer(true); // ยกเลิก = คำตอบที่ถูก
	};

	// Handle confirm (Incorrect answer)
	const handleConfirm = () => {
		if (disabled) return;
		onAnswer(false); // ยืนยัน = คำตอบที่ผิด (ถูกหลอก)
	};

	// Number pad layout
	const numbers = [
		["1", "2", "3"],
		["4", "5", "6"],
		["7", "8", "9"],
		["", "0", "backspace"],
	];

	return (
		<div className="w-full max-w-[280px] mx-auto">
			{/* Phone-like container with blue header */}
			<div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
				{/* Blue header - ลดจาก h-20 เป็น h-[60px] (25% น้อยลง) */}
				<div className="bg-blue-600 h-[60px] flex items-center justify-center">
					<div className="text-white text-sm font-medium">
						กรุณากรอกรหัสผ่าน
					</div>
				</div>

				{/* PIN input display using InputOTP - ลด padding */}
				<div className="bg-gray-50 px-4 py-3">
					<div className="flex justify-center">
						<InputOTP
							maxLength={maxLength}
							value={value}
							onChange={(newValue) => setValue(newValue)}
							disabled={disabled}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
					</div>
				</div>

				{/* Number pad - ลด padding และ gap */}
				<div className="p-3 bg-gray-50">
					<div className="grid grid-cols-3 gap-0.5">
						{numbers.flat().map((item, index) => {
							if (item === "") {
								return <div key={index} />; // Empty space
							}

							if (item === "backspace") {
								return (
									<motion.button
										key={index}
										whileTap={{ scale: 0.95 }}
										onClick={handleBackspace}
										disabled={disabled || value.length === 0}
										className="aspect-4/3 flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
									>
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
											/>
										</svg>
									</motion.button>
								);
							}

							return (
								<motion.button
									key={index}
									whileTap={{ scale: 0.95 }}
									onClick={() => handleNumberPress(item)}
									disabled={disabled}
									className="aspect-4/3 flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
								>
									{item}
								</motion.button>
							);
						})}
					</div>
				</div>
			</div>

			{/* Action buttons - ใช้ Button component เหมือนข้ออื่น */}
			<div className="flex gap-3 sm:gap-4 md:gap-6 mt-4 px-4">
				<Button
					variant="quiz"
					size="lg"
					onClick={handleCancel}
					disabled={disabled}
					className="flex-1 h-auto text-sm sm:text-base py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 min-h-[44px]"
				>
					ยกเลิก
				</Button>
				<Button
					variant="quiz"
					size="lg"
					onClick={handleConfirm}
					disabled={disabled}
					className="flex-1 h-auto text-sm sm:text-base py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 min-h-[44px]"
				>
					ยืนยัน
				</Button>
			</div>
		</div>
	);
};
