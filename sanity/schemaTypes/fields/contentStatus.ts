import { defineField } from 'sanity';

export const contentStatusField = defineField({
  name: 'contentStatus',
  title: 'Content status',
  type: 'string',
  description: 'Publishing guard used by the website build. Only owner-approved content can ship.',
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
});
