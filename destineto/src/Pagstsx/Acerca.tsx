import { useState } from 'react'
import '../Pagscss/Acerca.css';
import '../PageFlip.css' 
import useFlipNavigate from '../useFlipNavigate';

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

const leftPages = [
  <div className="ac-page-content">
    <h1 className="ac-title">Acerca de</h1>
    <div className="ac-logo-box">
      <span className="ac-logo-text">LOGO DE<br />MARCA</span>
    </div>
  </div>,
  <div className="ac-page-content">
    <h1 className="ac-title">Nuestros<br />Valores</h1>
    <div className="ac-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
  </div>,
]

const rightPages = [
  <div className="ac-page-content">
    <p className="ac-text">
      Bienvenido a nuestro rincón del mundo. En <em>"Alquileres y Destineto"</em>, 
      nos dedicamos a transformar viajes ordinarios en bitácoras llenas de historias inolvidables.
    </p>
    <p className="ac-text">
      Nuestra misión es guiarte a través de los destinos más cautivadores, ofreciendo 
      hospedajes y experiencias premium adaptadas a tu estilo de aventura.
    </p>
  </div>,
  <div className="ac-page-content">
    <p className="ac-text">Contenido de la segunda sección...</p>
  </div>,
]

function Acerca() {
  const flipTo = useFlipNavigate()
  const [page, setPage] = useState(0)

  const goNext = () => {
    const right = document.querySelector('.flip-pages') as HTMLElement | null
    const left = document.querySelector('.flip-pages-left') as HTMLElement | null
    if (!right || !left) { setPage(p => Math.min(p + 1, rightPages.length - 1)); return }

    // Flip both pages out simultaneously
    ;[right, left].forEach(el => {
      el.style.animation = 'none'
    })
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
    <div className="ac-scene">
      <div className="ac-bg" aria-hidden="true" />

      <div className="ac-current-tab">
        <span className="ac-current-tab__dot" />
        Acerca de Nosotros
      </div>

      <div className="ac-journal open-book flip-journal">

        <div className="ac-back-cover" aria-hidden="true" />

        <div className="ac-book-body">

          <div className="ac-book-page ac-page-left flip-pages-left">
            {leftPages[page]}
            {page > 0 && (
              <button className="ac-arrow ac-arrow-left" onClick={goPrev}>←</button>
            )}
          </div>

          <div className="ac-book-page ac-page-right flip-pages">
            {rightPages[page]}
            {page < rightPages.length - 1 && (
              <button className="ac-arrow ac-arrow-right" onClick={goNext}>→</button>
            )}
          </div>

        </div>

        <div className="ac-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="ac-ring" />
          ))}
        </div>

        <nav className="ac-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="ac-bookmark"
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

export default Acerca;