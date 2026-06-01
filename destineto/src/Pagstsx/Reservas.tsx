import { useNavigate } from 'react-router-dom';
import '../Pagscss/Reservas.css';

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

function Reservas() {
  const navigate = useNavigate();

  return (
    <div className="re-scene">
      <div className="re-bg" aria-hidden="true" />

      {/* Pestaña indicadora superior */}
      <div className="re-current-tab">
        <span className="re-current-tab__dot" />
        Reservas
      </div>

      <div className="re-journal open-book">

        {/* Estructura de la tapa trasera */}
        <div className="re-back-cover" aria-hidden="true" />

        {/* Cuerpo de páginas del libro abierto */}
        <div className="re-book-body">
          
          {/* PÁGINA IZQUIERDA */}
          <div className="re-book-page re-page-left">
            <div className="re-page-content">
              <h1 className="re-title">Agenda tu<br />Aventura</h1>
              <div className="re-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
              <p className="re-left-note">
                "El primer paso para descubrir un destino inolvidable es fijar el día en el mapa."
              </p>
            </div>
          </div>

          {/* PÁGINA DERECHA (Simulación de Formulario / Notas de reserva) */}
          <div className="re-book-page re-page-right">
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
            </div>
          </div>

        </div>

        {/* Anillos Centrales */}
        <div className="re-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="re-ring" />
          ))}
        </div>

        {/* Barra de Marcadores laterales */}
        <nav className="re-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="re-bookmark"
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

export default Reservas;