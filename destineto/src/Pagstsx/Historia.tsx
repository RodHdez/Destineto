import { useNavigate } from 'react-router-dom';
import '../Pagscss/Historia.css';
import FlipPage from '../Flippage';
import useFlipNavigate from '../useFlipNavigate'


const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

function Historia() {
  const navigate = useNavigate();

  return (
    <FlipPage>
    <div className="hi-scene">
      <div className="hi-bg" aria-hidden="true" />

      {/* Indicador de pestaña superior */}
      <div className="hi-current-tab">
        <span className="hi-current-tab__dot" />
        Nuestra Historia
      </div>

      <div className="hi-journal open-book">

        {/* Estructura de la tapa trasera */}
        <div className="hi-back-cover" aria-hidden="true" />

        {/* Cuerpo de páginas abiertas */}
        <div className="hi-book-body">
          
          {/* PÁGINA IZQUIERDA */}
          <div className="hi-book-page hi-page-left">
            <div className="hi-page-content">
              <h1 className="hi-title">Nuestra<br />Historia</h1>
              <div className="hi-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
            </div>
          </div>

          {/* PÁGINA DERECHA */}
          <div className="hi-book-page hi-page-right">
            <div className="hi-page-content">
              <p className="hi-text">
                Todo comenzó con un mapa viejo, una mochila ligera y un deseo insaciable de descubrir lugares auténticos. Lo que empezó como un diario de viaje personal se convirtió en lo que hoy es <em>"Alquileres y Destineto"</em>.
              </p>
              <p className="hi-text">
                A lo largo de los años, hemos recorrido miles de kilómetros para seleccionar propiedades y experiencias que no solo ofrecen un lugar donde dormir, sino un portal hacia la cultura local.
              </p>
              <p className="hi-text">
                Hoy compartimos estas bitácoras contigo, invitándote a escribir tu propio capítulo en cada destino que elijas.
              </p>
            </div>
          </div>

        </div>

        {/* Anillos Centrales */}
        <div className="hi-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="hi-ring" />
          ))}
        </div>

        {/* Barra de Marcadores laterales */}
        <nav className="hi-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="hi-bookmark"
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => navigate(bm.path)}
            >
              {bm.label}
            </button>
          ))}
        </nav>

      </div>
    </div>
    </FlipPage>
  );
}

export default Historia;