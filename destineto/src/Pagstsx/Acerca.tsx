import { useState } from 'react'
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

const leftPages = [
  // Spread 1 — intro
  <div className="ac-page-content ac-page-content--centered">
    <span className="ac-eyebrow">Quiénes Somos</span>
    <h1 className="ac-title">Acerca de<br /><em>Destineto</em></h1>
    <div className="ac-logo-box">
      <span className="ac-logo-text">LOGO DE<br />MARCA</span>
    </div>
  </div>,

  // Spread 2 — valores header
  <div className="ac-page-content ac-page-content--centered">
    <span className="ac-eyebrow">Lo que nos define</span>
    <h2 className="ac-title">Nuestros<br />Valores</h2>
    <div className="ac-vintage-divider">✦ ✦ ✦</div>
    <p className="ac-aside">Cuatro pilares que guían cada experiencia que ofrecemos.</p>
  </div>,

  // Spread 3 — objetivo header
  <div className="ac-page-content ac-page-content--centered">
    <span className="ac-eyebrow">Por qué existimos</span>
    <h2 className="ac-title">Objetivo<br />Principal</h2>
    <div className="ac-vintage-divider">✦ ✦ ✦</div>
    <p className="ac-aside">Conectar viajeros con lo más genuino de El Salvador.</p>
  </div>,

  // Spread 4 — visión & misión header
  <div className="ac-page-content ac-page-content--centered">
    <span className="ac-eyebrow">Hacia dónde vamos</span>
    <h2 className="ac-title">Visión<br />&amp; Misión</h2>
    <div className="ac-vintage-divider">✦ ✦ ✦</div>
  </div>,

  // Spread 5 — propuesta header
  <div className="ac-page-content ac-page-content--centered">
    <span className="ac-eyebrow">Lo que te ofrecemos</span>
    <h2 className="ac-title">Nuestra<br />Ambición</h2>
    <div className="ac-vintage-divider">✦ ✦ ✦</div>
    <p className="ac-aside">Más que alojamiento — un asiento en nuestro hogar.</p>
  </div>,
]

const rightPages = [
  // Spread 1 — main philosophy
  <div className="ac-page-content">
    <p className="ac-drop-cap">
      En <strong>Destineto</strong>, creemos que los viajes tienen el poder de transformar vidas,
      no solo por los destinos que exploramos, sino por las experiencias y conexiones
      auténticas que creamos.
    </p>
    <p className="ac-text">
      Nuestro propósito es hacer de cada visita una vivencia cálida, única y profundamente
      personalizada, donde los viajeros no solo descubren lugares, sino que se sienten
      parte de nuestra familia.
    </p>
    <div className="ac-pull-quote">
      "Cada destino es una historia.<br />Nosotros somos el primer capítulo."
    </div>
  </div>,

  // Spread 2 — four values
  <div className="ac-page-content">
    <div className="ac-values-list">
      <div className="ac-value-item">
        <span className="ac-value-icon">❤</span>
        <div>
          <h3 className="ac-value-title">Cercanía</h3>
          <p className="ac-value-text">Hospitalidad genuina que hace sentir a cada cliente parte de la familia salvadoreña.</p>
        </div>
      </div>
      <div className="ac-value-item">
        <span className="ac-value-icon">✦</span>
        <div>
          <h3 className="ac-value-title">Personalización</h3>
          <p className="ac-value-text">Cada viajero es único, y cada experiencia debe serlo también.</p>
        </div>
      </div>
      <div className="ac-value-item">
        <span className="ac-value-icon">◈</span>
        <div>
          <h3 className="ac-value-title">Autenticidad</h3>
          <p className="ac-value-text">Experiencias que representan lo más genuino de nuestra cultura y tradiciones.</p>
        </div>
      </div>
      <div className="ac-value-item">
        <span className="ac-value-icon">⊕</span>
        <div>
          <h3 className="ac-value-title">Aventura y Conexión</h3>
          <p className="ac-value-text">Inmersión profunda para llevarte recuerdos significativos que trascienden el viaje.</p>
        </div>
      </div>
    </div>
  </div>,

  // Spread 3 — objetivo
  <div className="ac-page-content">
    <p className="ac-text">
      Queremos conectar con nuestra audiencia ofreciéndoles una experiencia auténtica
      que va más allá del alojamiento.
    </p>
    <p className="ac-text">
      Al colaborar con marcas locales y promover la cultura salvadoreña, buscamos ser
      la puerta de entrada a un viaje inolvidable.
    </p>
    <div className="ac-rule" />
    <p className="ac-text ac-text--italic">
      Somos más que un destino — somos el puente entre el viajero y lo más auténtico
      de El Salvador.
    </p>
  </div>,

  // Spread 4 — visión & misión
  <div className="ac-page-content">
    <div className="ac-section-block">
      <h3 className="ac-section-label">Visión</h3>
      <p className="ac-text">
        Vemos un futuro en el cual los clientes pueden visitarnos y tener una experiencia
        acogedora en diferentes lugares del país.
      </p>
    </div>
    <div className="ac-rule" />
    <div className="ac-section-block">
      <h3 className="ac-section-label">Misión</h3>
      <p className="ac-text">
        Nuestra misión es facilitar las estadías y experiencias culturales para aquellos
        que van de paseo, proveyendo experiencias personalizadas y acogedoras.
      </p>
    </div>
  </div>,

  // Spread 5 — propuesta de valor
  <div className="ac-page-content">
    <p className="ac-text">
      En Destineto, no solo te ofrecemos un lugar donde hospedarte, sino <strong>un puesto
      en nuestro hogar</strong>. Nuestra oferta se distingue por experiencias de viaje
      personalizadas que te permiten conectar profundamente con nuestra cultura, gente
      y paisajes.
    </p>
    <p className="ac-text">
      Ya sea explorando un pintoresco pueblo costero o en la paz de las montañas — te
      garantizamos una estadía acogedora que va más allá de lo convencional.
    </p>
    <div className="ac-pull-quote ac-pull-quote--small">
      "Creando recuerdos que te acompañarán toda la vida."
    </div>
  </div>,
]

function Acerca() {
  const flipTo = useFlipNavigate()
  const [page, setPage] = useState(0)

  const goNext = () => {
    const right = document.querySelector('.flip-pages') as HTMLElement | null
    const left = document.querySelector('.flip-pages-left') as HTMLElement | null
    if (!right || !left) { setPage(p => Math.min(p + 1, rightPages.length - 1)); return }

    ;[right, left].forEach(el => { el.style.animation = 'none' })
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
            {leftPages[page]}
            {page > 0 && (
              <button className="ac-arrow ac-arrow-left" onClick={goPrev}>←</button>
            )}
          </div>

          <div className="ac-book-page ac-page-right flip-pages">
            {rightPages[page]}
            {page < rightPages.length - 1 && (
              <button className="ac-arrow ac-arrow-right" onClick={goNext}>→</button>
            )}
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

        {/* Page indicator — bookmark tabs at bottom */}
        <nav className="ac-page-tabs" aria-label="Ir a página">
          {rightPages.map((_, i) => (
            <button
              key={i}
              className={`ac-page-tab ${i === page ? 'ac-page-tab--active' : ''}`}
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

export default Acerca;