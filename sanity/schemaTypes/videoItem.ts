import { defineField, defineType } from 'sanity';

import { contentStatusField } from './fields/contentStatus';

export default defineType({
  name: 'videoItem',
  title: 'Bridal video',
  type: 'document',
  fields: [
    contentStatusField,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Accessible visual description',
      type: 'text',
      rows: 3,
      description: 'Describe the finished look or visual information that the video demonstrates.',
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Poster alt text',
          type: 'string',
          validation: (rule) => rule.required().max(180),
        }),
      ],
    }),
    defineField({
      name: 'videoFile',
      title: 'Original video file',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Upload an original with permission for website playback, including its audio.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Owned video delivery URL',
      type: 'url',
      description:
        'Alternative to upload: a stable HTTPS MP4/WebM URL from your own R2/approved CDN. Not an Instagram page or expiring API URL.',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'instagramPermalink',
      title: 'Optional Instagram Reel link',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'hasSpeech',
      title: 'Contains speech or meaningful audio',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'captionsUrl',
      title: 'WebVTT captions URL',
      type: 'url',
      validation: (rule) =>
        rule
          .uri({ scheme: ['https'] })
          .custom((value, context) =>
            context.document?.hasSpeech && !value
              ? 'Provide synchronized captions for speech.'
              : true,
          ),
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript / equivalent description',
      type: 'text',
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.hasSpeech && !value
            ? 'Provide a transcript for meaningful audio.'
            : true,
        ),
    }),
    defineField({
      name: 'publicationPermission',
      title: 'People / footage publication permission confirmed',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'websiteUsageRights',
      title: 'Website video AND audio usage rights confirmed',
      type: 'boolean',
      initialValue: false,
      description: 'Instagram music availability alone does not grant website audio rights.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'active', title: 'Show on website', type: 'boolean', initialValue: false }),
    defineField({
      name: 'sortOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (value?.active !== true) return true;
      if (
        value.contentStatus !== 'OWNER_APPROVED' ||
        !value.publicationPermission ||
        !value.websiteUsageRights
      )
        return 'Active videos require owner approval and confirmed website footage/audio permissions.';
      return value.videoFile || value.videoUrl
        ? true
        : 'Provide an authorized video file or owned delivery URL before activating.';
    }),
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: { select: { title: 'title', subtitle: 'contentStatus', media: 'poster' } },
});
