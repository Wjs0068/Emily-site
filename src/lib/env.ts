import { z } from 'zod';

const publicEnvSchema = z.object({
  PUBLIC_SITE_URL: z.url().optional().or(z.literal('')),
  PUBLIC_SANITY_PROJECT_ID: z.string().min(1).optional().or(z.literal('')),
  PUBLIC_SANITY_DATASET: z.string().min(1).default('production'),
  PUBLIC_HONEYBOOK_FORM_URL: z.url().optional().or(z.literal('')),
  PUBLIC_CONTACT_EMAIL: z.email().optional().or(z.literal('')),
  PUBLIC_GA_MEASUREMENT_ID: z
    .string()
    .regex(/^G-[A-Z0-9]+$/)
    .optional()
    .or(z.literal('')),
  PUBLIC_SHOW_JOURNAL: z.enum(['true', 'false']).default('false'),
});

const buildEnvSchema = z.object({
  CONTENT_MODE: z.enum(['development', 'production']).default('development'),
  INQUIRY_PROVIDER: z.enum(['unconfirmed', 'honeybook']).default('unconfirmed'),
  PRIVACY_POLICY_STATUS: z.enum(['DRAFT', 'OWNER_APPROVED']).default('DRAFT'),
});

export const publicEnv = publicEnvSchema.parse({
  PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL,
  PUBLIC_SANITY_PROJECT_ID: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET: import.meta.env.PUBLIC_SANITY_DATASET,
  PUBLIC_HONEYBOOK_FORM_URL: import.meta.env.PUBLIC_HONEYBOOK_FORM_URL,
  PUBLIC_CONTACT_EMAIL: import.meta.env.PUBLIC_CONTACT_EMAIL,
  PUBLIC_GA_MEASUREMENT_ID: import.meta.env.PUBLIC_GA_MEASUREMENT_ID,
  PUBLIC_SHOW_JOURNAL: import.meta.env.PUBLIC_SHOW_JOURNAL,
});

export const buildEnv = buildEnvSchema.parse({
  CONTENT_MODE: import.meta.env.CONTENT_MODE,
  INQUIRY_PROVIDER: import.meta.env.INQUIRY_PROVIDER,
  PRIVACY_POLICY_STATUS: import.meta.env.PRIVACY_POLICY_STATUS,
});

export const isProductionContent = buildEnv.CONTENT_MODE === 'production';

if (isProductionContent) {
  const missing = [
    !publicEnv.PUBLIC_SITE_URL && 'PUBLIC_SITE_URL',
    !publicEnv.PUBLIC_SANITY_PROJECT_ID && 'PUBLIC_SANITY_PROJECT_ID',
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new Error(`Production content validation failed. Missing: ${missing.join(', ')}.`);
  }

  if (buildEnv.INQUIRY_PROVIDER !== 'honeybook' || !publicEnv.PUBLIC_HONEYBOOK_FORM_URL) {
    throw new Error(
      'Production inquiry validation failed. Confirm HoneyBook with INQUIRY_PROVIDER=honeybook and set PUBLIC_HONEYBOOK_FORM_URL.',
    );
  }

  if (buildEnv.PRIVACY_POLICY_STATUS !== 'OWNER_APPROVED') {
    throw new Error(
      'Production privacy validation failed. Set PRIVACY_POLICY_STATUS=OWNER_APPROVED only after owner/legal review.',
    );
  }
}
