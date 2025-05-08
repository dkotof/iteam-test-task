'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AppLayout } from '@/components/layout';
import { FormField } from '@/components/forms';
import { Button, Card, CardHeader, CardBody, CardFooter, Spinner } from '@/components/common';
import { useAuth } from '@/hooks';

// Validation schema for the login form
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, isLoading, error } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(error);

  // Initial form values
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  // Handle form submission
  const handleSubmit = async (values: LoginFormValues) => {
    const { email, password } = values;
    const success = await loginUser(email, password);
    
    if (success) {
      router.push('/jobs');
    } else {
      setLoginError(error);
    }
  };

  return (
    <AppLayout>
      <div className="mb-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Welcome Back
        </h1>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-medium text-gray-900">
              Log In
            </h2>
          </CardHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <CardBody>
                  {loginError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                      {loginError}
                    </div>
                  )}

                  <FormField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                  />

                  <FormField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </CardBody>
                <CardFooter className="flex flex-col">
                  <Button
                    type="submit"
                    fullWidth
                    disabled={isSubmitting || !isValid || isLoading}
                  >
                    {isLoading ? <Spinner size="sm" /> : 'Log In'}
                  </Button>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/auth/register" className="text-blue-600 hover:text-blue-700">
                      Register
                    </Link>
                  </div>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </AppLayout>
  );
} 