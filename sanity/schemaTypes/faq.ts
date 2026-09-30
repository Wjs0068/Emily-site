import { defineArrayMember, defineField, defineType } from 'sanity';

import { contentStatusField } from './fields/contentStatus';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    contentStatusField,
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [{ title: 'Bulleted', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.required().uri({ scheme: ['http', 'https', 'mailto'] }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Booking', value: 'booking' },
          { title: 'Services and pricing', value: 'services' },
          { title: 'Preview and preparation', value: 'preview' },
          { title: 'Travel', value: 'travel' },
          { title: 'Wedding day', value: 'weddingDay' },
        ],
      },
      validation: (Rule) => Rule.required(),
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
  preview: { select: { title: 'question', subtitle: 'category' } },
});
