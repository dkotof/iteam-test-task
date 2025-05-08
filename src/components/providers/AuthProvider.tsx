'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks';
import { AuthState } from '@/types';

// Create context
const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  // Fetch current user on mount
  useEffect(() => {
    if (auth.token && !auth.user) {
      auth.fetchCurrentUser();
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for accessing auth context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
} 