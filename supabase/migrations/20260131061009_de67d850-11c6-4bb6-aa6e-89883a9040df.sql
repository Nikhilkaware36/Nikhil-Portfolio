-- Create table to cache profile data from GitHub
CREATE TABLE public.profile_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL, -- 'github', 'linkedin', etc.
  username TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(platform, username)
);

-- Enable RLS but allow public read access (it's a portfolio)
ALTER TABLE public.profile_data ENABLE ROW LEVEL SECURITY;

-- Anyone can read profile data (public portfolio)
CREATE POLICY "Profile data is publicly readable" 
ON public.profile_data 
FOR SELECT 
USING (true);

-- Only edge functions can insert/update (via service role)
-- No additional policies needed as service role bypasses RLS