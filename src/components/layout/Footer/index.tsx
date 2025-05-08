'use client';

export function Footer() {
  return (
    <footer className="bg-white shadow-sm border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} JobSearch. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 