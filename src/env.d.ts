/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
/// <reference types="@cloudflare/workers-types" />

interface Window {
  _HB_?: {
    pid?: string;
  };
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}
