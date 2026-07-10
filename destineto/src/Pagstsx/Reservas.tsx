import { useState, useEffect } from 'react'
import '../Pagscss/Reservas.css';
import '../PageFlip.css' 
import useFlipNavigate from '../useFlipNavigate';

const bookmarks = [
  { id: 'inicio',     label: 'Inicio',            path: '/'           },
  { id: 'acerca-de',  label: 'Acerca de',         path: '/acerca-de'  },
  { id: 'historia',   label: 'Nuestra Historia',  path: '/historia'   },
  { id: 'locaciones', label: 'Locaciones',        path: '/locaciones' },
  { id: 'paquetes',   label: 'Paquetes de Viaje', path: '/paquetes'   },
  { id: 'contacto',   label: 'Contáctanos',       path: '/contacto'   },
];

const PAQUETES = [
  'Paquete Mamá',
  'Paquete Papá',
  'Fiestas Agostinas',
  'Paquete Secretaria',
  'Almuerzo Empresarial Navidad',
  'Fin de Año',
  'Cumpleaños',
  'Boda',
]

const LOCACIONES = [
  'La Cabaña del Tío Neto — Los Naranjos',
  'La Barriña — Barra de Santiago',
]

interface BookingData {
  fechaDesde: string
  fechaHasta: string
  paquete: string
  locacion: string
  nombre: string
  email: string
  telefono: string
  direccion: string
  metodoPago: string
  numeroTarjeta: string
  expiracion: string
  cvv: string
}

const emptyBooking: BookingData = {
  fechaDesde: '', fechaHasta: '', paquete: '', locacion: '',
  nombre: '', email: '', telefono: '', direccion: '',
  metodoPago: 'tarjeta', numeroTarjeta: '', expiracion: '', cvv: '',
}

// Simple calendar component
function MiniCalendar({ selectedFrom, selectedTo, onSelect }: {
  selectedFrom: string
  selectedTo: string
  onSelect: (date: string) => void
}) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  const dayNames = ['D','L','M','M','J','V','S']

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({length: daysInMonth}, (_, i) => i + 1)]

  const dateStr = (d: number) => `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`

  const isFrom = (d: number) => dateStr(d) === selectedFrom
  const isTo   = (d: number) => dateStr(d) === selectedTo
  const isInRange = (d: number) => {
    if (!selectedFrom || !selectedTo) return false
    return dateStr(d) > selectedFrom && dateStr(d) < selectedTo
  }

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1) } else setViewMonth(m => m-1) }
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y+1) } else setViewMonth(m => m+1) }

  return (
    <div className="re-calendar">
      <div className="re-calendar-nav">
        <button className="re-cal-btn" onClick={prevMonth}>‹</button>
        <span className="re-cal-title">{monthNames[viewMonth]} {viewYear}</span>
        <button className="re-cal-btn" onClick={nextMonth}>›</button>
      </div>
      <div className="re-calendar-grid">
        {dayNames.map(d => <span key={d} className="re-cal-dayname">{d}</span>)}
        {cells.map((d, i) =>
          d === null
            ? <span key={`e-${i}`} />
            : <button
                key={d}
                className={`re-cal-day ${isFrom(d) ? 're-cal-day--from' : ''} ${isTo(d) ? 're-cal-day--to' : ''} ${isInRange(d) ? 're-cal-day--range' : ''}`}
                onClick={() => onSelect(dateStr(d))}
              >{d}</button>
        )}
      </div>
    </div>
  )
}

