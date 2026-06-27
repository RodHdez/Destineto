import { useState } from 'react'
import miniTicketImg from '../assets/Tickets Dvalentine.png'
import expandedTicketImg from '../assets/Tickets DValentineExp.png'
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

interface Package {
  id: string
  nombre: string
  tipo: 'Evento' | 'Experiencia' | 'Estadía'
  invitados: string
  duracion: string
  precio: string
  precioAdicional: string
  amenidades: string[]
  precioRango: string
  tapeColor: string
}

const packages: Package[] = [
  { id: 'mama', nombre: 'Paquete Mamá', tipo: 'Experiencia', invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], precioRango: 'Desde $XX', tapeColor: '#e8a0a0' },
  { id: 'papa', nombre: 'Paquete Papá', tipo: 'Experiencia', invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], precioRango: 'Desde $XX', tapeColor: '#a0b4e8' },
  { id: 'fiestas-agostinas', nombre: 'Fiestas Agostinas', tipo: 'Evento', invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], precioRango: 'Desde $XX', tapeColor: '#e8d080' },
  { id: 'secretaria', nombre: 'Paquete Secretaria', tipo: 'Experiencia', invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], precioRango: 'Desde $XX', tapeColor: '#b0e0a0' },
  { id: 'almuerzo-navidad', nombre: 'Almuerzo Empresarial Navidad', tipo: 'Evento', invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], precioRango: 'Desde $XX', tapeColor: '#e8a0a0' },
  { id: 'fin-de-ano', nombre: 'Fin de Año', tipo: 'Evento', invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], precioRango: 'Desde $XX', tapeColor: '#c0a0e8' },
  { id: 'cumple', nombre: 'Cumpleaños', tipo: 'Evento', invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], precioRango: 'Desde $XX', tapeColor: '#e8c0a0' },
  { id: 'boda', nombre: 'Boda', tipo: 'Evento', invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], precioRango: 'Desde $XX', tapeColor: '#f0e0c0' },
]

const spreads = [packages.slice(0, 4), packages.slice(4, 8)]
const rotations = [-2.5, 1.8, -1.2, 2.1, -1.8, 2.4, -2.0, 1.5]

interface MiniTicketProps {
  pkg: Package
  onOpen: (pkg: Package) => void
  rotation: number
}

function MiniTicket({ pkg, onOpen, rotation }: MiniTicketProps) {
  return (
    <div
      className="pa-ticket-mini"
      style={{ '--rotation': `${rotation}deg` } as React.CSSProperties}
      onClick={() => onOpen(pkg)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen(pkg)}
      aria-label={`Ver detalles de ${pkg.nombre}`}
    >
      <div
        className="pa-ticket-tape"
        style={{ background: pkg.tapeColor }}
        aria-hidden="true"
      />

      <div
        className="pa-ticket-mini-shell"
        style={{ backgroundImage: `url(${miniTicketImg})` }}
      >
        <div className="pa-ticket-mini-img-area">
          <span className="pa-ticket-mini-name">{pkg.nombre}</span>
          <span className="pa-ticket-mini-tipo">{pkg.tipo}</span>
          <span className="pa-ticket-mini-precio">{pkg.precioRango}</span>
        </div>
        <div className="pa-ticket-mini-stub" aria-hidden="true" />
      </div>
    </div>
  )
}

interface ExpandedTicketProps {
  pkg: Package
  onClose: () => void
}

