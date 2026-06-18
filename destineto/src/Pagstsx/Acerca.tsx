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

function Acerca() {
  const flipTo = useFlipNavigate()


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
          </div>

          <div className="ac-book-page ac-page-right flip-pages">
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