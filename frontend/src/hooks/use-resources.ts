import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/react';
import { apiFetch } from '@/lib/api';
import { mockResources } from '@/lib/mock-data';
import type { Resource } from '@/types';

export function useResources() {
  const { getToken } = useAuth();

  const { data: resources = [], isLoading, error } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      try {
        return await apiFetch<Resource[]>('/resources', getToken);
      } catch (err) {
        console.warn('Failed to fetch resources, using mock data:', err);
        return mockResources;
      }
    },
  });

  return { resources, isLoading, error };
}
