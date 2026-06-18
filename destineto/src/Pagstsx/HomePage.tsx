import '../PageFlip.css' 
import useFlipNavigate from '../useFlipNavigate'
import '../Pagscss/HomePage.css'

const bookmarks = [
  { id: 'acerca-de',  label: 'Acerca de',        path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
]

function HomePage() {
  const flipTo = useFlipNavigate()

  return (
    <div className="hp-scene">
      <div className="hp-bg" aria-hidden="true" />

      <div className="hp-current-tab">
        <span className="hp-current-tab__dot" />
        Página de Inicio
      </div>

      <div className="hp-journal open-book flip-journal">
        <div className="hp-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="hp-ring" />
          ))}
        </div>

        <div className="hp-back-cover" aria-hidden="true" />
        <div className="hp-pages-stack" aria-hidden="true">
          <div className="hp-page hp-page--1" />
          <div className="hp-page hp-page--2" />
          <div className="hp-page hp-page--3" />
        </div>

        <div className="hp-cover">
          <div className="hp-logo-box" aria-label="Logo de marca">
            <span className="hp-logo-text">LOGO DE<br />MARCA</span>
          </div>
          <p className="hp-tagline">
            Propiedad de<br />
            <em>"Alquileres y Destineto"</em>
          </p>
        </div>

        <nav className="hp-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="hp-bookmark"
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => flipTo(bm.path)}
            >
              {bm.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default HomePage