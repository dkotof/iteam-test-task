export interface User {
  id: string;
  email: string;
  name?: string;
  profile?: {
    name: string;
    desiredJobTitle: string;
    aboutMe: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
} 