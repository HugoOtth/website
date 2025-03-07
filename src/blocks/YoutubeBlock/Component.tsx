// Create a file at @/blocks/YouTube/Component.tsx
import React from 'react'
import { cn } from '@/utilities/ui'

type AspectRatio = '16:9' | '4:3' | '1:1'

export type YouTubeBlockProps = {
  youtubeID: string
  aspectRatio?: AspectRatio
  title?: string
}

export const YouTubeBlock: React.FC<YouTubeBlockProps & { className?: string }> = ({
  youtubeID,
  aspectRatio = '16:9',
  title = 'YouTube video player',
  className,
}) => {
  const aspectRatioClasses = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  }

  const sanitizedID = youtubeID.replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <div className={cn('w-full my-8', className)}>
      <div className={cn('relative w-full', aspectRatioClasses[aspectRatio])}>
        <iframe
          src={`https://www.youtube.com/embed/${sanitizedID}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  )
}
