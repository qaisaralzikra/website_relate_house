import { useState, useEffect, useRef } from 'react'

export default function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const startTime = performance.now()
          const step = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return [count, ref]
}
