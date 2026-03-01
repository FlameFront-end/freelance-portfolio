import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'

type GalleryLightboxSlide = {
  src: string
  alt: string
}

type GalleryLightboxProps = {
  open: boolean
  index: number
  slides: GalleryLightboxSlide[]
  onClose: () => void
}

export function GalleryLightbox({
  open,
  index,
  slides,
  onClose,
}: GalleryLightboxProps) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Counter]}
      controller={{ closeOnBackdropClick: true }}
    />
  )
}
