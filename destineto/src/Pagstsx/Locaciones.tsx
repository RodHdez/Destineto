import { useNavigate } from 'react-router-dom';
import '../Pagscss/Locaciones.css';

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

function Locaciones() {
  const navigate = useNavigate();

  return (
    <div className="lo-scene">
      <div className="lo-bg" aria-hidden="true" />

      {/* Indicador de pestaña superior */}
      <div className="lo-current-tab">
        <span className="lo-current-tab__dot" />
        Locaciones
      </div>

      <div className="lo-journal open-book">

        {/* Estructura de la tapa trasera */}
        <div className="lo-back-cover" aria-hidden="true" />

        {/* Cuerpo de páginas abiertas */}
        <div className="lo-book-body">
          
          {/* PÁGINA IZQUIERDA */}
          <div className="lo-book-page lo-page-left">
            <div className="lo-page-content">
              <h1 className="lo-title">Nuestras<br />Locaciones</h1>
              <div className="lo-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
            </div>
          </div>

          {/* PÁGINA DERECHA */}
          <div className="lo-book-page lo-page-right">
            <div className="lo-page-content">
              <p className="lo-text">
                Cada uno de nuestros destinos ha sido seleccionado meticulosamente para ofrecerte un equilibrio perfecto entre confort, autenticidad y belleza natural.
              </p>
              <div className="lo-list-locations">
                <div className="lo-location-item">
                  <strong>• Refugios de Montaña:</strong> Cabañas rústicas con vistas panorámicas a las cordilleras.
                </div>
                <div className="lo-location-item">
                  <strong>• Villas Costeras:</strong> Espacios exclusivos a pocos pasos de playas vírgenes.
                </div>
                <div className="lo-location-item">
                  <strong>• Escapes Urbanos:</strong> Lofts modernos en el corazón histórico de las ciudades más vibrantes.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Anillos Centrales */}
        <div className="lo-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="lo-ring" />
          ))}
        </div>

        {/* Barra de Marcadores laterales */}
        <nav className="lo-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="lo-bookmark"
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => navigate(bm.path)}
            >
              {bm.label}
            </button>
          ))}
        </nav>

      </div>
    </div>
  );
}

export default Locaciones;