export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			answers: {
				Row: {
					answer_text: string | null;
					created_at: string;
					id: string;
					is_correct: boolean;
					question_id: string | null;
				};
				Insert: {
					answer_text?: string | null;
					created_at?: string;
					id?: string;
					is_correct?: boolean;
					question_id?: string | null;
				};
				Update: {
					answer_text?: string | null;
					created_at?: string;
					id?: string;
					is_correct?: boolean;
					question_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "answers_question_id_fkey";
						columns: ["question_id"];
						referencedRelation: "questions";
						referencedColumns: ["id"];
					}
				];
			};
			questions: {
				Row: {
					category: string | null;
					content: Json | null;
					created_at: string;
					id: string;
					order_index: number | null;
					question_text: string | null;
					result: Json | null;
					updated_at: string | null;
				};
				Insert: {
					category?: string | null;
					content?: Json | null;
					created_at?: string;
					id?: string;
					order_index?: number | null;
					question_text?: string | null;
					result?: Json | null;
					updated_at?: string | null;
				};
				Update: {
					category?: string | null;
					content?: Json | null;
					created_at?: string;
					id?: string;
					order_index?: number | null;
					question_text?: string | null;
					result?: Json | null;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			scenario_images: {
				Row: {
					created_at: string;
					id: string;
					normal_image_url: string | null;
					question_id: string;
					result_image_url: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					normal_image_url?: string | null;
					question_id: string;
					result_image_url?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					normal_image_url?: string | null;
					question_id?: string;
					result_image_url?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "scenario_images_question_id_fkey";
						columns: ["question_id"];
						referencedRelation: "questions";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			get_questions_with_answers: {
				Args: Record<PropertyKey, never>;
				Returns: {
					id: string;
					question_text: string;
					category: string;
					order_index: number;
					content: Json;
					result: Json;
					created_at: string;
					updated_at: string;
					answers: Json;
					// MANUALLY ADDED THESE FIELDS
					normal_image_url: string;
					result_image_url: string;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};
