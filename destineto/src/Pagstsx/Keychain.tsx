import { useEffect, useRef } from 'react'
import useFlipNavigate from '../useFlipNavigate'
import '../Pagscss/Keychain.css'

function Keychain() {
  const flipTo = useFlipNavigate()
  const charmRef = useRef<HTMLDivElement>(null)

  // Jiggle when page flips — listen for the flip-out class being added anywhere
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

    // Observe all flip-pages elements
    const observe = () => {
      document.querySelectorAll('.flip-pages, .flip-pages-left').forEach(el => {
        observer.observe(el, { attributes: true, attributeFilter: ['style'] })
      })
    }

    observe()

    // Re-observe on route change since DOM elements remount
    const interval = setInterval(observe, 1000)

    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="keychain-wrapper" aria-label="Ir a inicio">
      {/* Chain/cord */}
      <div className="keychain-cord" aria-hidden="true">
        <div className="keychain-cord-line" />
        <div className="keychain-cord-ring" />
      </div>

      {/* Charm */}
      <div
        ref={charmRef}
        className="keychain-charm"
        onClick={() => flipTo('/')}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && flipTo('/')}
      >
        {/* Logo placeholder — replace with <img> when ready */}
        <div className="keychain-logo-placeholder" aria-label="Logo Destineto">
          <span className="keychain-logo-text">D</span>
        </div>
      </div>
    </div>
  )
}

export default Keychain