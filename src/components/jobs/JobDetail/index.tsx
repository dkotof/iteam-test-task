import Image from 'next/image';
import { Button, Card, CardBody, CardHeader, CardFooter } from '@/components/common';
import { Job } from '@/types';
import { useLikedJobs } from '@/hooks';

interface JobDetailProps {
  job: Job;
}

export function JobDetail({ job }: JobDetailProps) {
  const { isJobLiked, toggleLikedJob } = useLikedJobs();
  const isLiked = isJobLiked(job.job_id);

  function formatDate(dateString?: string) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0 h-16 w-16 relative rounded overflow-hidden">
            {job.employer_logo ? (
              <Image 
                src={job.employer_logo} 
                alt={job.employer_name} 
                width={64} 
                height={64}
                className="object-contain" 
              />
            ) : (
              <div className="bg-gray-200 h-16 w-16 flex items-center justify-center rounded">
                <span className="text-gray-500 text-xl">{job.employer_name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.job_title}</h1>
            <div className="flex items-center mt-1">
              <span className="text-lg text-gray-700">{job.employer_name}</span>
              {job.employer_website && (
                <a 
                  href={job.employer_website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-indigo-600 text-sm hover:underline"
                >
                  Visit website
                </a>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Job Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Job Type</div>
                  <div className="mt-1 text-sm text-gray-900">{job.job_employment_type}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Location</div>
                  <div className="mt-1 text-sm text-gray-900">
                    {job.job_city ? `${job.job_city}, ${job.job_country}` : 'Not specified'}
                    {job.job_is_remote && ' (Remote available)'}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Posted On</div>
                  <div className="mt-1 text-sm text-gray-900">
                    {formatDate(job.job_posted_at_datetime_utc)}
                  </div>
                </div>
                {job.job_salary_min && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Salary Range</div>
                    <div className="mt-1 text-sm text-gray-900">
                      {job.job_salary_currency} {job.job_salary_min.toLocaleString()} - {job.job_salary_max?.toLocaleString() || 'N/A'} {job.job_salary_period && `/ ${job.job_salary_period}`}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
              <div className="prose prose-sm max-w-none text-gray-500" dangerouslySetInnerHTML={{ __html: job.job_description }} />
            </div>

            {job.job_highlights && Object.keys(job.job_highlights).length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Highlights</h2>
                
                {job.job_highlights.Qualifications && job.job_highlights.Qualifications.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-md font-medium text-gray-800 mb-2">Qualifications</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.job_highlights.Qualifications.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {job.job_highlights.Responsibilities && job.job_highlights.Responsibilities.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-md font-medium text-gray-800 mb-2">Responsibilities</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.job_highlights.Responsibilities.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {job.job_highlights.Benefits && job.job_highlights.Benefits.length > 0 && (
                  <div>
                    <h3 className="text-md font-medium text-gray-800 mb-2">Benefits</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.job_highlights.Benefits.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-medium text-gray-900 mb-4">Company Information</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500">Company Name</div>
                  <div className="mt-1 text-sm text-gray-900">{job.employer_name}</div>
                </div>
                {job.employer_company_type && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Company Type</div>
                    <div className="mt-1 text-sm text-gray-900">{job.employer_company_type}</div>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => toggleLikedJob(job)}
                  className="w-full"
                >
                  {isLiked ? '❤️ Remove from Liked' : '🤍 Add to Liked Jobs'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="bg-gray-50">
        <div className="flex justify-between">
          <Button variant="secondary" onClick={() => window.history.back()}>
            Back to Jobs
          </Button>
          <a 
            href={job.job_apply_link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="primary">
              Apply for This Job
            </Button>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
} 