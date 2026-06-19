import { useState } from 'react'
import '../Pagscss/Contacto.css';
import '../PageFlip.css' 
import useFlipNavigate from '../useFlipNavigate';

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
];

const leftPages = [
  <div className="co-page-content">
    <h1 className="co-title">Escríbenos<br />un Mensaje</h1>
    <div className="co-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <div className="co-info-block">
      <span className="co-info-label">Correspondencia</span>
      <p className="co-info-text">contacto@destineto.com</p>
      <p className="co-info-text">+1 (555) 019-2834</p>
    </div>
  </div>,
  <div className="co-page-content">
    <h1 className="co-title">Síguenos</h1>
    <div className="co-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
  </div>,
]

const rightPages = [
  <div className="co-page-content">
    <form className="co-form" onSubmit={(e) => e.preventDefault()}>
      <div className="co-form-group">
        <label className="co-label">Tu Correo Electrónico</label>
        <input type="email" className="co-input" placeholder="ejemplo@correo.com" />
      </div>
      <div className="co-form-group">
        <label className="co-label">Asunto</label>
        <input type="text" className="co-input" placeholder="¿En qué podemos ayudarte?" />
      </div>
      <div className="co-form-group">
        <label className="co-label">Tu Mensaje o Nota</label>
        <textarea className="co-textarea" rows={4} placeholder="Escribe tu bitácora aquí..." />
      </div>
      <button type="submit" className="co-submit-btn">Enviar Nota</button>
    </form>
  </div>,
  <div className="co-page-content">
    <p className="co-text">Contenido de la segunda sección...</p>
  </div>,
]

function Contacto() {
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
    <div className="co-scene">
      <div className="co-bg" aria-hidden="true" />

      <div className="co-current-tab">
        <span className="co-current-tab__dot" />
        Contáctanos
      </div>

      <div className="co-journal open-book flip-journal">

        <div className="co-back-cover" aria-hidden="true" />

        <div className="co-book-body">

          <div className="co-book-page co-page-left flip-pages-left">
            {leftPages[page]}
            {page > 0 && (
              <button className="co-arrow co-arrow-left" onClick={goPrev}>←</button>
            )}
          </div>

          <div className="co-book-page co-page-right flip-pages">
            {rightPages[page]}
            {page < rightPages.length - 1 && (
              <button className="co-arrow co-arrow-right" onClick={goNext}>→</button>
            )}
          </div>

        </div>

        <div className="co-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="co-ring" />
          ))}
        </div>

        <nav className="co-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="co-bookmark"
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

export default Contacto;