import { Job } from '@/types';
import { JobCard } from '../JobCard';
import { Spinner } from '@/components/common';

interface JobListProps {
  jobs: Job[];
  isLoading?: boolean;
  error?: any;
  emptyMessage?: string;
}

export function JobList({
  jobs,
  isLoading = false,
  error = null,
  emptyMessage = 'No jobs found. Try a different search.',
}: JobListProps) {
  if (isLoading) {
    return (
      <div className="py-10">
        <Spinner size="lg" className="mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <div className="text-red-500 mb-2">Error loading jobs</div>
        <div className="text-sm text-gray-500">{error.message || 'An unexpected error occurred'}</div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="py-10 text-center">
        <div className="text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.job_id} job={job} />
      ))}
    </div>
  );
} 