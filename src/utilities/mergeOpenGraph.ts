import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Lighting Designer and Operator',
  images: [
    {
      url: `${getServerSideURL()}/website-hero.jpg`,
    },
  ],
  siteName: 'Hugo Otth Portfolio',
  title: 'Hugo Otth Portfolio',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
