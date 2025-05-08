import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardFooter, Button } from '@/components/common';
import { Job } from '@/types';
import { useLikedJobs } from '@/hooks';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const { isJobLiked, toggleLikedJob } = useLikedJobs();
  const isLiked = isJobLiked(job.job_id);

  return (
    <Card className="h-full flex flex-col bg-white border border-gray-100">
      <CardBody className="flex-grow">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 h-12 w-12 relative overflow-hidden rounded">
            {job.employer_logo ? (
              <Image 
                src={job.employer_logo} 
                alt={job.employer_name}
                width={48}
                height={48}
                className="object-contain"
              />
            ) : (
              <div className="bg-gray-100 h-12 w-12 flex items-center justify-center rounded">
                <span className="text-gray-600 text-sm">{job.employer_name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-medium text-gray-800 truncate">{job.job_title}</h3>
            <p className="text-sm text-gray-600">{job.employer_name}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                {job.job_employment_type}
              </span>
              {job.job_is_remote && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  Remote
                </span>
              )}
              {job.job_city && job.job_country && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                  {job.job_city}, {job.job_country}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 line-clamp-3">
            {job.job_description?.substring(0, 150)}...
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between bg-gray-50">
        <Link href={`/job-details/${job.job_id}`} passHref>
          <Button variant="primary" size="sm">
            View Details
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleLikedJob(job)}
          aria-label={isLiked ? 'Remove from liked jobs' : 'Add to liked jobs'}
        >
          {isLiked ? '❤️ Liked' : '🤍 Like'}
        </Button>
      </CardFooter>
    </Card>
  );
} 