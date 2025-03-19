import type { Block } from 'payload'

export const YouTubeBlock: Block = {
  slug: 'youtubeBlock',
  interfaceName: 'YoutubeBlock',
  fields: [
    {
      name: 'youtubeID',
      type: 'text',
      label: 'YouTube Video ID',
      required: true,
      admin: {
        description:
          'Enter the YouTube video ID (e.g., dQw4w9WgXcQ from https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      defaultValue: '16:9',
      options: [
        {
          label: '16:9 (Standard)',
          value: '16:9',
        },
        {
          label: '4:3',
          value: '4:3',
        },
        {
          label: '1:1 (Square)',
          value: '1:1',
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Video Title (for accessibility)',
    },
  ],
}
