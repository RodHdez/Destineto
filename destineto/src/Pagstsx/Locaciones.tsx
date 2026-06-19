import { useState } from 'react'
import '../Pagscss/Locaciones.css';
import '../PageFlip.css' 
import useFlipNavigate from '../useFlipNavigate';

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

const leftPages = [
  <div className="lo-page-content">
    <h1 className="lo-title">Nuestras<br />Locaciones</h1>
    <div className="lo-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
  </div>,
  <div className="lo-page-content">
    <h1 className="lo-title">Más<br />Destinos</h1>
    <div className="lo-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
  </div>,
]

const rightPages = [
  <div className="lo-page-content">
    <p className="lo-text">
      Cada uno de nuestros destinos ha sido seleccionado meticulosamente para ofrecerte un equilibrio perfecto entre confort, autenticidad y belleza natural.
    </p>
    <div className="lo-list-locations">
      <div className="lo-location-item">
        <strong>• Refugios de Montaña:</strong> Cabañas rústicas con vistas panorámicas a las cordilleras.
      </div>
      <div className="lo-location-item">
        <strong>• Villas Costeras:</strong> Espacios exclusivos a pocos pasos de playas vírgenes.
      </div>
      <div className="lo-location-item">
        <strong>• Escapes Urbanos:</strong> Lofts modernos en el corazón histórico de las ciudades más vibrantes.
      </div>
    </div>
  </div>,
  <div className="lo-page-content">
    <p className="lo-text">Contenido de la segunda sección...</p>
  </div>,
]

function Locaciones() {
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
    <div className="lo-scene">
      <div className="lo-bg" aria-hidden="true" />

      <div className="lo-current-tab">
        <span className="lo-current-tab__dot" />
        Locaciones
      </div>

      <div className="lo-journal open-book flip-journal">

        <div className="lo-back-cover" aria-hidden="true" />

        <div className="lo-book-body">

          <div className="lo-book-page lo-page-left flip-pages-left">
            {leftPages[page]}
            {page > 0 && (
              <button className="lo-arrow lo-arrow-left" onClick={goPrev}>←</button>
            )}
          </div>

          <div className="lo-book-page lo-page-right flip-pages">
            {rightPages[page]}
            {page < rightPages.length - 1 && (
              <button className="lo-arrow lo-arrow-right" onClick={goNext}>→</button>
            )}
          </div>

        </div>

        <div className="lo-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="lo-ring" />
          ))}
        </div>

        <nav className="lo-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="lo-bookmark"
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

export default Locaciones;