import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/common';

const SearchSchema = Yup.object().shape({
  query: Yup.string().required('Please enter a search term'),
});

interface SearchInputProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  placeholder?: string;
  buttonText?: string;
}

export function SearchInput({
  onSearch,
  initialQuery = '',
  placeholder = 'Search for jobs...',
  buttonText = 'Search',
}: SearchInputProps) {
  return (
    <Formik
      initialValues={{ query: initialQuery }}
      validationSchema={SearchSchema}
      onSubmit={(values) => {
        onSearch(values.query);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex w-full">
          <div className="flex-grow mr-2">
            <Field
              name="query"
              type="text"
              placeholder={placeholder}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.query && touched.query ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.query && touched.query && (
              <div className="mt-1 text-xs text-red-500">{errors.query}</div>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {buttonText}
          </Button>
        </Form>
      )}
    </Formik>
  );
} 