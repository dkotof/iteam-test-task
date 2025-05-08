import { useLocalStorage } from './useLocalStorage';
import { Profile } from '@/types';

// Custom hook for managing user profile stored in localStorage
export function useProfile() {
  const [profile, setProfile] = useLocalStorage<Profile | null>('userProfile', null);

  // Save or update profile
  const saveProfile = (profileData: Profile) => {
    setProfile(profileData);
  };

  // Clear profile
  const clearProfile = () => {
    setProfile(null);
  };

  // Check if profile exists
  const hasProfile = () => {
    return profile !== null;
  };

  return {
    profile,
    saveProfile,
    clearProfile,
    hasProfile,
  };
} 