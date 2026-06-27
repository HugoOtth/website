import { track } from '@vercel/analytics'

type EventProperties = Record<string, string | number | boolean | undefined | null>

function safeTrack(eventName: string, properties?: EventProperties) {
  try {
    track(eventName, properties)
  } catch {
    // analytics should never break the app
  }
}

export function trackEventCardClick(props: { title?: string; slug?: string }) {
  safeTrack('event_card_click', {
    title: props.title ?? '',
    slug: props.slug ?? '',
  })
}

export function trackSearch(props: { query: string }) {
  safeTrack('search', { query: props.query })
}

export function trackThemeChange(props: { theme: string }) {
  safeTrack('theme_change', { theme: props.theme })
}

export function trackPagination(props: { page: number }) {
  safeTrack('pagination', { page: props.page })
}

export function trackYouTubePlay(props: { videoId: string; title?: string }) {
  safeTrack('youtube_play', {
    videoId: props.videoId,
    title: props.title ?? '',
  })
}
