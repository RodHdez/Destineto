import { useState } from 'react'
import '../Pagscss/Locaciones.css';
import '../PageFlip.css' 
import useFlipNavigate from '../useFlipNavigate';

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'reservas',   label: 'Reservas',          path: '/reservas'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

// ── Property info modal ───────────────────────────────────
interface PropertyInfo {
  nombre: string
  direccion: string
  contacto: string
  checkin: string
  checkout: string
  amenidades: string[]
  mapsUrl: string
}

const cabanaInfo: PropertyInfo = {
  nombre: 'La Cabaña del Tío Neto',
  direccion: 'Los Naranjos, El Salvador — Por definir',
  contacto: 'contacto@destineto.com · +503 0000-0000',
  checkin: '3:00 PM',
  checkout: '12:00 PM',
  mapsUrl: 'https://maps.google.com',
  amenidades: [
    'Estacionamiento accesible',
    'Lavamanos a baja altura',
    'Actividades y servicios familiares',
    'Habitaciones familiares',
    'Agua embotellada',
    'Alimentos preparados',
    'Bar',
    'Comida para niños',
    'Desayuno en la habitación',
    'Dietas especiales (bajo solicitud)',
    'Restaurante',
    'Servicio a la habitación',
    'Vino y champaña',
    'Jardín',
    'Lounge o sala de estar',
    'Terraza',
  ],
}

const barrinaInfo: PropertyInfo = {
  nombre: 'La Barriña',
  direccion: 'Barra de Santiago, Ahuachapán, El Salvador — Por definir',
  contacto: 'contacto@destineto.com · +503 0000-0000',
  checkin: '3:00 PM',
  checkout: '12:00 PM',
  mapsUrl: 'https://maps.google.com',
  amenidades: [
    'Piscina comunitaria',
    'Acceso directo a la playa',
    'Estacionamiento accesible',
    'Actividades y servicios familiares',
    'Habitaciones familiares',
    'Agua embotellada',
    'Alimentos preparados',
    'Bar',
    'Comida para niños',
    'Desayuno en la habitación',
    'Dietas especiales (bajo solicitud)',
    'Restaurante',
    'Servicio a la habitación',
    'Vino y champaña',
    'Jardín',
    'Terraza',
  ],
}

