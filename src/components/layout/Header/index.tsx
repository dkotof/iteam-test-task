'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks';

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user, logoutUser } = useAuth();

  // Navigation items for all users
  const navItems = [
    { label: 'Jobs', href: '/jobs' },
    { label: 'Liked Jobs', href: '/liked' },
  ];

  // Profile link is only shown when user is authenticated
  if (isAuthenticated) {
    navItems.push({ label: 'Profile', href: '/create-profile' });
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                JobSearch
              </Link>
            </div>
            <nav className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Hello, {user?.name || 'User'}
                </span>
                <button
                  onClick={logoutUser}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/auth/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 