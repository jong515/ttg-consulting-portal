const PUBLIC_ASSETS_BUCKET = 'public-assets';

export function publicStorageUrl(objectPath: string): string {
  const raw = import.meta.env.VITE_SUPABASE_URL;
  if (!raw?.trim()) {
    return '';
  }
  const base = raw.replace(/\/+$/, '');
  const path = objectPath.replace(/^\/+/, '');
  return `${base}/storage/v1/object/public/${PUBLIC_ASSETS_BUCKET}/${path}`;
}
