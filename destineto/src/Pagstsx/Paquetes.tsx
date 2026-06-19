import { useState } from 'react'
import '../Pagscss/Paquetes.css';
import '../PageFlip.css' 
import useFlipNavigate from '../useFlipNavigate';

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

const leftPages = [
  <div className="pa-page-content">
    <h1 className="pa-title">Nuestros<br />Paquetes</h1>
    <div className="pa-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
  </div>,
  <div className="pa-page-content">
    <h1 className="pa-title">Más<br />Opciones</h1>
    <div className="pa-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
  </div>,
]

const rightPages = [
  <div className="pa-page-content">
    <p className="pa-text">
      Diseñamos itinerarios a la medida para que solo te preocupes por coleccionar momentos. Descubre nuestras opciones más populares:
    </p>
    <div className="pa-packages-grid">
      <div className="pa-package-card">
        <span className="pa-card-title">Aventura Express</span>
        <p className="pa-card-desc">3 días de inmersión total en naturaleza indómita, con guías locales certificados.</p>
      </div>
      <div className="pa-package-card">
        <span className="pa-card-title">Escape Romántico</span>
        <p className="pa-card-desc">5 noches en villas frente al mar, cenas privadas y sesiones de spa incluidas.</p>
      </div>
    </div>
  </div>,
  <div className="pa-page-content">
    <p className="pa-text">Contenido de la segunda sección...</p>
  </div>,
]

function Paquetes() {
  const flipTo = useFlipNavigate()
  const [page, setPage] = useState(0)

  const goNext = () => {
    const right = document.querySelector('.flip-pages') as HTMLElement | null
    const left = document.querySelector('.flip-pages-left') as HTMLElement | null
    if (!right || !left) { setPage(p => Math.min(p + 1, rightPages.length - 1)); return }

    right.style.animation = 'none'
    left.style.animation = 'none'
    void right.offsetHeight

    right.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 1, 1), opacity 0.4s ease-in'
    right.style.transformOrigin = 'left center'
    right.style.transform = 'perspective(1200px) rotateY(-90deg)'
    right.style.opacity = '0'

    left.style.transition = 'opacity 0.3s ease-in'
    left.style.opacity = '0'

    setTimeout(() => {
      setPage(p => Math.min(p + 1, rightPages.length - 1))

      right.style.transition = 'none'
      right.style.transform = 'perspective(1200px) rotateY(90deg)'
      left.style.transition = 'none'

      setTimeout(() => {
        right.style.transition = 'transform 0.5s cubic-bezier(0, 0.55, 0.45, 1), opacity 0.4s ease-out'
        right.style.transform = 'perspective(1200px) rotateY(0deg)'
        right.style.opacity = '1'

        left.style.transition = 'opacity 0.4s ease-out'
        left.style.opacity = '1'
      }, 20)
    }, 500)
  }

  const goPrev = () => {
    const right = document.querySelector('.flip-pages') as HTMLElement | null
    const left = document.querySelector('.flip-pages-left') as HTMLElement | null
    if (!right || !left) { setPage(p => Math.max(p - 1, 0)); return }

    left.style.animation = 'none'
    right.style.animation = 'none'
    void left.offsetHeight

    left.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 1, 1), opacity 0.4s ease-in'
    left.style.transformOrigin = 'right center'
    left.style.transform = 'perspective(1200px) rotateY(90deg)'
    left.style.opacity = '0'

    right.style.transition = 'opacity 0.3s ease-in'
    right.style.opacity = '0'

    setTimeout(() => {
      setPage(p => Math.max(p - 1, 0))

      left.style.transition = 'none'
      left.style.transform = 'perspective(1200px) rotateY(-90deg)'
      right.style.transition = 'none'

      setTimeout(() => {
        left.style.transition = 'transform 0.5s cubic-bezier(0, 0.55, 0.45, 1), opacity 0.4s ease-out'
        left.style.transform = 'perspective(1200px) rotateY(0deg)'
        left.style.opacity = '1'

        right.style.transition = 'opacity 0.4s ease-out'
        right.style.opacity = '1'
      }, 20)
    }, 500)
  }

  return (
    <div className="pa-scene">
      <div className="pa-bg" aria-hidden="true" />

      <div className="pa-current-tab">
        <span className="pa-current-tab__dot" />
        Paquetes de Viaje
      </div>

      <div className="pa-journal open-book flip-journal">

        <div className="pa-back-cover" aria-hidden="true" />

        <div className="pa-book-body">

          <div className="pa-book-page pa-page-left flip-pages-left">
            {leftPages[page]}
            {page > 0 && (
              <button className="pa-arrow pa-arrow-left" onClick={goPrev}>←</button>
            )}
          </div>

          <div className="pa-book-page pa-page-right flip-pages">
            {rightPages[page]}
            {page < rightPages.length - 1 && (
              <button className="pa-arrow pa-arrow-right" onClick={goNext}>→</button>
            )}
          </div>

        </div>

        <div className="pa-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="pa-ring" />
          ))}
        </div>

        <nav className="pa-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="pa-bookmark"
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => flipTo(bm.path)}
            >
              {bm.label}
            </button>
          ))}
        </nav>

      </div>
    </div>
  );
}

export default Paquetes;