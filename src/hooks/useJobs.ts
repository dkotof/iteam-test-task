import useSWR from 'swr';
import { searchJobs, getJobDetails, getJobRecommendations } from '@/services/jobService';
import { Job } from '@/types';

// Custom hook for searching jobs
export function useJobSearch(query: string, page: number = 1, num_pages: number = 1) {
  const { data, error, isLoading, mutate } = useSWR(
    query ? `jobs/search/${query}/${page}/${num_pages}` : null,
    () => searchJobs(query, page, num_pages),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    jobs: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Custom hook for fetching job details
export function useJobDetails(jobId: string | null) {
  const { data, error, isLoading } = useSWR(
    jobId ? `jobs/details/${jobId}` : null,
    () => jobId ? getJobDetails(jobId) : null,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    job: data?.data?.[0] as Job | undefined,
    isLoading,
    isError: error,
  };
}

// Custom hook for fetching job recommendations based on profile
export function useJobRecommendations(jobTitle: string | null, page: number = 1, num_pages: number = 1) {
  const { data, error, isLoading } = useSWR(
    jobTitle ? `jobs/recommendations/${jobTitle}/${page}/${num_pages}` : null,
    () => jobTitle ? getJobRecommendations(jobTitle, page, num_pages) : null,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    jobs: data?.data || [],
    isLoading,
    isError: error,
  };
} 