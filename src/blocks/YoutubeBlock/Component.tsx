// Create a file at @/blocks/YouTube/Component.tsx
'use client'
import React, { useCallback, useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'
import { trackYouTubePlay } from '@/utilities/analytics'

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
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const apiLoadedRef = useRef(false)
  const trackedRef = useRef(false)

  const handlePlay = useCallback(() => {
    if (!trackedRef.current) {
      trackedRef.current = true
      trackYouTubePlay({ videoId: sanitizedID, title })
    }
  }, [sanitizedID, title])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const loadAPI = () => {
      if (apiLoadedRef.current) return
      apiLoadedRef.current = true

      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)

      const prevOnReady = (window as unknown as Record<string, unknown>).onYouTubeIframeAPIReady
      ;(window as unknown as Record<string, unknown>).onYouTubeIframeAPIReady = () => {
        if (typeof prevOnReady === 'function') prevOnReady()
        try {
          const YT = (
            window as unknown as {
              YT?: { Player: new (el: HTMLIFrameElement, cfg: object) => object }
            }
          ).YT
          if (YT?.Player) {
            new YT.Player(iframe, {
              events: {
                onStateChange: (event: { data: number }) => {
                  if (event.data === 1) {
                    handlePlay()
                  }
                },
              },
            })
          }
        } catch {
          // silently ignore API load errors
        }
      }
    }

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return
      try {
        const data = JSON.parse(event.data)
        if (data.event === 'onStateChange' && data.info === 1) {
          handlePlay()
        }
      } catch {
        // ignore non-JSON messages
      }
    }

    if ((window as unknown as { YT?: { Player?: unknown } }).YT?.Player) {
      try {
        const YT = (
          window as unknown as {
            YT: { Player: new (el: HTMLIFrameElement, cfg: object) => object }
          }
        ).YT
        new YT.Player(iframe, {
          events: {
            onStateChange: (event: { data: number }) => {
              if (event.data === 1) {
                handlePlay()
              }
            },
          },
        })
      } catch {
        // silently ignore
      }
    } else {
      loadAPI()
      window.addEventListener('message', onMessage)
    }

    return () => {
      window.removeEventListener('message', onMessage)
    }
  }, [handlePlay])

  return (
    <div className={cn('w-full my-8', className)}>
      <div className={cn('relative w-full', aspectRatioClasses[aspectRatio])}>
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${sanitizedID}?enablejsapi=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  )
}