// ── Property info modal component ─────────────────────────
function PropertyModal({ info, onClose }: { info: PropertyInfo; onClose: () => void }) {
  return (
    <div className="lo-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lo-modal" onClick={e => e.stopPropagation()}>
        <button className="lo-modal-close" onClick={onClose} aria-label="Cerrar">✕</button>

        {/* Header */}
        <div className="lo-modal-header">
          <div className="lo-modal-img-placeholder" aria-label="Foto de la propiedad">
            <span className="lo-modal-img-label">📷</span>
          </div>
          <div className="lo-modal-header-info">
            <h2 className="lo-modal-title">{info.nombre}</h2>
            <p className="lo-modal-address">📍 {info.direccion}</p>
            <p className="lo-modal-contact">✉ {info.contacto}</p>
            <a href={info.mapsUrl} target="_blank" rel="noopener noreferrer" className="lo-modal-maps-btn">
              Ver en Google Maps →
            </a>
          </div>
        </div>

        <div className="lo-modal-divider" />

        {/* Check-in / Check-out */}
        <div className="lo-modal-checktimes">
          <div className="lo-modal-checktime">
            <span className="lo-modal-check-label">Check-in</span>
            <span className="lo-modal-check-value">{info.checkin}</span>
          </div>
          <div className="lo-modal-checktime-divider" />
          <div className="lo-modal-checktime">
            <span className="lo-modal-check-label">Check-out</span>
            <span className="lo-modal-check-value">{info.checkout}</span>
          </div>
        </div>

        <div className="lo-modal-divider" />

        {/* Amenidades */}
        <div className="lo-modal-section">
          <h3 className="lo-modal-section-title">Amenidades</h3>
          <ul className="lo-modal-amenidades">
            {info.amenidades.map((a, i) => (
              <li key={i} className="lo-modal-amenidad">✦ {a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// ── Postcard component ────────────────────────────────────
function Postcard({ info, prefix }: { info: PropertyInfo; prefix: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="lo-postcard"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(true)}
        aria-label={`Ver información de ${info.nombre}`}
      >
        {/* Postcard image placeholder */}
        <div className="lo-postcard-img" aria-label="Foto de la propiedad">
          <span className="lo-postcard-img-icon">📷</span>
        </div>

        {/* Postcard bottom strip */}
        <div className="lo-postcard-strip">
          <span className="lo-postcard-label">PROPERTY INFO</span>
          <span className="lo-postcard-sub">{info.nombre}</span>
          <span className="lo-postcard-hint">Toca para ver más →</span>
        </div>

        {/* Postcard stamp */}
        <div className="lo-postcard-stamp" aria-hidden="true">
          <span className="lo-postcard-stamp-text">✦</span>
        </div>
      </div>

      {open && <PropertyModal info={info} onClose={() => setOpen(false)} />}
    </>
  )
}

// ── Location data ─────────────────────────────────────────
const cabanaLeft = [
  <div className="lo-page-content lo-page-content--centered">
    <span className="lo-eyebrow">Locación 01 · Los Naranjos</span>
    <h1 className="lo-title">La Cabaña del<br /><em>Tío Neto</em></h1>
    <div className="lo-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <Postcard info={cabanaInfo} prefix="cabana" />
  </div>,
  <div className="lo-page-content lo-page-content--centered">
    <span className="lo-eyebrow">La filosofía detrás del lugar</span>
    <h2 className="lo-title">El espíritu<br />de <em>la cabaña</em></h2>
    <div className="lo-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <div className="lo-photo-placeholder" aria-label="Foto interior de La Cabaña">
      <span className="lo-photo-label">📷<br />Interior<br />de la cabaña</span>
    </div>
  </div>,
  <div className="lo-page-content lo-page-content--centered">
    <span className="lo-eyebrow">Conoce la zona</span>
    <h2 className="lo-title">Los<br /><em>Naranjos</em></h2>
    <div className="lo-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <div className="lo-photo-placeholder" aria-label="Foto de Los Naranjos">
      <span className="lo-photo-label">📷<br />Los Naranjos<br />desde el cerro</span>
    </div>
  </div>,
]

const cabanaRight = [
  <div className="lo-page-content">
    <p className="lo-drop-cap">
      Enclavada entre los frondosos bosques y las calmadas nieblas de Los Naranjos, La Cabaña del Tío Neto es un refugio construido para simular la manera de antes; paredes blancas recubiertas de cal pura, sin adornos innecesarios, honestas y sólidas como la mano que las levantó.
    </p>
    <p className="lo-text">
      El ambiente montañoso te envuelve desde el primer momento: días soleados que iluminan el verde profundo del bosque, y noches neblinosas que apagan el ruido del mundo. Aquí, la tranquilidad no es un lujo sino el estado natural de las cosas.
    </p>
  </div>,
  <div className="lo-page-content">
    <p className="lo-text">
      Neto conoció la historia de una cabaña; un lugar sencillo que se convirtió en símbolo de dignidad, igualdad y la lucha por un mundo más justo. Lo que más le marcó fue el mensaje: que un hogar humilde puede ser semilla de cambio, que la calidez de una persona puede romper estereotipos, y que la paz se construye, piedra a piedra, igual que una casa.
    </p>
    <div className="lo-rule" />
    <p className="lo-text">
      Esa filosofía vive en esta cabaña. Lo que antes fue un rincón apartado y olvidado de la montaña, hoy es un espacio acogedor, pacífico y lleno de vida; la prueba viviente de que los lugares, como las personas, pueden transformarse.
    </p>
  </div>,
  <div className="lo-page-content">
    <p className="lo-text">
      A tan solo 78 kilómetros de San Salvador, Los Naranjos es uno de esos lugares que detienen el aliento. Fotos del lugar han circulado en redes sociales siendo confundidas con montañas de Noruega o pueblos escondidos de Irlanda… y no es difícil entender por qué.
    </p>
    <div className="lo-rule" />
    <p className="lo-text">
      El cerro El Pilón, corazón de esta zona, se eleva hasta los 2,050 metros sobre el nivel del mar, cubierto de cafetales de especialidad y orquídeas silvestres propias de climas fríos. Neto no eligió este lugar por accidente; lo eligió porque creyó, como siempre ha creído, que lo más extraordinario de El Salvador está esperando ser descubierto por quienes se atreven a buscar.
    </p>
  </div>,
]

const barrinaLeft = [
  <div className="lo-page-content lo-page-content--centered">
    <span className="lo-eyebrow">Locación 02 · Barra de Santiago</span>
    <h1 className="lo-title"><em>La Barriña</em></h1>
    <div className="lo-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <Postcard info={barrinaInfo} prefix="barrina" />
  </div>,
  <div className="lo-page-content lo-page-content--centered">
    <span className="lo-eyebrow">El origen del nombre</span>
    <h2 className="lo-title">¿Por qué<br /><em>La Barriña?</em></h2>
    <div className="lo-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <div className="lo-photo-placeholder" aria-label="Foto de la playa en La Barriña">
      <span className="lo-photo-label">📷<br />La playa<br />desde la terraza</span>
    </div>
  </div>,
  <div className="lo-page-content lo-page-content--centered">
    <span className="lo-eyebrow">Conoce la zona</span>
    <h2 className="lo-title">Barra de<br /><em>Santiago</em></h2>
    <div className="lo-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <div className="lo-photo-placeholder" aria-label="Foto de la Barra de Santiago">
      <span className="lo-photo-label">📷<br />Barra de<br />Santiago</span>
    </div>
  </div>,
]

const barrinaRight = [
  <div className="lo-page-content">
    <p className="lo-drop-cap">
      Enclavada en la costa de La Barra de Santiago, La Barriña es un refugio tropical donde el sol veraniego y el sonido calmado de las olas marcan el ritmo del día. Ya sea que te refresques en la piscina comunitaria o te adentres en las cálidas aguas de la playa, cada momento aquí se siente como una celebración tranquila de la vida.
    </p>
    <p className="lo-text">
      Este no es un lugar para el ajetreo; es un lugar para recordar cómo se siente no tener prisa.
    </p>
  </div>,
  <div className="lo-page-content">
    <p className="lo-text">
      El nombre surgió durante una noche social entre Neto y sus amigos. La bebida de la noche había sido la caipirinha; un famoso cóctel brasileño de cachaça, limón y azúcar (declarado Patrimonio Cultural de Brasil en 2003).
    </p>
    <div className="lo-rule" />
    <p className="lo-text">
      Entre risas y brindis, el nombre fue tomando forma: la caipirinha se encontró con La Barra y nació La Barriña; un nombre que lleva el espíritu de esa noche, de esa playa y de ese anfitrión que sabe exactamente cómo hacer sentir bien a sus invitados.
    </p>
  </div>,
  <div className="lo-page-content">
    <p className="lo-text">
      La Barra de Santiago no es una playa cualquiera, es Sitio de Importancia Internacional; hogar de cocodrilos americanos, tortugas marinas, cangrejos azules y especies en peligro de extinción únicas en Mesoamérica.
    </p>
    <div className="lo-rule" />
    <p className="lo-text">
      Sus aguas guardan además la leyenda de Chasca, una historia indígena de amor y valentía que los pescadores locales aún reverencian hoy. Cuando te quedas en La Barriña, no solo visitas una playa; te conviertes, por unos días, en parte de un lugar con alma propia.
    </p>
  </div>,
]

const locations = [
  { id: 'cabana',  label: 'La Cabaña',  icon: '🏡', left: cabanaLeft,  right: cabanaRight  },
  { id: 'barrina', label: 'La Barriña', icon: '🏖️', left: barrinaLeft, right: barrinaRight },
]

function Locaciones() {
  const flipTo = useFlipNavigate()
  const [locationIdx, setLocationIdx] = useState(0)
  const [page, setPage] = useState(0)

  const currentLeft  = locations[locationIdx].left
  const currentRight = locations[locationIdx].right

  const flipAnimation = (forward: boolean, then: () => void) => {
    const right = document.querySelector('.flip-pages') as HTMLElement | null
    const left = document.querySelector('.flip-pages-left') as HTMLElement | null
    if (!right || !left) { then(); return }
    ;[right, left].forEach(el => { el.style.animation = 'none' })
    void right.offsetHeight
    if (forward) {
      right.style.transition = 'transform 0.5s cubic-bezier(0.4,0,1,1), opacity 0.4s ease-in'
      right.style.transformOrigin = 'left center'
      right.style.transform = 'perspective(1200px) rotateY(-90deg)'
      right.style.opacity = '0'
      left.style.transition = 'opacity 0.3s ease-in'
      left.style.opacity = '0'
    } else {
      left.style.transition = 'transform 0.5s cubic-bezier(0.4,0,1,1), opacity 0.4s ease-in'
      left.style.transformOrigin = 'right center'
      left.style.transform = 'perspective(1200px) rotateY(90deg)'
      left.style.opacity = '0'
      right.style.transition = 'opacity 0.3s ease-in'
      right.style.opacity = '0'
    }
    setTimeout(() => {
      then()
      right.style.transition = 'none'
      right.style.transform = forward ? 'perspective(1200px) rotateY(90deg)' : 'perspective(1200px) rotateY(0deg)'
      left.style.transition = 'none'
      left.style.transform = 'perspective(1200px) rotateY(0deg)'
      setTimeout(() => {
        right.style.transition = 'transform 0.5s cubic-bezier(0,0.55,0.45,1), opacity 0.4s ease-out'
        right.style.transform = 'perspective(1200px) rotateY(0deg)'
        right.style.opacity = '1'
        left.style.transition = 'opacity 0.4s ease-out'
        left.style.opacity = '1'
      }, 20)
    }, 500)
  }

  const goNext = () => { if (page < currentRight.length - 1) flipAnimation(true, () => setPage(p => p + 1)) }
  const goPrev = () => { if (page > 0) flipAnimation(false, () => setPage(p => p - 1)) }
  const switchLocation = (idx: number) => {
    if (idx === locationIdx) return
    flipAnimation(idx > locationIdx, () => { setLocationIdx(idx); setPage(0) })
  }

  return (
    <div className="lo-scene">
      <div className="lo-bg" aria-hidden="true" />
      <div className="lo-current-tab">
        <span className="lo-current-tab__dot" />
        Locaciones
      </div>

      <div className="lo-journal open-book flip-journal">
        <div className="lo-back-cover" aria-hidden="true" />

        <div className="lo-book-body">
          <div className="lo-book-page lo-page-left flip-pages-left">
            {currentLeft[page]}
            {page > 0 && <button className="lo-arrow lo-arrow-left" onClick={goPrev}>←</button>}
          </div>
          <div className="lo-book-page lo-page-right flip-pages">
            {currentRight[page]}
            {page < currentRight.length - 1 && <button className="lo-arrow lo-arrow-right" onClick={goNext}>→</button>}
          </div>
        </div>

        <div className="lo-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => <div key={i} className="lo-ring" />)}
        </div>

        <nav className="lo-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button key={bm.id} className="lo-bookmark" style={{ '--i': i } as React.CSSProperties} onClick={() => flipTo(bm.path)}>
              {bm.label}
            </button>
          ))}
        </nav>

        <nav className="lo-location-tabs" aria-label="Cambiar locación">
          {locations.map((loc, i) => (
            <button key={loc.id} className={`lo-location-tab ${i === locationIdx ? 'lo-location-tab--active' : ''}`} onClick={() => switchLocation(i)} aria-label={loc.label}>
              <span className="lo-location-tab__icon">{loc.icon}</span>
              <span className="lo-location-tab__label">{loc.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Locaciones;