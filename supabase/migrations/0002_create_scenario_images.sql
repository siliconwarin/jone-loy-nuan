-- Create the 'scenario_images' table to store URLs of images in Supabase Storage.
CREATE TABLE public.scenario_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    variant TEXT NOT NULL CHECK (variant IN ('normal', 'result')),
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ,
    -- Ensure that each question can only have one 'normal' and one 'result' image.
    CONSTRAINT unique_question_variant UNIQUE (question_id, variant)
);
-- Enable Row Level Security
ALTER TABLE public.scenario_images ENABLE ROW LEVEL SECURITY;
-- RLS Policies
-- Allow public read access for everyone.
CREATE POLICY "Allow public read access" ON public.scenario_images FOR
SELECT USING (true);
-- Allow authenticated users or service_role to insert/update/delete.
CREATE POLICY "Allow all access for auth users or service role" ON public.scenario_images FOR ALL USING (
    auth.role() = 'authenticated'
    OR auth.role() = 'service_role'
) WITH CHECK (
    auth.role() = 'authenticated'
    OR auth.role() = 'service_role'
);
-- Create an index on the foreign key for better performance.
CREATE INDEX idx_scenario_images_question_id ON public.scenario_images(question_id);