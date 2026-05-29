import { useNavigate } from 'react-router-dom'
import '../Pagscss/HomePage.css'

const bookmarks = [
  { id: 'acerca-de',  label: 'Acerca de',       path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia', path: '/historia'   },
  { id: 'locaciones', label: 'Locaciones',       path: '/locaciones' },
  { id: 'paquetes',   label: 'Paquetes de Viaje',path: '/paquetes'   },
  { id: 'reservas',   label: 'Reservas',         path: '/reservas'   },
  { id: 'contacto',   label: 'Contáctanos',      path: '/contacto'   },
]

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="hp-scene">
      {/* Wooden background texture via CSS */}
      <div className="hp-bg" aria-hidden="true" />

      {/* Top bookmark — current page indicator */}
      <div className="hp-current-tab">Página de Inicio</div>

      {/* Book */}
      <div className="hp-book">
        {/* Spine */}
        <div className="hp-spine" aria-hidden="true" />

        {/* Cover */}
        <div className="hp-cover">
          {/* Logo placeholder */}
          <div className="hp-logo-placeholder" aria-label="Logo de marca">
            <div className="hp-logo-box">
              <span className="hp-logo-text">LOGO DE<br />MARCA</span>
            </div>
          </div>

          {/* Tagline */}
          <p className="hp-tagline">
            Propiedad de<br />
            <em>"Alquileres y Destineto"</em>
          </p>
        </div>

        {/* Bookmarks */}
        <nav className="hp-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="hp-bookmark"
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => navigate(bm.path)}
              aria-label={`Ir a ${bm.label}`}
            >
              <span>{bm.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default HomePage