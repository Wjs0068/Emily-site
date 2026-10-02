export const sanityQueries = {
  siteSettings: `*[_type == "siteSettings" && _id == "siteSettings" && contentStatus == "OWNER_APPROVED"][0]{
    contentStatus, businessName, shortName, tagline, publicEmail, publicPhone,
    serviceAreas[]{placeName, placeType}, socialLinks[]{platform, url},
    bookingAvailability{contentStatus, eyebrow, status, headline, detail, "years": coalesce(years, bookingYears), lastReviewedAt},
    experienceStats[]{contentStatus, value, label, lastReviewedAt}, brandRecognition,
    previewLocation, inquiryIntro, responseTime, investmentNote
  }`,
  packages: `*[_type == "package" && active == true && contentStatus == "OWNER_APPROVED"] | order(sortOrder asc){
    contentStatus, name, "slug": slug.current, summary, startingPrice, currency,
    priceQualifier, "partySize": partySizeLabel, features, includesSecondArtist
  }`,
  addons: `*[_type == "addon" && active == true && contentStatus == "OWNER_APPROVED"] | order(sortOrder asc){
    contentStatus, name, description, pricingType, price, currency, displayQualifier
  }`,
  testimonials: `*[_type == "testimonial" && publicationPermission == true && contentStatus == "OWNER_APPROVED"] | order(sortOrder asc){
    contentStatus, quote, excerpt, clientName, venue, location, "source": sourceLabel, sourceUrl,
    publicationPermission, featured
  }`,
  galleryItems: `*[_type == "galleryItem" && contentStatus == "OWNER_APPROVED" && publicationPermission == true] | order(sortOrder asc){
    contentStatus, caption, styleCategory, venue, location, brideName, weddingDate, season, year,
    photographerName, photographerUrl,
    publicationPermission,
    "image": {"url": image.asset->url, "alt": image.alt, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height}
  }`,
  faq: `*[_type == "faq" && active == true && contentStatus == "OWNER_APPROVED"] | order(sortOrder asc){
    contentStatus, question, "answer": pt::text(answer), category, sortOrder, ownerDecisionKey
  }`,
  blogPosts: `*[_type == "blogPost" && contentStatus == "OWNER_APPROVED" && defined(publishedAt)] | order(publishedAt desc){
    contentStatus, "slug": slug.current, title, excerpt, "author": author.name,
    publishedAt, updatedAt, "category": coalesce(categories[0], "Journal"),
    "featuredImage": {"url": featuredImage.asset->url, "alt": featuredImage.alt, "width": featuredImage.asset->metadata.dimensions.width, "height": featuredImage.asset->metadata.dimensions.height},
    "body": body[]{
      "type": select(_type == "block" && style in ["h2", "h3"] => "heading", _type == "block" => "paragraph", _type == "image" => "image"),
      "level": select(style == "h3" => 3, 2),
      "text": select(_type == "block" => pt::text(@), null),
      "image": select(_type == "image" => {"url": asset->url, "alt": alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}, null),
      alt, caption
    },
    "relatedSlugs": body[_type == "block"].markDefs[_type == "internalLink"].reference->slug.current,
    "isDevelopmentSample": false
  }`,
} as const;
