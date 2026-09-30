export type JsonLd = Record<string, unknown>;

export function businessSchema(siteUrl?: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HairSalon'],
    name: "Em's Bridal Hair",
    ...(siteUrl ? { url: siteUrl } : {}),
    description:
      'Romantic, effortless bridal hairstyling for weddings in Denver and across Colorado.',
    areaServed: [
      { '@type': 'City', name: 'Denver' },
      { '@type': 'State', name: 'Colorado' },
    ],
    serviceType: 'Bridal hairstyling',
  };
}

export function serviceSchema(siteUrl?: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Bridal hairstyling',
    description:
      'On-location bridal hairstyling packages, previews, timeline planning, and styling guidance.',
    provider: {
      '@type': ['LocalBusiness', 'HairSalon'],
      name: "Em's Bridal Hair",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    areaServed: { '@type': 'State', name: 'Colorado' },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface BlogPostingSchemaInput {
  headline: string;
  description: string;
  authorName: string;
  datePublished: string;
  dateModified?: string;
  url?: string;
  image?: string;
}

export function blogPostingSchema({
  headline,
  description,
  authorName,
  datePublished,
  dateModified,
  url,
  image,
}: BlogPostingSchemaInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: "Em's Bridal Hair",
    },
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    ...(url ? { mainEntityOfPage: { '@type': 'WebPage', '@id': url } } : {}),
    ...(image ? { image } : {}),
  };
}
