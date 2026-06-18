import '../Pagscss/Paquetes.css';
import '../PageFlip.css' 
import useFlipNavigate from '../useFlipNavigate';

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

function Paquetes() {
   const flipTo = useFlipNavigate()

  return (
    <div className="pa-scene">
      <div className="pa-bg" aria-hidden="true" />

      {/* Pestaña indicadora superior */}
      <div className="pa-current-tab">
        <span className="pa-current-tab__dot" />
        Paquetes de Viaje
      </div>

      <div className="pa-journal open-book flip-journal">

        {/* Estructura de la tapa trasera */}
        <div className="pa-back-cover" aria-hidden="true" />

        {/* Cuerpo de páginas del libro abierto */}
        <div className="pa-book-body">
          
          {/* PÁGINA IZQUIERDA */}
          <div className="pa-book-page pa-page-left flip-pages-left">
            <div className="pa-page-content">
              <h1 className="pa-title">Nuestros<br />Paquetes</h1>
              <div className="pa-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
            </div>
          </div>

          {/* PÁGINA DERECHA */}
          <div className="pa-book-page pa-page-right flip-pages">
            <div className="pa-page-content">
              <p className="pa-text">
                Diseñamos itinerarios a la medida para que solo te preocupes por coleccionar momentos. Descubre nuestras opciones más populares:
              </p>
              
              <div className="pa-packages-grid">
                <div className="pa-package-card">
                  <span className="pa-card-title">Aventura Express</span>
                  <p className="pa-card-desc">3 días de inmersión total en naturaleza indómita, con guías locales certificados.</p>
                </div>
                
                <div className="pa-package-card">
                  <span className="pa-card-title">Escape Romántico</span>
                  <p className="pa-card-desc">5 noches en villas frente al mar, cenas privadas y sesiones de spa incluidas.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Anillos Centrales */}
        <div className="pa-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="pa-ring" />
          ))}
        </div>

        {/* Barra de Marcadores laterales */}
        <nav className="pa-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="pa-bookmark"
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

export default Paquetes;