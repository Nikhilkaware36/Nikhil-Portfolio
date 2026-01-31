import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GitHubProfile {
  profile: {
    username: string;
    name: string;
    avatar: string;
    bio: string;
    location: string;
    company: string;
    blog: string;
    url: string;
  };
  stats: {
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
    totalForks: number;
  };
  languages: string[];
  recentRepos: {
    name: string;
    description: string;
    url: string;
    stars: number;
    forks: number;
    language: string;
    topics: string[];
  }[];
  fetchedAt: string;
}

const GITHUB_USERNAME = 'Nikhilkaware36';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const useGitHubProfile = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // First, check cache in database
        const { data: cachedData } = await supabase
          .from('profile_data')
          .select('data, last_updated')
          .eq('platform', 'github')
          .eq('username', GITHUB_USERNAME.toLowerCase())
          .single();

        const now = new Date().getTime();
        const lastUpdated = cachedData?.last_updated 
          ? new Date(cachedData.last_updated).getTime() 
          : 0;

        // Use cache if fresh (less than 1 hour old)
        if (cachedData && (now - lastUpdated) < CACHE_DURATION) {
          console.log('Using cached GitHub profile');
          setProfile(cachedData.data as unknown as GitHubProfile);
          setLoading(false);
          return;
        }

        // Fetch fresh data from edge function
        console.log('Fetching fresh GitHub profile');
        const { data, error } = await supabase.functions.invoke('fetch-github-profile', {
          body: { username: GITHUB_USERNAME }
        });

        if (error) throw error;

        setProfile(data as GitHubProfile);
      } catch (err) {
        console.error('Error fetching GitHub profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch profile');
        
        // Try to use stale cache if available
        const { data: staleCache } = await supabase
          .from('profile_data')
          .select('data')
          .eq('platform', 'github')
          .eq('username', GITHUB_USERNAME.toLowerCase())
          .single();
        
        if (staleCache) {
          setProfile(staleCache.data as unknown as GitHubProfile);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-github-profile', {
        body: { username: GITHUB_USERNAME }
      });
      if (error) throw error;
      setProfile(data as GitHubProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh');
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, refresh };
};