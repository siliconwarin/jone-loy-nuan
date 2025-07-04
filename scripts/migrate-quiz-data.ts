import dotenv from "dotenv";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { quizData } from "../lib/quiz-data";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role key for admin operations

console.log("🔧 Environment Check:");
console.log("   NEXT_PUBLIC_SUPABASE_URL:", !!supabaseUrl);
console.log("   SUPABASE_SERVICE_ROLE_KEY:", !!supabaseServiceKey);

if (!supabaseUrl || !supabaseServiceKey) {
	console.error("❌ Missing environment variables in .env.local:");
	console.error("   NEXT_PUBLIC_SUPABASE_URL:", !!supabaseUrl);
	console.error("   SUPABASE_SERVICE_ROLE_KEY:", !!supabaseServiceKey);
	console.error(
		"\n💡 Make sure .env.local file exists and contains the required variables."
	);
	process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateQuizData() {
	console.log("🚀 Starting quiz data migration...");
	console.log(`📊 Found ${quizData.length} questions to migrate`);

	try {
		// Transform the data to match our database schema
		const transformedData = quizData.map((question, index) => ({
			// Don't set 'id' - let Supabase auto-generate UUID
			question_text: question.question,
			category: `${question.category || "GENERAL"}:${question.id}`, // Store original ID with category
			order_index: index + 1, // Start from 1, not 0
			content: {
				type: question.content.type,
				data: question.content.data,
				alt: question.content.alt,
				component: question.content.component,
				images: question.content.images || null,
				original_id: question.id, // Store original ID in content
			},
			answers: question.answers,
			result: {
				correctTitle: question.result.correctTitle,
				wrongTitle: question.result.wrongTitle,
				header: question.result.header,
				explanation: question.result.explanation,
			},
			red_flags: question.redFlags || [],
		}));

		// Clear existing data first (optional)
		console.log("🗑️  Clearing existing questions...");
		const { error: deleteError } = await supabase
			.from("questions")
			.delete()
			.gt("order_index", 0); // Delete all rows where order_index > 0

		if (deleteError) {
			console.warn(
				"⚠️  Warning: Could not clear existing data:",
				deleteError.message
			);
		}

		// Insert all questions at once
		console.log("📝 Inserting questions into Supabase...");
		const { data, error } = await supabase
			.from("questions")
			.insert(transformedData)
			.select();

		if (error) {
			console.error("❌ Error inserting data:", error);
			throw error;
		}

		console.log(`✅ Successfully migrated ${data?.length || 0} questions!`);
		console.log("🎉 Migration completed successfully!");

		// Display summary
		console.log("\n📋 Migration Summary:");
		data?.forEach((q, index) => {
			const originalId =
				(q.content as any)?.original_id ||
				q.category?.split(":")[1] ||
				"unknown";
			console.log(
				`${index + 1}. ${originalId} - ${q.question_text?.substring(0, 50)}...`
			);
		});
	} catch (error) {
		console.error("💥 Migration failed:", error);
		process.exit(1);
	}
}

// Run the migration
if (require.main === module) {
	migrateQuizData().then(() => {
		console.log(
			"\n🏁 Migration script finished. You can now delete lib/quiz-data.ts if desired."
		);
		process.exit(0);
	});
}
