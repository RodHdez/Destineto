import { useEffect, useRef } from 'react'
import useFlipNavigate from '../useFlipNavigate'
import '../Pagscss/Keychain.css'

interface KeychainProps {
  journalRef?: React.RefObject<HTMLDivElement>
}

function Keychain({ journalRef }: KeychainProps) {
  const flipTo = useFlipNavigate()
  const charmRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Position keychain at top-left of journal when journalRef provided
  useEffect(() => {
    if (!journalRef?.current || !wrapperRef.current) return

    const updatePosition = () => {
      const journal = journalRef.current
      const wrapper = wrapperRef.current
      if (!journal || !wrapper) return

      const rect = journal.getBoundingClientRect()
      // Position: right of the rings (rings are ~48px wide), left of the tab
      // rings end at roughly rect.left + 48px, tab starts around rect.left + 120px
      // so center the keychain at rect.left + 84px
      wrapper.style.left = `${rect.left + 60}px`
      wrapper.style.top = `${rect.top - 10}px`
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [journalRef])

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
      className={`keychain-wrapper ${journalRef ? 'keychain-wrapper--journal' : ''}`}
      aria-label="Ir a inicio"
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