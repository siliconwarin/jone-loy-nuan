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
			questions: {
				Row: {
					answers: Json;
					category: string | null;
					content: Json;
					created_at: string;
					id: string;
					order_index: number | null;
					question_text: string | null;
					red_flags: string[] | null;
					result: Json;
					updated_at: string | null;
				};
				Insert: {
					answers: Json;
					category?: string | null;
					content: Json;
					created_at?: string;
					id: string;
					order_index?: number | null;
					question_text?: string | null;
					red_flags?: string[] | null;
					result: Json;
					updated_at?: string | null;
				};
				Update: {
					answers?: Json;
					category?: string | null;
					content?: Json;
					created_at?: string;
					id?: string;
					order_index?: number | null;
					question_text?: string | null;
					red_flags?: string[] | null;
					result?: Json;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			scenario_images: {
				Row: {
					id: string;
					created_at: string;
					scenario_id: string;
					variant: string;
					file_path: string;
				};
				Insert: {
					id?: string;
					created_at?: string;
					scenario_id: string;
					variant: string;
					file_path: string;
				};
				Update: {
					id?: string;
					created_at?: string;
					scenario_id?: string;
					variant?: string;
					file_path?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			get_questions_with_images: {
				Args: Record<PropertyKey, never>;
				Returns: {
					id: string;
					created_at: string;
					updated_at: string | null;
					question_text: string | null;
					category: string | null;
					order_index: number | null;
					content: Json;
					answers: Json;
					result: Json;
					red_flags: string[] | null;
					normal_image_url: string | null;
					result_image_url: string | null;
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
