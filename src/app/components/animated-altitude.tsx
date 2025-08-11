"use client"

import { useCountAnimation } from "../hooks/useCountAnimation"
import { useIntersectionObserver } from "../hooks/useIntersectionObserver"

interface AnimatedAltitudeProps {
  altitude: number
  index: number
}

export function AnimatedAltitude({ altitude, index }: AnimatedAltitudeProps) {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.6,
    rootMargin: "-10% 0px -10% 0px",
  })

  const { count } = useCountAnimation({
    target: altitude,
    duration: 1500,
    isVisible: isVisible,
  })

  return (
    <div ref={elementRef} style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          color: "white",
          fontWeight: "900",
          lineHeight: "1",
          transition: "all 0.3s ease",
          fontSize: "clamp(8rem, 15vw, 15rem)",
          letterSpacing: "-0.05em",
          fontFamily: "var(--heading-font)",
        }}
      >
        {count.toLocaleString()}
      </div>
    </div>
  )
}
