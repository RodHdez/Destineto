import '../Pagscss/Contacto.css';
import '../PageFlip.css' 
import useFlipNavigate from '../useFlipNavigate';


const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
];

function Contacto() {
   const flipTo = useFlipNavigate()

  return (
    <div className="co-scene">
      <div className="co-bg" aria-hidden="true" />

      {/* Pestaña indicadora superior */}
      <div className="co-current-tab">
        <span className="co-current-tab__dot" />
        Contáctanos
      </div>

      
        <div className="co-journal open-book flip-journal">

        {/* Estructura de la tapa trasera */}
        <div className="co-back-cover" aria-hidden="true" />

        {/* Cuerpo de páginas del libro abierto */}
        <div className="co-book-body">
          
          {/* PÁGINA IZQUIERDA */}
          <div className="co-book-page co-page-left flip-pages-left">
            <div className="co-page-content">
              <h1 className="co-title">Escríbenos<br />un Mensaje</h1>
              <div className="co-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
              
              <div className="co-info-block">
                <span className="co-info-label">Correspondencia</span>
                <p className="co-info-text">contacto@destineto.com</p>
                <p className="co-info-text">+1 (555) 019-2834</p>
              </div>
            </div>
          </div>

          {/* PÁGINA DERECHA */}
          <div className="co-book-page co-page-right flip-pages">
            <div className="co-page-content">
              <form className="co-form" onSubmit={(e) => e.preventDefault()}>
                <div className="co-form-group">
                  <label className="co-label">Tu Correo Electrónico</label>
                  <input type="email" className="co-input" placeholder="ejemplo@correo.com" />
                </div>

                <div className="co-form-group">
                  <label className="co-label">Asunto</label>
                  <input type="text" className="co-input" placeholder="¿En qué podemos ayudarte?" />
                </div>

                <div className="co-form-group">
                  <label className="co-label">Tu Mensaje o Nota</label>
                  <textarea className="co-textarea" rows={4} placeholder="Escribe tu bitácora aquí..." />
                </div>

                <button type="submit" className="co-submit-btn">
                  Enviar Nota
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Anillos Centrales */}
        <div className="co-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="co-ring" />
          ))}
        </div>

        {/* Barra de Marcadores laterales */}
        <nav className="co-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="co-bookmark"
              style={{ '--i': i } as React.CSSProperties}
              onClick={() =>flipTo(bm.path)}
            >
              {bm.label}
            </button>
          ))}
        </nav>

      </div>
    </div>
  );
}

export default Contacto;