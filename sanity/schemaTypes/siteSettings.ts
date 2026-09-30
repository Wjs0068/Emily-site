import { defineArrayMember, defineField, defineType } from 'sanity';

import { contentStatusField } from './fields/contentStatus';

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    contentStatusField,
    defineField({
      name: 'businessName',
      title: 'Business name',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'shortName',
      title: 'Short name',
      type: 'string',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'publicEmail',
      title: 'Public email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({ name: 'publicPhone', title: 'Public phone', type: 'string' }),
    defineField({
      name: 'serviceAreas',
      title: 'Service areas',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'serviceArea',
          type: 'object',
          fields: [
            defineField({
              name: 'placeName',
              title: 'Place name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'placeType',
              title: 'Place type',
              type: 'string',
              options: {
                list: [
                  { title: 'City', value: 'city' },
                  { title: 'Region', value: 'region' },
                  { title: 'State', value: 'state' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'placeName', subtitle: 'placeType' } },
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Verified social links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'socialLink',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Verified URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
            }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({
      name: 'bookingAvailability',
      title: 'Booking availability',
      type: 'object',
      fields: [
        defineField({
          name: 'contentStatus',
          title: 'Availability status',
          type: 'string',
          description: 'Availability must be confirmed separately because it changes over time.',
          options: {
            layout: 'radio',
            list: [
              { title: 'Owner approved', value: 'OWNER_APPROVED' },
              { title: 'Development sample', value: 'DEVELOPMENT_SAMPLE' },
              { title: 'Unresolved', value: 'UNRESOLVED' },
            ],
          },
          initialValue: 'UNRESOLVED',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Current availability',
          validation: (Rule) => Rule.required().max(50),
        }),
        defineField({
          name: 'status',
          title: 'Status',
          type: 'string',
          options: {
            list: [
              { title: 'Open', value: 'open' },
              { title: 'Limited', value: 'limited' },
              { title: 'Waitlist', value: 'waitlist' },
              { title: 'Closed', value: 'closed' },
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required().max(100),
        }),
        defineField({ name: 'detail', title: 'Detail', type: 'text', rows: 3 }),
        defineField({
          name: 'years',
          title: 'Booking years',
          type: 'array',
          of: [defineArrayMember({ type: 'number' })],
          validation: (Rule) => Rule.unique(),
        }),
        defineField({
          name: 'lastReviewedAt',
          title: 'Last reviewed',
          type: 'date',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: false }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
          validation: (Rule) => Rule.max(140),
        }),
        defineField({ name: 'link', title: 'Internal link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'experienceStats',
      title: 'Experience statistics',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'experienceStat',
          type: 'object',
          fields: [
            defineField({
              name: 'contentStatus',
              title: 'Statistic status',
              type: 'string',
              options: {
                layout: 'radio',
                list: [
                  { title: 'Owner approved', value: 'OWNER_APPROVED' },
                  { title: 'Development sample', value: 'DEVELOPMENT_SAMPLE' },
                  { title: 'Unresolved', value: 'UNRESOLVED' },
                ],
              },
              initialValue: 'UNRESOLVED',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'lastReviewedAt', title: 'Last reviewed', type: 'date' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),
    defineField({
      name: 'brandRecognition',
      title: 'Brand recognition',
      description: 'Optional. Do not name brands until Emily confirms the claim and wording.',
      type: 'object',
      fields: [
        defineField({
          name: 'contentStatus',
          title: 'Content status',
          type: 'string',
          options: {
            layout: 'radio',
            list: [
              { title: 'Owner approved', value: 'OWNER_APPROVED' },
              { title: 'Development sample', value: 'DEVELOPMENT_SAMPLE' },
              { title: 'Unresolved', value: 'UNRESOLVED' },
            ],
          },
          initialValue: 'UNRESOLVED',
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'text', title: 'Wording', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'previewLocation',
      title: 'Public preview location',
      description: 'City-level public location only. Never enter a private home address.',
      type: 'object',
      fields: [
        defineField({
          name: 'contentStatus',
          title: 'Content status',
          type: 'string',
          options: {
            layout: 'radio',
            list: [
              { title: 'Owner approved', value: 'OWNER_APPROVED' },
              { title: 'Development sample', value: 'DEVELOPMENT_SAMPLE' },
              { title: 'Unresolved', value: 'UNRESOLVED' },
            ],
          },
          initialValue: 'UNRESOLVED',
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'name', title: 'Location name', type: 'string' }),
        defineField({ name: 'locality', title: 'City', type: 'string' }),
        defineField({ name: 'region', title: 'State', type: 'string' }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'titleTemplate',
          title: 'Title template',
          type: 'string',
          validation: (Rule) => Rule.required().max(65),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required().min(70).max(160),
        }),
        defineField({
          name: 'socialImage',
          title: 'Default social image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({ name: 'inquiryIntro', title: 'Inquiry introduction', type: 'text', rows: 4 }),
    defineField({ name: 'responseTime', title: 'Response time', type: 'string' }),
    defineField({ name: 'investmentNote', title: 'Investment note', type: 'text', rows: 3 }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
});
