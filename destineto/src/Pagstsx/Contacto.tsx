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
    const el = document.querySelector('.flip-pages') as HTMLElement | null
    if (!el) { setPage(p => Math.min(p + 1, rightPages.length - 1)); return }
    el.style.animation = 'none'
    void el.offsetHeight
    el.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 1, 1), opacity 0.4s ease-in'
    el.style.transformOrigin = 'left center'
    el.style.transform = 'perspective(1200px) rotateY(-90deg)'
    el.style.opacity = '0'
    setTimeout(() => {
      setPage(p => Math.min(p + 1, rightPages.length - 1))
      el.style.transition = 'none'
      el.style.transform = 'perspective(1200px) rotateY(90deg)'
      setTimeout(() => {
        el.style.transition = 'transform 0.5s cubic-bezier(0, 0.55, 0.45, 1), opacity 0.4s ease-out'
        el.style.transform = 'perspective(1200px) rotateY(0deg)'
        el.style.opacity = '1'
      }, 20)
    }, 500)
  }

  const goPrev = () => {
    const el = document.querySelector('.flip-pages-left') as HTMLElement | null
    if (!el) { setPage(p => Math.max(p - 1, 0)); return }
    el.style.animation = 'none'
    void el.offsetHeight
    el.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 1, 1), opacity 0.4s ease-in'
    el.style.transformOrigin = 'right center'
    el.style.transform = 'perspective(1200px) rotateY(90deg)'
    el.style.opacity = '0'
    setTimeout(() => {
      setPage(p => Math.max(p - 1, 0))
      el.style.transition = 'none'
      el.style.transform = 'perspective(1200px) rotateY(-90deg)'
      setTimeout(() => {
        el.style.transition = 'transform 0.5s cubic-bezier(0, 0.55, 0.45, 1), opacity 0.4s ease-out'
        el.style.transform = 'perspective(1200px) rotateY(0deg)'
        el.style.opacity = '1'
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
            <div className="co-page-content">
              <h1 className="co-title">Escríbenos<br />un Mensaje</h1>
              <div className="co-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
              <div className="co-info-block">
                <span className="co-info-label">Correspondencia</span>
                <p className="co-info-text">contacto@destineto.com</p>
                <p className="co-info-text">+1 (555) 019-2834</p>
              </div>
            </div>
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