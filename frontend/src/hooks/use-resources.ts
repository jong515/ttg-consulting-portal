import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/react';
import { apiFetch } from '@/lib/api';
import { mockResources } from '@/lib/mock-data';
import type { Resource } from '@/types';

export function useResources() {
  const { getToken } = useAuth();

  const { data: resources = [], isLoading, error } = useQuery({
    queryKey: ['resources'],
    queryFn: () => {
      if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL) {
        return Promise.resolve(mockResources);
      }
      return apiFetch<Resource[]>('/resources', getToken);
    },
  });

  return { resources, isLoading, error };
}
