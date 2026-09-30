/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
/// <reference types="@cloudflare/workers-types" />

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}