function Reservas() {
  const flipTo = useFlipNavigate()
  const [step, setStep] = useState(0) // 0 = date/pkg, 1 = payment, 2 = confirmation
  const [booking, setBooking] = useState<BookingData>(emptyBooking)
  const [confirmNum] = useState(() => Math.random().toString(36).slice(2,10).toUpperCase())

  // Pre-select package if coming from Paquetes page
  useEffect(() => {
    const saved = sessionStorage.getItem('selectedPackage')
    if (saved) {
      setBooking(b => ({ ...b, paquete: saved }))
      sessionStorage.removeItem('selectedPackage')
    }
  }, [])

  const set = (field: keyof BookingData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setBooking(b => ({ ...b, [field]: e.target.value }))

  // Calendar: first click = desde, second = hasta
  const handleDateSelect = (date: string) => {
    if (!booking.fechaDesde || (booking.fechaDesde && booking.fechaHasta)) {
      setBooking(b => ({ ...b, fechaDesde: date, fechaHasta: '' }))
    } else {
      if (date >= booking.fechaDesde) setBooking(b => ({ ...b, fechaHasta: date }))
      else setBooking(b => ({ ...b, fechaDesde: date, fechaHasta: '' }))
    }
  }

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

  const goToPayment     = () => flipAnimation(true,  () => setStep(1))
  const goToConfirmation= () => flipAnimation(true,  () => setStep(2))
  const goBack          = () => flipAnimation(false, () => setStep(s => Math.max(s - 1, 0)))

  // ── Step 0 left: Calendar ────────────────────────────────
  const step0Left = (
    <div className="re-page-content re-page-content--top">
      <h2 className="re-section-title">Selecciona tus Fechas</h2>
      <div className="re-date-inputs">
        <div className="re-form-group">
          <label className="re-label">Desde</label>
          <input type="date" className="re-input" value={booking.fechaDesde} onChange={set('fechaDesde')} />
        </div>
        <div className="re-form-group">
          <label className="re-label">Hasta</label>
          <input type="date" className="re-input" value={booking.fechaHasta} onChange={set('fechaHasta')} />
        </div>
      </div>
      <MiniCalendar
        selectedFrom={booking.fechaDesde}
        selectedTo={booking.fechaHasta}
        onSelect={handleDateSelect}
      />
    </div>
  )

  // ── Step 0 right: Package + Location + Proceed ───────────
  const step0Right = (
    <div className="re-page-content re-page-content--top">
      <h2 className="re-section-title">Tu Reserva</h2>

      <div className="re-form-group">
        <label className="re-label">Paquete</label>
        <select className="re-select" value={booking.paquete} onChange={set('paquete')}>
          <option value="">Selecciona un paquete...</option>
          {PAQUETES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="re-form-group">
        <label className="re-label">Locación</label>
        <select className="re-select" value={booking.locacion} onChange={set('locacion')}>
          <option value="">Selecciona una locación...</option>
          {LOCACIONES.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {booking.paquete && (
        <div className="re-booking-preview">
          <span className="re-label">Paquete seleccionado</span>
          <span className="re-preview-val">{booking.paquete}</span>
          {booking.locacion && <>
            <span className="re-label" style={{marginTop:'0.5rem'}}>Locación</span>
            <span className="re-preview-val">{booking.locacion}</span>
          </>}
          {booking.fechaDesde && <>
            <span className="re-label" style={{marginTop:'0.5rem'}}>Fechas</span>
            <span className="re-preview-val">{booking.fechaDesde}{booking.fechaHasta ? ` → ${booking.fechaHasta}` : ''}</span>
          </>}
        </div>
      )}

      <div style={{marginTop: 'auto'}}>
        <button
          className="re-proceed-btn"
          disabled={!booking.paquete || !booking.locacion || !booking.fechaDesde}
          onClick={goToPayment}
        >
          Proceder al Pago →
        </button>
      </div>
    </div>
  )

  // ── Step 1 left: Client + Payment info ──────────────────
  const step1Left = (
    <div className="re-page-content re-page-content--top">
      <h2 className="re-section-title">Información del Cliente</h2>
      <div className="re-form">
        <div className="re-form-group">
          <label className="re-label">Nombre Completo</label>
          <input type="text" className="re-input" placeholder="Tu nombre..." value={booking.nombre} onChange={set('nombre')} />
        </div>
        <div className="re-form-group">
          <label className="re-label">Correo Electrónico</label>
          <input type="email" className="re-input" placeholder="correo@ejemplo.com" value={booking.email} onChange={set('email')} />
        </div>
        <div className="re-form-group">
          <label className="re-label">Teléfono</label>
          <input type="tel" className="re-input" placeholder="+503 0000 0000" value={booking.telefono} onChange={set('telefono')} />
        </div>
        <div className="re-form-group">
          <label className="re-label">Dirección</label>
          <input type="text" className="re-input" placeholder="Ciudad, País" value={booking.direccion} onChange={set('direccion')} />
        </div>
      </div>

      <h2 className="re-section-title" style={{marginTop:'1.2rem'}}>Información de Pago</h2>
      <div className="re-form">
        <div className="re-form-group">
          <label className="re-label">Método de Pago</label>
          <select className="re-select" value={booking.metodoPago} onChange={set('metodoPago')}>
            <option value="tarjeta">Tarjeta de Crédito / Débito</option>
            <option value="transferencia">Transferencia Bancaria</option>
          </select>
        </div>
        {booking.metodoPago === 'tarjeta' && <>
          <div className="re-form-group">
            <label className="re-label">Número de Tarjeta</label>
            <input type="text" className="re-input" placeholder="•••• •••• •••• ••••" maxLength={19} value={booking.numeroTarjeta} onChange={set('numeroTarjeta')} />
          </div>
          <div className="re-form-row">
            <div className="re-form-group">
              <label className="re-label">Expiración</label>
              <input type="text" className="re-input" placeholder="MM/AA" maxLength={5} value={booking.expiracion} onChange={set('expiracion')} />
            </div>
            <div className="re-form-group">
              <label className="re-label">CVV</label>
              <input type="text" className="re-input" placeholder="•••" maxLength={4} value={booking.cvv} onChange={set('cvv')} />
            </div>
          </div>
        </>}
        {booking.metodoPago === 'transferencia' && (
          <div className="re-transfer-info">
            <p className="re-label">Banco: <strong>Banco Agrícola</strong></p>
            <p className="re-label">Cuenta: <strong>0000-000000-00</strong></p>
            <p className="re-label">A nombre de: <strong>Destineto S.A.</strong></p>
          </div>
        )}
      </div>
    </div>
  )

  // ── Step 1 right: Booking summary ───────────────────────
  const step1Right = (
    <div className="re-page-content re-page-content--top">
      <h2 className="re-section-title">Resumen de Reserva</h2>

      <div className="re-summary-card">
        <div className="re-summary-row">
          <span className="re-summary-label">Paquete</span>
          <span className="re-summary-val">{booking.paquete || '—'}</span>
        </div>
        <div className="re-summary-row">
          <span className="re-summary-label">Locación</span>
          <span className="re-summary-val">{booking.locacion || '—'}</span>
        </div>
        <div className="re-summary-row">
          <span className="re-summary-label">Desde</span>
          <span className="re-summary-val">{booking.fechaDesde || '—'}</span>
        </div>
        <div className="re-summary-row">
          <span className="re-summary-label">Hasta</span>
          <span className="re-summary-val">{booking.fechaHasta || '—'}</span>
        </div>
        <div className="re-summary-divider" />
        <div className="re-summary-row">
          <span className="re-summary-label">Precio del Paquete</span>
          <span className="re-summary-val">Por definir</span>
        </div>
        <div className="re-summary-row re-summary-row--total">
          <span className="re-summary-label">Total</span>
          <span className="re-summary-val">Por definir</span>
        </div>
      </div>

      <div style={{marginTop: 'auto'}}>
        <button
          className="re-proceed-btn"
          disabled={!booking.nombre || !booking.email}
          onClick={goToConfirmation}
        >
          Confirmar Reserva ✓
        </button>
      </div>
    </div>
  )

  // ── Step 2 left: Confirmation message ───────────────────
  const step2Left = (
    <div className="re-page-content re-page-content--centered">
      <div className="re-confirm-icon" aria-hidden="true">✓</div>
      <h2 className="re-confirm-title">¡Reserva<br />Confirmada!</h2>
      <p className="re-confirm-text">
        La confirmación llegará a tu correo brevemente.
      </p>
      <div className="re-confirm-num">
        <span className="re-label">Número de Confirmación</span>
        <strong className="re-confirm-code">{confirmNum}</strong>
      </div>
      <button className="re-new-booking-btn" onClick={() => { setBooking(emptyBooking); flipAnimation(false, () => setStep(0)) }}>
        Nueva Reserva
      </button>
    </div>
  )

  // ── Step 2 right: Receipt ────────────────────────────────
  const step2Right = (
    <div className="re-page-content re-page-content--top">
      <div className="re-receipt">
        <div className="re-receipt-header">
          <span className="re-receipt-brand">DESTINETO</span>
          <span className="re-receipt-sub">Comprobante de Reserva</span>
        </div>

        <div className="re-receipt-perforation" aria-hidden="true" />

        <div className="re-receipt-body">
          <div className="re-receipt-row">
            <span className="re-receipt-label">Reservación</span>
            <span className="re-receipt-val">{confirmNum}</span>
          </div>
          <div className="re-receipt-row">
            <span className="re-receipt-label">Cliente</span>
            <span className="re-receipt-val">{booking.nombre || '—'}</span>
          </div>
          <div className="re-receipt-row">
            <span className="re-receipt-label">Paquetes Seleccionados</span>
            <span className="re-receipt-val">{booking.paquete || '—'}</span>
          </div>
          <div className="re-receipt-row">
            <span className="re-receipt-label">Información de Estadía</span>
            <span className="re-receipt-val">{booking.locacion || '—'}</span>
          </div>
          <div className="re-receipt-row">
            <span className="re-receipt-label">Fechas</span>
            <span className="re-receipt-val">{booking.fechaDesde}{booking.fechaHasta ? ` — ${booking.fechaHasta}` : ''}</span>
          </div>
          <div className="re-receipt-row">
            <span className="re-receipt-label">Info de Pago</span>
            <span className="re-receipt-val">{booking.metodoPago === 'tarjeta' ? `•••• ${booking.numeroTarjeta.slice(-4) || '••••'}` : 'Transferencia'}</span>
          </div>
          <div className="re-receipt-divider" />
          <div className="re-receipt-row re-receipt-row--total">
            <span className="re-receipt-label">Total</span>
            <span className="re-receipt-val">Por definir</span>
          </div>
          <div className="re-receipt-row re-receipt-row--total">
            <span className="re-receipt-label">Número de Transacción</span>
            <span className="re-receipt-val">{confirmNum}</span>
          </div>
        </div>

        <div className="re-receipt-perforation" aria-hidden="true" />

        <div className="re-receipt-barcode" aria-hidden="true">
          <div className="re-receipt-barcode-bars" />
          <span className="re-receipt-barcode-num">DESTINETO · {confirmNum}</span>
        </div>
      </div>
    </div>
  )

  const leftContent  = [step0Left,  step1Left,  step2Left ][step]
  const rightContent = [step0Right, step1Right, step2Right][step]

  return (
    <div className="re-scene">
      <div className="re-bg" aria-hidden="true" />

      <div className="re-current-tab">
        <span className="re-current-tab__dot" />
        Reservas
      </div>

      <div className="re-journal open-book flip-journal">
        <div className="re-back-cover" aria-hidden="true" />

        <div className="re-book-body">
          <div className="re-book-page re-page-left flip-pages-left">
            {leftContent}
            {step > 0 && (
              <button className="re-arrow re-arrow-left" onClick={goBack}>←</button>
            )}
          </div>

          <div className="re-book-page re-page-right flip-pages">
            {rightContent}
          </div>
        </div>

        <div className="re-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="re-ring" />
          ))}
        </div>

        <nav className="re-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="re-bookmark"
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => flipTo(bm.path)}
            >
              {bm.label}
            </button>
          ))}
        </nav>

        {/* Step indicator */}
        <div className="re-step-indicator" aria-label="Paso actual">
          {['Fecha & Paquete', 'Pago', 'Confirmación'].map((label, i) => (
            <div key={i} className={`re-step ${i === step ? 're-step--active' : ''} ${i < step ? 're-step--done' : ''}`}>
              <span className="re-step-num">{i < step ? '✓' : i + 1}</span>
              <span className="re-step-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reservas;