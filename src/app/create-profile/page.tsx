'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AppLayout } from '@/components/layout';
import { FormField } from '@/components/forms';
import { Button, Card, CardHeader, CardBody, CardFooter, Spinner } from '@/components/common';
import { useAuth } from '@/hooks';
import { Profile } from '@/types';

// Validation schema for the profile form
const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  desiredJobTitle: Yup.string().required('Desired job title is required'),
  aboutMe: Yup.string().required('About me is required').min(20, 'Please provide at least 20 characters'),
});

export default function CreateProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, error, updateUserProfile } = useAuth();
  const [profileError, setProfileError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Initial form values - use user profile if available
  const initialValues: Profile = user?.profile || {
    name: user?.name || '',
    desiredJobTitle: '',
    aboutMe: '',
  };

  // Handle form submission
  const handleSubmit = async (values: Profile) => {
    const success = await updateUserProfile(values);
    
    if (success) {
      router.push('/jobs');
    } else {
      setProfileError(error || 'Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {user?.profile ? 'Update Your Profile' : 'Create Your Profile'}
        </h1>

        <p className="text-gray-500 mb-6">
          {user?.profile 
            ? 'Update your profile information to get more relevant job recommendations.'
            : 'Set up your profile to get personalized job recommendations based on your preferences.'}
        </p>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-medium text-gray-900">
              Profile Information
            </h2>
          </CardHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <CardBody>
                  {profileError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                      {profileError}
                    </div>
                  )}

                  <FormField
                    name="name"
                    label="Your Name"
                    placeholder="Enter your full name"
                  />

                  <FormField
                    name="desiredJobTitle"
                    label="Desired Job Title"
                    placeholder="e.g. Frontend Developer, UX Designer, Project Manager"
                  />

                  <FormField
                    name="aboutMe"
                    label="About Me"
                    as="textarea"
                    rows={5}
                    placeholder="Tell us about your skills, experience, and what you're looking for in your next role"
                  />
                </CardBody>
                <CardFooter className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isValid || isLoading}
                  >
                    {isLoading ? <Spinner size="sm" /> : user?.profile ? 'Update Profile' : 'Create Profile'}
                  </Button>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </AppLayout>
  );
} 