import { defineField, defineType } from 'sanity';

import { contentStatusField } from './fields/contentStatus';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    contentStatusField,
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required().max(900),
    }),
    defineField({
      name: 'clientName',
      title: 'Client name',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({ name: 'venue', title: 'Wedding venue', type: 'string' }),
    defineField({ name: 'location', title: 'Wedding location', type: 'string' }),
    defineField({ name: 'weddingDate', title: 'Wedding date', type: 'date' }),
    defineField({
      name: 'image',
      title: 'Image',
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
    defineField({ name: 'sourceLabel', title: 'Source label', type: 'string' }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'publicationPermission',
      title: 'Publication permission confirmed',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) =>
        Rule.required().custom(
          (permission) => permission === true || 'Confirm permission before publishing.',
        ),
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: { select: { title: 'clientName', subtitle: 'location', media: 'image' } },
});
