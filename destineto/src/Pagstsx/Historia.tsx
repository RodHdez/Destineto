import { useState } from 'react'
import '../Pagscss/Historia.css';
import '../PageFlip.css' 
import useFlipNavigate from '../useFlipNavigate';

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

const leftPages = [
  <div className="hi-page-content">
    <h1 className="hi-title">Nuestra<br />Historia</h1>
    <div className="hi-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
  </div>,
  <div className="hi-page-content">
    <h1 className="hi-title">Nuestros<br />Hitos</h1>
    <div className="hi-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
  </div>,
]

const rightPages = [
  <div className="hi-page-content">
    <p className="hi-text">
      Todo comenzó con un mapa viejo, una mochila ligera y un deseo insaciable de descubrir lugares auténticos. Lo que empezó como un diario de viaje personal se convirtió en lo que hoy es <em>"Alquileres y Destineto"</em>.
    </p>
    <p className="hi-text">
      A lo largo de los años, hemos recorrido miles de kilómetros para seleccionar propiedades y experiencias que no solo ofrecen un lugar donde dormir, sino un portal hacia la cultura local.
    </p>
    <p className="hi-text">
      Hoy compartimos estas bitácoras contigo, invitándote a escribir tu propio capítulo en cada destino que elijas.
    </p>
  </div>,
  <div className="hi-page-content">
    <p className="hi-text">Contenido de la segunda sección...</p>
  </div>,
]

function Historia() {
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
    <div className="hi-scene">
      <div className="hi-bg" aria-hidden="true" />

      <div className="hi-current-tab">
        <span className="hi-current-tab__dot" />
        Nuestra Historia
      </div>

      <div className="hi-journal open-book flip-journal">

        <div className="hi-back-cover" aria-hidden="true" />

        <div className="hi-book-body">

          <div className="hi-book-page hi-page-left flip-pages-left">
            {leftPages[page]}
            {page > 0 && (
              <button className="hi-arrow hi-arrow-left" onClick={goPrev}>←</button>
            )}
          </div>

          <div className="hi-book-page hi-page-right flip-pages">
            {rightPages[page]}
            {page < rightPages.length - 1 && (
              <button className="hi-arrow hi-arrow-right" onClick={goNext}>→</button>
            )}
          </div>

        </div>

        <div className="hi-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="hi-ring" />
          ))}
        </div>

        <nav className="hi-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="hi-bookmark"
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

export default Historia;