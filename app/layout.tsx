import type { Metadata } from "next";
import { Inter, Prompt } from "next/font/google";
import "./globals.css";
import StairTransition from "@/components/stair-transition";
import PageTransition from "@/components/page-transition";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

const prompt = Prompt({
	variable: "--font-prompt",
	subsets: ["thai", "latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Jone Loy Nuan - Scam Awareness Quiz",
	description: "แบบทดสอบความรู้เรื่องการป้องกันการโกงออนไลน์ เริ่มต้นที่นี่",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="th">
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<body
				className={`${inter.variable} ${prompt.variable} font-sans antialiased`}
			>
				{/* Stair Transition - z-50 อยู่เหนือสุด */}
				<StairTransition />

				{/* Page Transition - z-40 อยู่ใต้ stairs */}
				<PageTransition>{children}</PageTransition>
			</body>
		</html>
	);
}
