import { defineArrayMember, defineField, defineType } from 'sanity';

import { contentStatusField } from './fields/contentStatus';

const imageFields = [
  defineField({
    name: 'alt',
    title: 'Alt text',
    type: 'string',
    validation: (Rule) => Rule.required().max(180),
  }),
  defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  defineField({ name: 'credit', title: 'Credit', type: 'string' }),
];

export default defineType({
  name: 'blogPost',
  title: 'Journal post',
  type: 'document',
  fields: [
    contentStatusField,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 3 }),
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime' }),
    defineField({ name: 'updatedAt', title: 'Updated at', type: 'datetime' }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      options: { hotspot: true },
      fields: imageFields,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(240),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bulleted', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
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
              {
                name: 'internalLink',
                title: 'Internal link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'reference',
                    title: 'Reference',
                    type: 'reference',
                    to: [{ type: 'blogPost' }],
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          name: 'inlineImage',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          fields: imageFields,
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (Rule) => Rule.unique().max(3),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (Rule) => Rule.unique().max(8),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      validation: (Rule) => Rule.max(65),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.min(70).max(160),
    }),
    defineField({
      name: 'socialImage',
      title: 'Social image',
      type: 'image',
      options: { hotspot: true },
      fields: imageFields,
    }),
  ],
  orderings: [
    {
      title: 'Published date, newest',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'featuredImage' } },
});
