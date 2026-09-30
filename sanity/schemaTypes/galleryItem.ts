import { defineField, defineType } from 'sanity';

import { contentStatusField } from './fields/contentStatus';

export default defineType({
  name: 'galleryItem',
  title: 'Gallery item',
  type: 'document',
  fields: [
    contentStatusField,
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Contextual alt text',
          type: 'string',
          validation: (Rule) => Rule.required().max(180),
        }),
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'styleCategory',
      title: 'Style category',
      type: 'string',
      options: {
        list: [
          { title: 'Updo', value: 'updo' },
          { title: 'Half-up', value: 'halfUp' },
          { title: 'Down / glam waves', value: 'down' },
          { title: 'Short hair', value: 'short' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'season', title: 'Season', type: 'string' }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.integer().min(2000).max(2100),
    }),
    defineField({ name: 'photographerName', title: 'Photographer name', type: 'string' }),
    defineField({
      name: 'photographerUrl',
      title: 'Photographer URL',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'relatedBlogPost',
      title: 'Related journal post',
      type: 'reference',
      to: [{ type: 'blogPost' }],
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
  preview: { select: { title: 'caption', subtitle: 'styleCategory', media: 'image' } },
});
