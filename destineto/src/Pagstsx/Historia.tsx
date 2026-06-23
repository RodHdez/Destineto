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
  // Spread 1 — Conoce a Neto
  <div className="hi-page-content hi-page-content--centered">
    <span className="hi-eyebrow">El corazón de Destineto</span>
    <h1 className="hi-title">Conoce<br />a <em>Neto</em></h1>
    <div className="hi-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    {/* Photo placeholder */}
    <div className="hi-photo-placeholder" aria-label="Foto de Neto">
      <span className="hi-photo-label">Foto de<br />Neto</span>
    </div>
  </div>,

  // Spread 2 — El Nombre
  <div className="hi-page-content hi-page-content--centered">
    <span className="hi-eyebrow">Un nombre con historia</span>
    <h2 className="hi-title">¿Por qué<br /><em>Destineto?</em></h2>
    <div className="hi-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <p className="hi-aside">Donde quiera que te proveamos estadía, su nombre es nuestro sello de calidad.</p>
  </div>,

  // Spread 3 — Nuestra Historia
  <div className="hi-page-content hi-page-content--centered">
    <span className="hi-eyebrow">Cómo empezó todo</span>
    <h2 className="hi-title">Nuestra<br />Historia</h2>
    <div className="hi-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <p className="hi-aside">"Un cuaderno de viajes que hoy compartimos contigo."</p>
  </div>,
]

const rightPages = [
  // Spread 1 — Neto body
  <div className="hi-page-content">
    <p className="hi-drop-cap">
      Detrás de cada propiedad, cada experiencia y cada detalle cuidado hay un hombre: <strong>Neto</strong>. Abuelo firme y bondadoso, gran anfitrión, constructor hábil y educado a la vieja usanza; con la capacidad de adaptarse a cualquier reto y la cercanía que hacen sentir a todos como en casa.
    </p>
    <p className="hi-text">
      Su vida entera ha sido la inspiración y la base sobre la que construimos nuestro servicio. Cuando nos eliges, no solo eliges un destino; eliges apoyar a alguien reconocible, cercano y familiar. Eliges a Neto.
    </p>
    <div className="hi-pull-quote">
      "Cuando nos eliges,<br />eliges a Neto."
    </div>
  </div>,

  // Spread 2 — El nombre body
  <div className="hi-page-content">
    <p className="hi-text">
      Neto es el apodo con el que toda su familia y amigos conocen a <strong>Jose Ernesto</strong> desde siempre.
    </p>
    <p className="hi-text">
      Nuestro nombre nace de la unión de dos palabras: Destinos y Neto; porque donde quiera que te proveamos estadía, tienes la garantía de que ha sido creada, cultivada y supervisada por nuestro anfitrión estrella.
    </p>
    <p className="hi-text">
      Su nombre es nuestro sello de calidad.
    </p>
  </div>,

  // Spread 3 — Historia body
  <div className="hi-page-content">
    <p className="hi-drop-cap">
      Todo comenzó con un mapa viejo, una mochila ligera y un deseo insaciable de descubrir lugares auténticos. A lo largo de los años recorrimos miles de kilómetros seleccionando propiedades y experiencias que no solo ofrecen un lugar donde dormir, sino un portal hacia la cultura local.
    </p>
    <p className="hi-text">
      Nuestra historia es un cuaderno de viajes que hoy compartimos contigo; aunque ya hemos llenado las primeras páginas, te invitamos a escribir tu propio capítulo… juntos podemos llenar el resto de recuerdos y experiencias que recordarás toda la vida.
    </p>
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

  const goToPage = (target: number) => {
    if (target === page) return
    const right = document.querySelector('.flip-pages') as HTMLElement | null
    const left = document.querySelector('.flip-pages-left') as HTMLElement | null
    if (!right || !left) { setPage(target); return }

    const forward = target > page
    ;[right, left].forEach(el => { el.style.animation = 'none' })
    void right.offsetHeight

    if (forward) {
      right.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 1, 1), opacity 0.4s ease-in'
      right.style.transformOrigin = 'left center'
      right.style.transform = 'perspective(1200px) rotateY(-90deg)'
      right.style.opacity = '0'
      left.style.transition = 'opacity 0.3s ease-in'
      left.style.opacity = '0'
    } else {
      left.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 1, 1), opacity 0.4s ease-in'
      left.style.transformOrigin = 'right center'
      left.style.transform = 'perspective(1200px) rotateY(90deg)'
      left.style.opacity = '0'
      right.style.transition = 'opacity 0.3s ease-in'
      right.style.opacity = '0'
    }

    setTimeout(() => {
      setPage(target)
      if (forward) {
        right.style.transition = 'none'
        right.style.transform = 'perspective(1200px) rotateY(90deg)'
        left.style.transition = 'none'
      } else {
        left.style.transition = 'none'
        left.style.transform = 'perspective(1200px) rotateY(-90deg)'
        right.style.transition = 'none'
      }
      setTimeout(() => {
        right.style.transition = 'transform 0.5s cubic-bezier(0, 0.55, 0.45, 1), opacity 0.4s ease-out'
        right.style.transform = 'perspective(1200px) rotateY(0deg)'
        right.style.opacity = '1'
        left.style.transition = 'opacity 0.4s ease-out'
        left.style.opacity = '1'
        left.style.transform = 'perspective(1200px) rotateY(0deg)'
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

        <nav className="hi-page-tabs" aria-label="Ir a página">
          {rightPages.map((_, i) => (
            <button
              key={i}
              className={`hi-page-tab ${i === page ? 'hi-page-tab--active' : ''}`}
              onClick={() => goToPage(i)}
              aria-label={`Página ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Historia;