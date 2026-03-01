import { AmenitiesSection } from '../components/amenities-section/AmenitiesSection'
import { FinalCtaSection } from '../components/final-cta-section/FinalCtaSection'
import { GallerySection } from '../components/gallery-section/GallerySection'
import { HeroSection } from '../components/hero-section/HeroSection'
import { HighlightsSection } from '../components/highlights-section/HighlightsSection'
import { LocationSection } from '../components/location-section/LocationSection'
import { ReviewsSection } from '../components/reviews-section/ReviewsSection'
import { SiteFooter } from '../components/site-footer/SiteFooter'
import { StorySection } from '../components/story-section/StorySection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <HighlightsSection />
      <GallerySection />
      <AmenitiesSection />
      <LocationSection />
      <ReviewsSection />
      <FinalCtaSection />
      <SiteFooter />
    </>
  )
}
