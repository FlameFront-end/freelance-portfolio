import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import { SectionReveal } from '../../../../shared/ui/section-reveal/SectionReveal'
import styles from './StorySection.module.scss'

export function StorySection() {
  const storyRef = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start end', 'end start'],
  })

  const rawMediaY = useTransform(scrollYProgress, [0, 1], [-78, 78])
  const rawCopyY = useTransform(scrollYProgress, [0, 1], [10, -10])
  const rawMediaScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.1])

  const mediaY = useSpring(rawMediaY, { stiffness: 74, damping: 30, mass: 0.24 })
  const copyY = useSpring(rawCopyY, { stiffness: 82, damping: 32, mass: 0.24 })
  const mediaScale = useSpring(rawMediaScale, {
    stiffness: 72,
    damping: 30,
    mass: 0.26,
  })

  return (
    <section className={styles.section} id="villa">
      <div className="container">
        <SectionReveal>
          <div className={styles.frame} ref={storyRef}>
            <motion.div
              className={styles.media}
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: mediaY,
                      scale: mediaScale,
                    }
              }
            />
            <div className={styles.overlay} aria-hidden />
            <motion.div
              className={styles.copy}
              style={prefersReducedMotion ? undefined : { y: copyY }}
            >
              <p className={styles.eyebrow}>Villa Story</p>
              <h2>Designed for privacy</h2>
              <p>
                Quiet transitions, natural textures, and warm light create a
                rhythm that feels restful from the moment you arrive.
              </p>
              <ul className={styles.points}>
                <li>Designed for privacy</li>
                <li>Sunset terrace</li>
                <li>Natural materials</li>
              </ul>
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
