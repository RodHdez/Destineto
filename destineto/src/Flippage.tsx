import { useEffect, useRef } from 'react'
import './PageFlip.css'

/*
  Wrap the content of each page with this component.
  On mount it plays the flip-in animation automatically.
  Call triggerFlipOut(callback) before navigating away to play the flip-out first.
*/

interface FlipPageProps {
  children: React.ReactNode
  className?: string
}

function FlipPage({ children, className = '' }: FlipPageProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add('flip-in')
    const t = setTimeout(() => el.classList.remove('flip-in'), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div ref={ref} className={`flip-page ${className}`}>
      {children}
    </div>
  )
}

export default FlipPage