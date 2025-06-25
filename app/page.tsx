import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
			<div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">Jone Loy Nuan</h1>
				<p className="text-gray-600">Scam Awareness Quiz</p>
			</div>

			{/* Description */}
			<div className="mb-8">
				<div className="bg-blue-50 rounded-lg p-4 mb-6">
					<h2 className="text-lg font-semibold text-blue-800 mb-2">
						ระวังตัวเอาไว้ให้ดี
					</h2>
					<p className="text-blue-700 text-sm">
						ทำแบบทดสอบเพื่อเรียนรู้วิธีการระบุและหลีกเลี่ยงการหลอกลวงออนไลน์
					</p>
				</div>

				<div className="space-y-3 text-left">
					<div className="flex items-center space-x-3">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span className="text-sm text-gray-700">ใช้เวลาเพียง 2-3 นาที</span>
					</div>
					<div className="flex items-center space-x-3">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span className="text-sm text-gray-700">
							เรียนรู้จากสถานการณ์จริง
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span className="text-sm text-gray-700">ได้รับคำแนะนำทันที</span>
					</div>
				</div>
			</div>

			{/* CTA Button */}
			<Link
				href="/quiz"
				className="block w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
			>
				เริ่มทำแบบทดสอบ
			</Link>

			{/* Footer */}
			<p className="text-xs text-gray-500 mt-6">
				ป้องกันตัวเองจากการโกงออนไลน์ เริ่มต้นที่นี่
			</p>
		</div>
	);
}
