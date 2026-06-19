import { useState } from 'react'
import '../Pagscss/Reservas.css';
import '../PageFlip.css' 
import useFlipNavigate from '../useFlipNavigate';

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

const leftPages = [
  <div className="re-page-content">
    <h1 className="re-title">Agenda tu<br />Aventura</h1>
    <div className="re-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <p className="re-left-note">
      "El primer paso para descubrir un destino inolvidable es fijar el día en el mapa."
    </p>
  </div>,
  <div className="re-page-content">
    <h1 className="re-title">Preguntas<br />Frecuentes</h1>
    <div className="re-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
  </div>,
]

const rightPages = [
  <div className="re-page-content">
    <form className="re-form" onSubmit={(e) => e.preventDefault()}>
      <div className="re-form-group">
        <label className="re-label">Nombre Completo</label>
        <input type="text" className="re-input" placeholder="Escribe aquí..." />
      </div>

      <div className="re-form-group">
        <label className="re-label">Destino de Interés</label>
        <select className="re-select">
          <option value="">Selecciona una opción...</option>
          <option value="montana">Refugios de Montaña</option>
          <option value="costa">Villas Costeras</option>
          <option value="urbano">Escapes Urbanos</option>
        </select>
      </div>

      <div className="re-form-row">
        <div className="re-form-group">
          <label className="re-label">Fecha de Viaje</label>
          <input type="date" className="re-input" />
        </div>
      </div>

      <button type="submit" className="re-submit-btn">
        Solicitar Reserva
      </button>
    </form>
  </div>,
  <div className="re-page-content">
    <p className="re-text">Contenido de la segunda sección...</p>
  </div>,
]

function Reservas() {
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
    <div className="re-scene">
      <div className="re-bg" aria-hidden="true" />

      <div className="re-current-tab">
        <span className="re-current-tab__dot" />
        Reservas
      </div>

      <div className="re-journal open-book flip-journal">

        <div className="re-back-cover" aria-hidden="true" />

        <div className="re-book-body">

          <div className="re-book-page re-page-left flip-pages-left">
            {leftPages[page]}
            {page > 0 && (
              <button className="re-arrow re-arrow-left" onClick={goPrev}>←</button>
            )}
          </div>

          <div className="re-book-page re-page-right flip-pages">
            {rightPages[page]}
            {page < rightPages.length - 1 && (
              <button className="re-arrow re-arrow-right" onClick={goNext}>→</button>
            )}
          </div>

        </div>

        <div className="re-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="re-ring" />
          ))}
        </div>

        <nav className="re-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="re-bookmark"
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

export default Reservas;