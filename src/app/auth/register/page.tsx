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

// Validation schema for the registration form
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser, isLoading, error } = useAuth();
  const [registerError, setRegisterError] = useState<string | null>(error);

  // Initial form values
  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Handle form submission
  const handleSubmit = async (values: RegisterFormValues) => {
    const { name, email, password } = values;
    const success = await registerUser(email, password, name);
    
    if (success) {
      router.push('/create-profile');
    } else {
      setRegisterError(error);
    }
  };

  return (
    <AppLayout>
      <div className="mb-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create an Account
        </h1>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-medium text-gray-900">
              Register
            </h2>
          </CardHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <CardBody>
                  {registerError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                      {registerError}
                    </div>
                  )}

                  <FormField
                    name="name"
                    label="Name"
                    placeholder="Enter your full name"
                  />

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
                    placeholder="Create a password"
                  />

                  <FormField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                  />
                </CardBody>
                <CardFooter className="flex flex-col">
                  <Button
                    type="submit"
                    fullWidth
                    disabled={isSubmitting || !isValid || isLoading}
                  >
                    {isLoading ? <Spinner size="sm" /> : 'Register'}
                  </Button>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-blue-600 hover:text-blue-700">
                      Log in
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