import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/react';
import { apiFetch } from '@/lib/api';
import { mockProgress } from '@/lib/mock-data';
import type { ResourceProgress } from '@/types';

export function useResourceProgress() {
  const { getToken } = useAuth();

  const { data: progress = [], isLoading, error } = useQuery({
    queryKey: ['resource-progress'],
    queryFn: () => {
      if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL) {
        return Promise.resolve(mockProgress);
      }
      return apiFetch<ResourceProgress[]>('/resources/progress', getToken);
    },
  });

  return { progress, isLoading, error };
}
