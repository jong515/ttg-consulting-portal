import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/react';
import { apiFetch } from '@/lib/api';
import { mockProgress } from '@/lib/mock-data';
import type { ResourceProgress } from '@/types';

export function useResourceProgress() {
  const { getToken } = useAuth();

  const { data: progress = [], isLoading, error } = useQuery({
    queryKey: ['resource-progress'],
    queryFn: async () => {
      try {
        return await apiFetch<ResourceProgress[]>(
          '/resources/progress',
          getToken,
        );
      } catch (err) {
        console.warn(
          'Failed to fetch resource progress, using mock data:',
          err,
        );
        return mockProgress;
      }
    },
  });

  return { progress, isLoading, error };
}
