-- Step 1: Create the new 'answers' table
CREATE TABLE public.answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);
-- Step 2: Enable Row Level Security
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
-- Step 3: Create RLS policies
-- Allow public read access for everyone
CREATE POLICY "Allow public read access" ON public.answers FOR
SELECT USING (true);
-- Allow authenticated users OR the service_role to insert data
CREATE POLICY "Allow insert for auth users or service role" ON public.answers FOR
INSERT WITH CHECK (
        auth.role() = 'authenticated'
        OR auth.role() = 'service_role'
    );
-- The policies below are commented out because they depend on a `user_id` column
-- which does not exist in the `answers` table.
-- CREATE POLICY "Allow update for users based on user_id" ON public.answers FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- CREATE POLICY "Allow delete for users based on user_id" ON public.answers FOR DELETE USING (auth.uid() = user_id);
-- Step 4: Alter the 'questions' table to remove the 'answers' JSON column
ALTER TABLE public.questions DROP COLUMN answers;
-- Step 5: (Optional but Recommended) Create an index on the foreign key for performance
CREATE INDEX idx_answers_question_id ON public.answers(question_id);
-- Note: The ON DELETE CASCADE on the foreign key means that if a question is deleted,
-- all of its associated answers will be automatically deleted as well.
-- This simplifies the delete logic in our application.