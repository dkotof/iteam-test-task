import { useLocalStorage } from './useLocalStorage';
import { Job } from '@/types';

// Custom hook for managing liked jobs stored in localStorage
export function useLikedJobs() {
  const [likedJobs, setLikedJobs] = useLocalStorage<Job[]>('likedJobs', []);

  // Add a job to liked jobs
  const addLikedJob = (job: Job) => {
    setLikedJobs((prev) => {
      // Check if job already exists in liked jobs
      const exists = prev.some((j) => j.job_id === job.job_id);
      if (exists) {
        return prev;
      }
      return [...prev, job];
    });
  };

  // Remove a job from liked jobs
  const removeLikedJob = (jobId: string) => {
    setLikedJobs((prev) => prev.filter((job) => job.job_id !== jobId));
  };

  // Check if a job is liked
  const isJobLiked = (jobId: string) => {
    return likedJobs.some((job) => job.job_id === jobId);
  };

  // Toggle like status for a job
  const toggleLikedJob = (job: Job) => {
    if (isJobLiked(job.job_id)) {
      removeLikedJob(job.job_id);
    } else {
      addLikedJob(job);
    }
  };

  return {
    likedJobs,
    addLikedJob,
    removeLikedJob,
    isJobLiked,
    toggleLikedJob,
  };
} 