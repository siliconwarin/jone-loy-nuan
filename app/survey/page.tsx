"use client";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect, useActionState } from "react";
import { toast } from "sonner";
import { submitSurveyAction } from "@/lib/actions/survey";
import { useQuizResultStore } from "@/store/quiz-store";
import {
	Loader2,
	User,
	GraduationCap,
	Briefcase,
	CheckCircle,
} from "lucide-react";

const FORM_DATA = {
	ageGroups: [
		{ value: "under18", label: "ต่ำกว่า 18 ปี" },
		{ value: "18-24", label: "18-24 ปี" },
		{ value: "25-34", label: "25-34 ปี" },
		{ value: "35-44", label: "35-44 ปี" },
		{ value: "45-54", label: "45-54 ปี" },
		{ value: "55-64", label: "55-64 ปี" },
		{ value: "65+", label: "65 ปีขึ้นไป" },
	],
	educationLevels: [
		{ value: "none", label: "ไม่มีวุฒิการศึกษา" },
		{ value: "primary", label: "ประถมศึกษา" },
		{ value: "secondary", label: "มัธยมศึกษา" },
		{ value: "vocational", label: "ปวช./ปวส." },
		{ value: "bachelor", label: "ปริญญาตรี" },
		{ value: "master", label: "ปริญญาโท" },
		{ value: "doctorate", label: "ปริญญาเอก" },
	],
	occupations: [
		{ value: "student", label: "นักเรียน/นักศึกษา" },
		{ value: "government", label: "ข้าราชการ/พนักงานรัฐวิสาหกิจ" },
		{ value: "private", label: "พนักงานบริษัทเอกชน" },
		{ value: "business", label: "ธุรกิจส่วนตัว/ค้าขาย" },
		{ value: "freelance", label: "อาชีพอิสระ/ฟรีแลนซ์" },
		{ value: "labor", label: "รับจ้างทั่วไป" },
		{ value: "agriculture", label: "เกษตรกร" },
		{ value: "retired", label: "เกษียณอายุ" },
		{ value: "unemployed", label: "ว่างงาน" },
		{ value: "other", label: "อื่นๆ" },
	],
};

const initialState = { success: false, message: "" };

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="group relative w-full overflow-hidden rounded-xl border border-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-[1px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
		>
			<div className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white transition-all duration-300 group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-indigo-700 group-disabled:from-gray-400 group-disabled:via-gray-500 group-disabled:to-gray-400">
				{pending ? (
					<>
						<Loader2 className="mr-2 h-5 w-5 animate-spin" />
						<span className="text-lg font-semibold">กำลังส่งข้อมูล...</span>
					</>
				) : (
					<>
						<CheckCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
						<span className="text-lg font-semibold">ส่งแบบสอบถาม</span>
					</>
				)}
			</div>
		</button>
	);
}

function FormField({
	id,
	label,
	name,
	options,
	icon: Icon,
	placeholder,
}: {
	id: string;
	label: string;
	name: string;
	options: { value: string; label: string }[];
	icon: React.ComponentType<{ className?: string }>;
	placeholder: string;
}) {
	return (
		<div className="group space-y-3">
			<label
				htmlFor={id}
				className="flex items-center gap-2 text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-purple-600"
			>
				<Icon className="h-4 w-4" />
				{label}
				<span className="text-red-500">*</span>
			</label>
			<div className="relative">
				<select
					name={name}
					id={id}
					required
					className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm transition-all duration-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 hover:border-gray-300 hover:shadow-md"
				>
					<option value="" className="text-gray-400">
						{placeholder}
					</option>
					{options.map((option) => (
						<option
							key={option.value}
							value={option.value}
							className="text-gray-700"
						>
							{option.label}
						</option>
					))}
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
					<svg
						className="h-4 w-4 text-gray-400 transition-colors group-focus-within:text-purple-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}

export default function SurveyPage() {
	const router = useRouter();
	const { getSummary } = useQuizResultStore();
	const { score, total } = getSummary();
	const [state, formAction] = useActionState(submitSurveyAction, initialState);

	useEffect(() => {
		if (state.success) {
			toast.success(state.message, {
				duration: 3000,
				style: {
					background: "linear-gradient(to right, #059669, #10b981)",
					color: "white",
					border: "none",
				},
			});
			router.push("/result");
		} else if (state.message && !state.success) {
			toast.error(state.message, {
				duration: 4000,
				style: {
					background: "linear-gradient(to right, #dc2626, #ef4444)",
					color: "white",
					border: "none",
				},
			});
		}
	}, [state, router]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
			<div className="mx-auto max-w-2xl">
				{/* Header */}
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						แบบสอบถามข้อมูลส่วนบุคคล
					</h1>
					<p className="text-gray-600">กรุณากรอกข้อมูลเพื่อดำเนินการต่อ</p>
				</div>

				{/* Form */}
				<form
					action={formAction}
					className="space-y-8 rounded-2xl border border-white/20 bg-white/80 p-8 shadow-xl backdrop-blur-sm"
				>
					<input type="hidden" name="totalScore" value={score || 0} />
					<input type="hidden" name="totalQuestions" value={total || 10} />

					<FormField
						id="ageGroup"
						label="ช่วงอายุ"
						name="ageGroup"
						options={FORM_DATA.ageGroups}
						icon={User}
						placeholder="เลือกช่วงอายุของคุณ"
					/>

					<FormField
						id="education"
						label="ระดับการศึกษา"
						name="education"
						options={FORM_DATA.educationLevels}
						icon={GraduationCap}
						placeholder="เลือกระดับการศึกษาของคุณ"
					/>

					<FormField
						id="occupation"
						label="อาชีพ"
						name="occupation"
						options={FORM_DATA.occupations}
						icon={Briefcase}
						placeholder="เลือกอาชีพของคุณ"
					/>

					<div className="pt-4">
						<SubmitButton />
					</div>
				</form>
			</div>
		</div>
	);
}
