-- First, drop the existing function if it exists, to allow changing the return signature.
DROP FUNCTION IF EXISTS get_questions_with_answers();
-- Create a function to fetch questions along with their answers aggregated as a JSON array.
-- This simplifies data fetching on the client-side, as we can get a question and all its answers in a single query.
CREATE OR REPLACE FUNCTION get_questions_with_answers() RETURNS TABLE (
        id UUID,
        question_text TEXT,
        category TEXT,
        order_index INT,
        content JSONB,
        result JSONB,
        created_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ,
        answers JSONB,
        normal_image_url TEXT,
        result_image_url TEXT
    ) AS $$ BEGIN RETURN QUERY
SELECT q.id,
    q.question_text,
    q.category,
    q.order_index,
    q.content,
    q.result,
    q.created_at,
    q.updated_at,
    -- Aggregate answers for each question into a single JSON array.
    -- If a question has no answers, this will result in an empty JSON array '[]'.
    COALESCE(
        (
            SELECT jsonb_agg(
                    jsonb_build_object(
                        'id',
                        a.id,
                        'text',
                        a.answer_text,
                        'isCorrect',
                        a.is_correct
                    )
                    ORDER BY a.created_at
                )
            FROM public.answers a
            WHERE a.question_id = q.id
        ),
        '[]'::jsonb
    ) AS answers,
    -- Join with scenario_images to get image URLs
    si.normal_image_url,
    si.result_image_url
FROM public.questions q
    LEFT JOIN public.scenario_images si ON q.id = si.question_id;
END;
$$ LANGUAGE plpgsql;