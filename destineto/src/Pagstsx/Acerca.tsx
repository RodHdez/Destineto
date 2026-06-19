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
  <div className="ac-page-content">
    <p className="ac-text">Contenido de la tercera sección...</p>
  </div>,
]

function Acerca() {
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
            <div className="ac-page-content">
              <h1 className="ac-title">Acerca de</h1>
              <div className="ac-logo-box">
                <span className="ac-logo-text">LOGO DE<br />MARCA</span>
              </div>
            </div>
            {/* Left arrow at bottom left */}
            {page > 0 && (
              <button className="ac-arrow ac-arrow-left" onClick={goPrev}>←</button>
            )}
          </div>

          <div className="ac-book-page ac-page-right flip-pages">
            {rightPages[page]}
            {/* Right arrow at bottom right */}
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