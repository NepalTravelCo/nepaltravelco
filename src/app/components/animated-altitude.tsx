"use client"

import { useCountAnimation } from "../hooks/useCountAnimation"
import { useIntersectionObserver } from "../hooks/useIntersectionObserver"
import "./animated-altitude.css"

interface AnimatedAltitudeProps {
  altitude: number
  index: number
}

export function AnimatedAltitude({ altitude, index }: AnimatedAltitudeProps) {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.6,
    rootMargin: "-10% 0px -10% 0px",
  })

  const { count, isAnimating } = useCountAnimation({
    target: altitude,
    duration: 1500,
    isVisible: isVisible,
  })

  return (
    <div ref={elementRef} className="animated-altitude-container">
      <div className={`animated-altitude-number ${isAnimating ? "animating" : "completed"}`}>
        {count.toLocaleString()}
      </div>
    </div>
  )
}
