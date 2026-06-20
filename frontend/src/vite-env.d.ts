/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_MODE?: string;
  readonly VITE_CLERK_PUBLISHABLE_KEY?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_DEV_BEARER_TOKEN?: string;
  /** Optional Mux Data environment key when required by your Mux project. */
  readonly VITE_MUX_ENV_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
