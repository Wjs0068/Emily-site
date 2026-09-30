import { defineField, defineType } from 'sanity';

import { contentStatusField } from './fields/contentStatus';

export default defineType({
  name: 'addon',
  title: 'Add-on',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: 'pricingType',
      title: 'Pricing type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Fixed', value: 'fixed' },
          { title: 'Starting at', value: 'startingAt' },
          { title: 'Custom quote', value: 'customQuote' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      hidden: ({ parent }) => parent?.pricingType === 'customQuote',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({ name: 'currency', title: 'Currency', type: 'string', initialValue: 'USD' }),
    defineField({ name: 'displayQualifier', title: 'Display qualifier', type: 'string' }),
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
  preview: { select: { title: 'name', subtitle: 'displayQualifier', media: 'image' } },
});