function ExpandedTicket({ pkg, onClose }: ExpandedTicketProps) {
  return (
    <div
      className="pa-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={pkg.nombre}
    >
      <div
        className="pa-ticket-expanded"
        style={{ backgroundImage: `url(${expandedTicketImg})` }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="pa-ticket-tape pa-ticket-tape--expanded"
          style={{ background: pkg.tapeColor }}
          aria-hidden="true"
        />

        <div className="pa-ticket-exp-img-area">
          <div className="pa-ticket-exp-img-label">
            <span className="pa-ticket-exp-name">{pkg.nombre}</span>
            <span className="pa-ticket-exp-tipo">{pkg.tipo}</span>
          </div>
        </div>

        <div className="pa-ticket-exp-content">
          <div className="pa-ticket-detail-grid">
            <div className="pa-ticket-detail">
              <span className="pa-ticket-detail-label">Nombre del Paquete</span>
              <span className="pa-ticket-detail-value">{pkg.nombre}</span>
            </div>
            <div className="pa-ticket-detail">
              <span className="pa-ticket-detail-label">Tipo de Reserva</span>
              <span className="pa-ticket-detail-value">{pkg.tipo}</span>
            </div>
            <div className="pa-ticket-detail">
              <span className="pa-ticket-detail-label">Número de Invitados</span>
              <span className="pa-ticket-detail-value">{pkg.invitados}</span>
            </div>
            <div className="pa-ticket-detail">
              <span className="pa-ticket-detail-label">Duración de Reserva</span>
              <span className="pa-ticket-detail-value">{pkg.duracion}</span>
            </div>
            <div className="pa-ticket-detail">
              <span className="pa-ticket-detail-label">Precio</span>
              <span className="pa-ticket-detail-value">{pkg.precio}</span>
            </div>
            <div className="pa-ticket-detail">
              <span className="pa-ticket-detail-label">Precio por Invitado Adicional</span>
              <span className="pa-ticket-detail-value">{pkg.precioAdicional}</span>
            </div>
          </div>

          <div className="pa-ticket-amenidades">
            <span className="pa-ticket-detail-label">Amenidades Incluidas</span>
            <ul className="pa-ticket-amenidades-list">
              {pkg.amenidades.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pa-ticket-exp-perforation" aria-hidden="true" />

        <div className="pa-ticket-exp-barcode" aria-hidden="true">
          <span className="pa-ticket-barcode-num">DESTINETO · {pkg.id.toUpperCase()}</span>
        </div>

        <button className="pa-ticket-close" onClick={onClose} aria-label="Cerrar">✕</button>
      </div>
    </div>
  )
}

function Paquetes() {
  const flipTo = useFlipNavigate()
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<Package | null>(null)

  const currentSpread = spreads[page] ?? []
  const leftTickets  = currentSpread.slice(0, 2)
  const rightTickets = currentSpread.slice(2, 4)
  const offset = page * 4

  const flipAnimation = (forward: boolean, then: () => void) => {
    const right = document.querySelector('.flip-pages') as HTMLElement | null
    const left  = document.querySelector('.flip-pages-left') as HTMLElement | null
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

  const goNext = () => { if (page < spreads.length - 1) flipAnimation(true,  () => setPage(p => p + 1)) }
  const goPrev = () => { if (page > 0)                  flipAnimation(false, () => setPage(p => p - 1)) }

  return (
    <div className="pa-scene">
      <div className="pa-bg" aria-hidden="true" />

      <div className="pa-current-tab">
        <span className="pa-current-tab__dot" />
        Paquetes de Viaje
      </div>

      <div className="pa-journal open-book flip-journal">
        <div className="pa-back-cover" aria-hidden="true" />

        <div className="pa-book-body">
          <div className="pa-book-page pa-page-left flip-pages-left">
            <div className="pa-page-content pa-page-content--tickets">
              <div className="pa-page-header">
                <span className="pa-eyebrow">Nuestros</span>
                <h1 className="pa-title">Paquetes</h1>
                <div className="pa-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
              </div>
              <div className="pa-ticket-grid">
                {leftTickets.map((pkg, i) => (
                  <MiniTicket key={pkg.id} pkg={pkg} onOpen={setSelected} rotation={rotations[offset + i]} />
                ))}
              </div>
            </div>
            {page > 0 && (
              <button className="pa-arrow pa-arrow-left" onClick={goPrev}>←</button>
            )}
          </div>

          <div className="pa-book-page pa-page-right flip-pages">
            <div className="pa-page-content pa-page-content--tickets">
              <div className="pa-ticket-grid">
                {rightTickets.map((pkg, i) => (
                  <MiniTicket key={pkg.id} pkg={pkg} onOpen={setSelected} rotation={rotations[offset + 2 + i]} />
                ))}
              </div>
            </div>
            {page < spreads.length - 1 && (
              <button className="pa-arrow pa-arrow-right" onClick={goNext}>→</button>
            )}
          </div>
        </div>

        <div className="pa-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="pa-ring" />
          ))}
        </div>

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

        <nav className="pa-page-tabs" aria-label="Página de paquetes">
          {spreads.map((_, i) => (
            <button
              key={i}
              className={`pa-page-tab ${i === page ? 'pa-page-tab--active' : ''}`}
              onClick={() => i !== page && (i > page ? goNext() : goPrev())}
              aria-label={`Página ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>

      {selected && (
        <ExpandedTicket pkg={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

export default Paquetes;