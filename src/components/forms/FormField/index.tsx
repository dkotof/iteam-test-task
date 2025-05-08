import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Field, ErrorMessage } from 'formik';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

export function FormField({
  name,
  label,
  type = 'text',
  placeholder = '',
  className = '',
  as = 'input',
  rows = 3,
}: FormFieldProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {as === 'input' ? (
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      ) : (
        <Field
          id={name}
          name={name}
          as="textarea"
          rows={rows}
          placeholder={placeholder}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      )}
      <ErrorMessage name={name} component="div" className="mt-1 text-sm text-red-600" />
    </div>
  );
} 