import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import useFlipNavigate from '../useFlipNavigate'
import '../Pagscss/Keychain.css'

interface KeychainProps {
  journalRef?: React.RefObject<HTMLDivElement>
}

function Keychain({ journalRef }: KeychainProps) {
  const flipTo = useFlipNavigate()
  const charmRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Reposition and slide in whenever the route changes
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Hide immediately off-screen above
    wrapper.style.transition = 'none'
    wrapper.style.opacity = '0'
    wrapper.style.transform = 'translateY(-60px)'

    const getJournal = () =>
      journalRef?.current ??
      (document.querySelector(
        '.hp-journal, .ac-journal, .hi-journal, .lo-journal, .pa-journal, .re-journal, .co-journal'
      ) as HTMLElement | null)

    const applyPosition = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect()
      wrapper.style.left = `${rect.left + 60}px`
      wrapper.style.top = `${rect.top - 10}px`
    }

    // Wait for flip animation to finish, then position and slide in
    const slideInTimer = setTimeout(() => {
      const journal = getJournal()
      if (journal) applyPosition(journal)

      requestAnimationFrame(() => {
        wrapper.style.transition = 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
        wrapper.style.opacity = '1'
        wrapper.style.transform = 'translateY(0)'
      })
    }, 550) // just after the 500ms flip finishes

    // Keep position updated on resize
    const handleResize = () => {
      const journal = getJournal()
      if (journal) applyPosition(journal)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(slideInTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [location.pathname, journalRef])

  // Jiggle on page flip
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const target = mutation.target as HTMLElement
          if (target.style.transform.includes('rotateY')) {
            charmRef.current?.classList.remove('keychain-jiggle')
            void charmRef.current?.offsetHeight
            charmRef.current?.classList.add('keychain-jiggle')
          }
        }
      }
    })

    const observe = () => {
      document.querySelectorAll('.flip-pages, .flip-pages-left').forEach(el => {
        observer.observe(el, { attributes: true, attributeFilter: ['style'] })
      })
    }

    observe()
    const interval = setInterval(observe, 1000)
    return () => { observer.disconnect(); clearInterval(interval) }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="keychain-wrapper"
      aria-label="Ir a inicio"
      style={{ opacity: 0 }}
    >
      <div className="keychain-cord" aria-hidden="true">
        <div className="keychain-cord-line" />
        <div className="keychain-cord-ring" />
      </div>

      <div
        ref={charmRef}
        className="keychain-charm"
        onClick={() => flipTo('/')}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && flipTo('/')}
      >
        <div className="keychain-logo-placeholder" aria-label="Logo Destineto">
          <span className="keychain-logo-text">D</span>
        </div>
      </div>
    </div>
  )
}

export default Keychain