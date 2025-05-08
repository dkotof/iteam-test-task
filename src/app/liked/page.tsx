'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout';
import { JobList } from '@/components/jobs';
import { Button } from '@/components/common';
import { useLikedJobs } from '@/hooks';

export default function LikedJobsPage() {
  const { likedJobs } = useLikedJobs();
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  // Sort jobs based on selected criteria
  const sortedJobs = [...likedJobs].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = a.job_posted_at_timestamp || 0;
      const dateB = b.job_posted_at_timestamp || 0;
      return dateB - dateA; // Sort by most recent first
    } else {
      return a.job_title.localeCompare(b.job_title); // Sort alphabetically
    }
  });

  return (
    <AppLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Liked Jobs</h1>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="date">Date (Newest first)</option>
              <option value="title">Job Title (A-Z)</option>
            </select>
          </div>
        </div>

        {likedJobs.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-gray-500 mb-4">You haven't liked any jobs yet.</p>
            <Link href="/jobs" passHref>
              <Button variant="primary">Browse Jobs</Button>
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              You have liked {likedJobs.length} job{likedJobs.length !== 1 && 's'}.
            </p>
            
            <JobList
              jobs={sortedJobs}
              emptyMessage="No liked jobs found."
            />
          </>
        )}
      </div>
    </AppLayout>
  );
} 