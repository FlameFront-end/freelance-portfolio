import { lazy, Suspense, useMemo, useState } from 'react'
import { galleryItems } from '../../model/galleryItems'
import { useOneTimeSkeleton } from '../../../../shared/lib/useOneTimeSkeleton'
import { SectionReveal } from '../../../../shared/ui/section-reveal/SectionReveal'
import styles from './GallerySection.module.scss'

const LazyGalleryLightbox = lazy(() =>
  import('../gallery-lightbox/GalleryLightbox').then((module) => ({
    default: module.GalleryLightbox,
  })),
)

export function GallerySection() {
  const [activeSlide, setActiveSlide] = useState(-1)
  const isLoading = useOneTimeSkeleton({ minDelayMs: 600, maxDelayMs: 900 })

  const slides = useMemo(
    () =>
      galleryItems.map((item) => ({
        src: item.src,
        alt: item.alt,
      })),
    [],
  )

  return (
    <section className={styles.section} id="gallery">
      <SectionReveal>
        <div className="container">
          <div className={styles.head}>
            <p className={styles.eyebrow}>Gallery</p>
            <h2>A curated preview of AURA VILLA</h2>
            <p>Tap any image to open full-screen lightbox navigation.</p>
          </div>

          <div className={styles.grid}>
            {isLoading
              ? galleryItems.map((item) => (
                  <div key={item.src} className={styles.skeleton} aria-hidden />
                ))
              : galleryItems.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    className={styles.card}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Open gallery image ${index + 1}`}
                  >
                    <img
                      src={item.thumb}
                      srcSet={item.srcSet}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      width={item.width}
                      height={item.height}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={styles.overlay} aria-hidden />
                  </button>
                ))}
          </div>
        </div>
      </SectionReveal>

      {activeSlide >= 0 ? (
        <Suspense fallback={null}>
          <LazyGalleryLightbox
            open={activeSlide >= 0}
            index={activeSlide}
            slides={slides}
            onClose={() => setActiveSlide(-1)}
          />
        </Suspense>
      ) : null}
    </section>
  )
}
