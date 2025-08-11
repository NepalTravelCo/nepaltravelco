"use client"

import { useState, useEffect, useRef } from "react"

interface UseCountAnimationProps {
  target: number
  duration?: number
  isVisible: boolean
}

export function useCountAnimation({ target, duration = 2000, isVisible }: UseCountAnimationProps) {
  const [count, setCount] = useState(target)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const startValueRef = useRef<number>(target)

  useEffect(() => {
    if (!isVisible || count === target) return

    setIsAnimating(true)
    startValueRef.current = count
    startTimeRef.current = Date.now()

    const animate = () => {
      const now = Date.now()
      const elapsed = now - (startTimeRef.current || now)
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
      const easedProgress = easeOutCubic(progress)

      const currentValue = Math.round(startValueRef.current + (target - startValueRef.current) * easedProgress)

      setCount(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [target, duration, isVisible])

  return { count, isAnimating }
}
