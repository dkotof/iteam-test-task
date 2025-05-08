'use client';

import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/layout';
import { JobDetail } from '@/components/jobs';
import { Spinner } from '@/components/common';
import { useJobDetails } from '@/hooks';

export default function JobDetailsPage() {
  const { id } = useParams();
  const jobId = Array.isArray(id) ? id[0] : id;
  
  const { job, isLoading, isError } = useJobDetails(jobId);

  return (
    <AppLayout>
      <div className="mb-8">
        {isLoading ? (
          <div className="py-10">
            <Spinner size="lg" className="mx-auto" />
          </div>
        ) : isError ? (
          <div className="py-10 text-center">
            <div className="text-red-500 mb-2">Error loading job details</div>
            <div className="text-sm text-gray-500">
              {isError.message || 'An unexpected error occurred'}
            </div>
          </div>
        ) : !job ? (
          <div className="py-10 text-center">
            <div className="text-gray-500">Job not found</div>
          </div>
        ) : (
          <JobDetail job={job} />
        )}
      </div>
    </AppLayout>
  );
} 