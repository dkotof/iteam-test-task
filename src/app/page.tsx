'use client';

import Link from 'next/link';
import { AppLayout } from '@/components/layout';
import { useAuthContext } from '@/components/providers';

export default function Home() {
  const { isAuthenticated, user } = useAuthContext();

  return (
    <AppLayout>
      <div className="text-center py-12">
        <div className="bg-blue-50 text-gray-800 py-16 px-4 rounded-lg mb-12 shadow-sm">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Find Your Next</span>
            <span className="block text-blue-600">Dream Job</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Search thousands of job listings, save your favorites, and apply with ease. Your next career move starts here.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/jobs"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 focus:outline-none md:py-4 md:text-lg md:px-10"
              >
                Search Jobs
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              {isAuthenticated ? (
                <Link
                  href="/create-profile"
                  className="w-full flex items-center justify-center px-8 py-3 border border-blue-300 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none md:py-4 md:text-lg md:px-10"
                >
                  {user?.profile ? 'Update Profile' : 'Create Profile'}
                </Link>
              ) : (
                <Link
                  href="/auth/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-blue-300 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none md:py-4 md:text-lg md:px-10"
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      
        <div className="py-12 bg-white rounded-lg shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to find your next job
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-xl font-medium text-gray-900">Job Search</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Search for jobs by title, skills, or keywords and find the perfect match for your career goals.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-xl font-medium text-gray-900">Save Favorites</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Like jobs that interest you and build a collection of opportunities to review later.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-xl font-medium text-gray-900">Personalized Recommendations</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Create your profile and get job recommendations tailored to your skills and interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
