import { useNavigate } from 'react-router-dom';
import '../Pagscss/Acerca.css';
import FlipPage from '../Flippage';
import useFlipNavigate from '../useFlipNavigate'

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

function Acerca() {
  const navigate = useNavigate();

  return (
    <FlipPage>
    <div className="ac-scene">
      <div className="ac-bg" aria-hidden="true" />

      {/* Independent indicator tab */}
      <div className="ac-current-tab">
        <span className="ac-current-tab__dot" />
        Acerca de Nosotros
      </div>

      <div className="ac-journal open-book">

        {/* Back cover structure */}
        <div className="ac-back-cover" aria-hidden="true" />

        {/* Inner open pages */}
        <div className="ac-book-body">
          
          {/* LEFT PAGE */}
          <div className="ac-book-page ac-page-left">
            <div className="ac-page-content">
              <h1 className="ac-title">Acerca de</h1>
              <div className="ac-logo-box">
                <span className="ac-logo-text">LOGO DE<br />MARCA</span>
              </div>
            </div>
          </div>

          {/* RIGHT PAGE */}
          <div className="ac-book-page ac-page-right">
            <div className="ac-page-content">
              <p className="ac-text">
                Bienvenido a nuestro rincón del mundo. En <em>"Alquileres y Destineto"</em>, 
                nos dedicamos a transformar viajes ordinarios en bitácoras llenas de historias inolvidables.
              </p>
              <p className="ac-text">
                Nuestra misión es guiarte a través de los destinos más cautivadores, ofreciendo 
                hospedajes y experiencias premium adaptadas a tu estilo de aventura.
              </p>
            </div>
          </div>

        </div>

        {/* Central Rings */}
        <div className="ac-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="ac-ring" />
          ))}
        </div>

        {/* Bookmarks bar */}
        <nav className="ac-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="ac-bookmark"
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

export default Acerca;