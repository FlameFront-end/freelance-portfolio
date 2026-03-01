export type GalleryItem = {
  thumb: string
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
}

type RawGalleryItem = {
  id: string
  alt: string
}

const rawGalleryItems: RawGalleryItem[] = [
  {
    id: 'photo-1540541338287-41700207dee6',
    alt: 'Villa exterior in warm evening light',
  },
  {
    id: 'photo-1499793983690-e29da59ef1c2',
    alt: 'Open living area with natural materials',
  },
  {
    id: 'photo-1575429198097-0414ec08e8cd',
    alt: 'Private pool framed by tropical greenery',
  },
  {
    id: 'photo-1582719478250-c89cae4dc85b',
    alt: 'Garden pathway around the villa',
  },
  {
    id: 'photo-1540541338287-41700207dee6',
    alt: 'Sunset terrace lounge setup',
  },
  {
    id: 'photo-1613977257363-707ba9348227',
    alt: 'Master bedroom with soft neutral palette',
  },
  {
    id: 'photo-1505693416388-ac5ce068fe85',
    alt: 'Minimalist bedroom detail',
  },
  {
    id: 'photo-1617104678098-de229db51175',
    alt: 'Kitchen island with stone finishes',
  },
  {
    id: 'photo-1499793983690-e29da59ef1c2',
    alt: 'Bathroom with spa-inspired design',
  },
  {
    id: 'photo-1592229505726-ca121723b8ef',
    alt: 'Outdoor dining table under tropical canopy',
  },
  {
    id: 'photo-1564013799919-ab600027ffc6',
    alt: 'Villa facade surrounded by palms',
  },
  {
    id: 'photo-1600585154340-be6161a56a0c',
    alt: 'Elegant living room with soft textures',
  },
]

function toUnsplash(id: string, width: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&fm=webp&q=72&w=${width}`
}

function toSrcSet(id: string) {
  const breakpoints = [480, 768, 1080, 1440]
  return breakpoints.map((size) => `${toUnsplash(id, size)} ${size}w`).join(', ')
}

export const galleryItems: GalleryItem[] = rawGalleryItems.map((item) => ({
  alt: item.alt,
  thumb: toUnsplash(item.id, 1080),
  src: toUnsplash(item.id, 1800),
  srcSet: toSrcSet(item.id),
  width: 1200,
  height: 900,
}))
