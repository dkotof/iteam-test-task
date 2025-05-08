'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout';
import { SearchInput } from '@/components/forms';
import { JobList } from '@/components/jobs';
import { useJobSearch, useJobRecommendations, useProfile } from '@/hooks';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { profile, hasProfile } = useProfile();
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Fetch jobs based on search query
  const { jobs: searchResults, isLoading: isSearchLoading, isError: searchError } = useJobSearch(searchQuery);
  
  // Fetch job recommendations based on user's profile (if available)
  const { jobs: recommendedJobs, isLoading: isRecommendationsLoading, isError: recommendationsError } = 
    useJobRecommendations(showRecommendations && profile?.desiredJobTitle ? profile.desiredJobTitle : null);

  // Check if we should show recommendations when page loads
  useEffect(() => {
    if (hasProfile() && !searchQuery) {
      setShowRecommendations(true);
    } else {
      setShowRecommendations(false);
    }
  }, [hasProfile, searchQuery, profile]);

  // Handle search submission
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowRecommendations(false);
  };

  // Handle showing recommendations
  const handleShowRecommendations = () => {
    setSearchQuery('');
    setShowRecommendations(true);
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Jobs</h1>

        <div className="mb-6">
          <SearchInput onSearch={handleSearch} />
        </div>

        {hasProfile() && (
          <div className="flex items-center mb-6">
            <div className="text-sm text-gray-500 mr-2">
              {showRecommendations ? (
                <>Showing recommendations based on your profile: <span className="font-medium">{profile?.desiredJobTitle}</span></>
              ) : (
                <>Looking for something specific?</>
              )}
            </div>
            <button
              onClick={handleShowRecommendations}
              className="text-sm text-indigo-600 hover:text-indigo-800 ml-auto"
              disabled={showRecommendations}
            >
              {showRecommendations ? 'Currently showing recommendations' : 'Show recommendations'}
            </button>
          </div>
        )}

        {showRecommendations ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recommended Jobs for {profile?.name}
            </h2>
            <JobList 
              jobs={recommendedJobs} 
              isLoading={isRecommendationsLoading} 
              error={recommendationsError}
              emptyMessage="No recommendations found. Try updating your profile with more specific job titles."
            />
          </>
        ) : (
          <>
            {searchQuery && (
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Search Results for "{searchQuery}"
              </h2>
            )}
            <JobList 
              jobs={searchResults} 
              isLoading={isSearchLoading} 
              error={searchError}
              emptyMessage={searchQuery ? `No jobs found for "${searchQuery}". Try a different search term.` : "Use the search bar to find jobs."}
            />
          </>
        )}
      </div>
    </AppLayout>
  );
} 