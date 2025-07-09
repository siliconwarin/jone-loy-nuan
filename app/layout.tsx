import type { Metadata } from "next";
import { Inter, Prompt } from "next/font/google";
import "./globals.css";

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
	title: "Scam Hunt",
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
				{children}
			</body>
		</html>
	);
}
