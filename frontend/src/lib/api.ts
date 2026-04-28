const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch<T>(
  path: string,
  getToken: () => Promise<string | null>,
  options: RequestInit = {},
): Promise<T> {
  if (!API_BASE) {
    throw new Error('VITE_API_BASE_URL is not configured');
  }

  const token = await getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.data as T;
}

export async function apiFetchBlob(
  path: string,
  getToken: () => Promise<string | null>,
  options: RequestInit = {},
): Promise<Blob> {
  if (!API_BASE) {
    throw new Error('VITE_API_BASE_URL is not configured');
  }

  const token = await getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    try {
      const json = JSON.parse(text) as { message?: string; error?: { message?: string } };
      throw new Error(json?.error?.message || json?.message || `HTTP ${res.status}`);
    } catch {
      throw new Error(text || `HTTP ${res.status}`);
    }
  }

  return await res.blob();
}

export interface StorageUrlResponse {
  bucket: string;
  path: string;
  is_paid: boolean;
  url: string;
  expires_in: number | null;
}

export function getPublicStorageUrl(
  params: { bucket: string; path: string },
  getToken: () => Promise<string | null>,
): Promise<StorageUrlResponse> {
  const encodedBucket = encodeURIComponent(params.bucket);
  const encodedPath = encodeURIComponent(params.path);
  return apiFetch<StorageUrlResponse>(`/storage/public-url?bucket=${encodedBucket}&path=${encodedPath}`, getToken);
}
