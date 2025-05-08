import { backendApi } from '@/lib/axios';
import { User, Profile } from '@/types';

interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  error?: string;
}

// Register a new user
export const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  try {
    const response = await backendApi.post('/auth/register', {
      email,
      password,
      name
    });
    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error);
    return {
      success: false,
      token: '',
      user: {} as User,
      error: error.response?.data?.error || 'Failed to register'
    };
  }
};

// Login a user
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await backendApi.post('/auth/login', {
      email,
      password
    });
    return response.data;
  } catch (error: any) {
    console.error('Error logging in user:', error);
    return {
      success: false,
      token: '',
      user: {} as User,
      error: error.response?.data?.error || 'Failed to login'
    };
  }
};

// Get current user profile
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const response = await backendApi.get('/auth/profile');
    return response.data;
  } catch (error: any) {
    console.error('Error getting user profile:', error);
    return {
      success: false,
      token: '',
      user: {} as User,
      error: error.response?.data?.error || 'Failed to get profile'
    };
  }
};

// Update user profile
export const updateProfile = async (profile: Profile): Promise<AuthResponse> => {
  try {
    const response = await backendApi.put('/auth/profile', { profile });
    return response.data;
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return {
      success: false,
      token: '',
      user: {} as User,
      error: error.response?.data?.error || 'Failed to update profile'
    };
  }
}; 