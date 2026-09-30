import { defineArrayMember, defineField, defineType } from 'sanity';

import { contentStatusField } from './fields/contentStatus';

export default defineType({
  name: 'package',
  title: 'Package',
  type: 'document',
  fields: [
    contentStatusField,
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceQualifier',
      title: 'Price qualifier',
      type: 'string',
      initialValue: 'Starting at',
    }),
    defineField({
      name: 'partySizeLabel',
      title: 'Party size label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceCount',
      title: 'Normalized service count',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1),
    }),
    defineField({
      name: 'features',
      title: 'Included features',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'includesSecondArtist',
      title: 'Includes second artist',
      type: 'boolean',
      initialValue: false,
    }),
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
    defineField({ name: 'travelNotes', title: 'Travel notes', type: 'text', rows: 2 }),
    defineField({ name: 'staffingNotes', title: 'Staffing notes', type: 'text', rows: 2 }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
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
  preview: { select: { title: 'name', subtitle: 'partySizeLabel', media: 'image' } },
});
