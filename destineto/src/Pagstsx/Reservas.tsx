import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
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
  { nombre: 'Paquete Mamá',                  tipo: 'Experiencia', invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], fechas: 'FEB 14 – 20',     tapeColor: '#e8a0a0' },
  { nombre: 'Paquete Papá',                  tipo: 'Experiencia', invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], fechas: 'JUN 17 – 20',     tapeColor: '#a0b4e8' },
  { nombre: 'Fiestas Agostinas',             tipo: 'Evento',      invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], fechas: 'AGO 1 – 6',       tapeColor: '#e8d080' },
  { nombre: 'Paquete Secretaria',            tipo: 'Experiencia', invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], fechas: 'ABR 26 – 27',     tapeColor: '#b0e0a0' },
  { nombre: 'Almuerzo Empresarial Navidad',  tipo: 'Evento',      invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], fechas: 'DIC 20 – 21',     tapeColor: '#e8a0a0' },
  { nombre: 'Fin de Año',                    tipo: 'Evento',      invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], fechas: 'DIC 30 – ENE 1', tapeColor: '#c0a0e8' },
  { nombre: 'Cumpleaños',                    tipo: 'Evento',      invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], fechas: 'Por definir',     tapeColor: '#e8c0a0' },
  { nombre: 'Reserva Sin Paquete',            tipo: 'Estadía',  invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], fechas: 'Por definir',     tapeColor: '#c8c8c8' },
  { nombre: 'Boda',                          tipo: 'Evento',      invitados: 'Por definir', duracion: 'Por definir', precio: 'Por definir', precioAdicional: 'Por definir', amenidades: ['Por definir'], fechas: 'Por definir',     tapeColor: '#f0e0c0' },
]




// ── Format date as "Lunes 1 de Junio, 2026" ──────────────
function formatDateES(dateStr: string): string {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('-').map(Number)
  if (!y || !m || !d) return dateStr
  const date = new Date(y, m - 1, d)
  const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  return `${days[date.getDay()]} ${d} de ${months[m - 1]}, ${y}`
}


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


// ── Smooth date input ─────────────────────────────────────
function DateInput({ value, onChange, label }: {
  value: string
  onChange: (val: string) => void
  label: string
}) {
  const [dd, setDd] = useState('')
  const [mm, setMm] = useState('')
  const [yyyy, setYyyy] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const ddRef = useRef<HTMLInputElement>(null)
  const mmRef = useRef<HTMLInputElement>(null)
  const yyyyRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)


  const today = new Date()
  const [pickerYear, setPickerYear] = useState(today.getFullYear())
  const [pickerMonth, setPickerMonth] = useState(today.getMonth())


  const monthNames = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  const fullMonthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  const dayNames = ['D','L','M','M','J','V','S']
  const firstDay = new Date(pickerYear, pickerMonth, 1).getDay()
  const daysInMonth = new Date(pickerYear, pickerMonth + 1, 0).getDate()
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({length: daysInMonth}, (_, i) => i + 1)]


  useEffect(() => {
    if (value) {
      const [y, m, d] = value.split('-')
      setYyyy(y ?? ''); setMm(m ?? ''); setDd(d ?? '')
    }
  }, [value])


  // Close picker when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowPicker(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])


  const emit = (d: string, m: string, y: string) => {
    if (d.length === 2 && m.length === 2 && y.length === 4) {
      onChange(`${y}-${m}-${d}`)
    }
  }


  const handleDd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 2)
    setDd(v); emit(v, mm, yyyy)
    if (v.length === 2) mmRef.current?.focus()
  }


  const handleMm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 2)
    setMm(v); emit(dd, v, yyyy)
    if (v.length === 2) yyyyRef.current?.focus()
  }


  const handleYyyy = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 4)
    setYyyy(v); emit(dd, mm, v)
  }


  // Arrow key navigation between segments
  const handleDdKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowRight' && (e.currentTarget.selectionStart ?? 0) >= dd.length) {
      e.preventDefault(); mmRef.current?.focus(); mmRef.current?.select()
    }
  }
  const handleMmKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft' && (e.currentTarget.selectionStart ?? 0) === 0) {
      e.preventDefault(); ddRef.current?.focus(); ddRef.current?.select()
    }
    if (e.key === 'ArrowRight' && (e.currentTarget.selectionStart ?? 0) >= mm.length) {
      e.preventDefault(); yyyyRef.current?.focus(); yyyyRef.current?.select()
    }
    if (e.key === 'Backspace' && mm === '') {
      e.preventDefault(); ddRef.current?.focus()
    }
  }
  const handleYyyyKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft' && (e.currentTarget.selectionStart ?? 0) === 0) {
      e.preventDefault(); mmRef.current?.focus(); mmRef.current?.select()
    }
    if (e.key === 'Backspace' && yyyy === '') {
      e.preventDefault(); mmRef.current?.focus()
    }
  }


  const pickDay = (d: number) => {
    const dStr = String(d).padStart(2, '0')
    const mStr = String(pickerMonth + 1).padStart(2, '0')
    const yStr = String(pickerYear)
    setDd(dStr); setMm(mStr); setYyyy(yStr)
    onChange(`${yStr}-${mStr}-${dStr}`)
    setShowPicker(false)
  }


  const prevMonth = () => { if (pickerMonth === 0) { setPickerMonth(11); setPickerYear(y => y-1) } else setPickerMonth(m => m-1) }
  const nextMonth = () => { if (pickerMonth === 11) { setPickerMonth(0); setPickerYear(y => y+1) } else setPickerMonth(m => m+1) }


  const selectedDateStr = yyyy && mm && dd ? `${yyyy}-${mm}-${dd}` : ''


  return (
    <div className="re-form-group" ref={wrapperRef} style={{ position: 'relative' }}>
      <label className="re-label">{label}</label>
      <div className="re-date-input">
        <input ref={ddRef} className="re-date-seg" placeholder="DD" maxLength={2} value={dd}
          onChange={handleDd} onKeyDown={handleDdKey} inputMode="numeric" />
        <span className="re-date-sep">/</span>
        <input ref={mmRef} className="re-date-seg" placeholder="MM" maxLength={2} value={mm}
          onChange={handleMm} onKeyDown={handleMmKey} inputMode="numeric" />
        <span className="re-date-sep">/</span>
        <input ref={yyyyRef} className="re-date-seg re-date-seg--year" placeholder="AAAA" maxLength={4} value={yyyy}
          onChange={handleYyyy} onKeyDown={handleYyyyKey} inputMode="numeric" />
        <button
          className="re-date-picker-btn"
          onClick={() => setShowPicker(s => !s)}
          aria-label="Abrir calendario"
          type="button"
        >▾</button>
      </div>


      {showPicker && (
        <div className="re-date-dropdown">
          <div className="re-date-dropdown-nav">
            <button className="re-cal-btn" onClick={prevMonth} type="button">‹</button>
            <span className="re-cal-title">{fullMonthNames[pickerMonth]} {pickerYear}</span>
            <button className="re-cal-btn" onClick={nextMonth} type="button">›</button>
          </div>
          <div className="re-calendar-grid">
            {dayNames.map((d, i) => <span key={i} className="re-cal-dayname">{d}</span>)}
            {cells.map((d, i) =>
              d === null ? <span key={`e-${i}`} /> :
              <button
                key={d}
                type="button"
                className={`re-cal-day ${selectedDateStr === `${pickerYear}-${String(pickerMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}` ? 're-cal-day--from' : ''}`}
                onClick={() => pickDay(d)}
              >{d}</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


// ── Package info popup ────────────────────────────────────
function PaqueteInfoPopup({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(0)
  const pkg = PAQUETES[selected]


  return createPortal(
    <div className="re-pkg-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="re-pkg-popup" onClick={e => e.stopPropagation()}>
        <button className="re-pkg-close" onClick={onClose} aria-label="Cerrar">✕</button>


        {/* Left: ticket list */}
        <div className="re-pkg-list">
          <h3 className="re-pkg-list-title">Paquetes</h3>
          {PAQUETES.map((p, i) => (
            <button
              key={i}
              className={`re-pkg-ticket-mini ${i === selected ? 're-pkg-ticket-mini--active' : ''}`}
              style={{ '--tape': p.tapeColor } as React.CSSProperties}
              onClick={() => setSelected(i)}
            >
              <div className="re-pkg-ticket-tape" />
              <div className="re-pkg-ticket-body">
                <span className="re-pkg-ticket-name">{p.nombre}</span>
                <span className="re-pkg-ticket-tipo">{p.tipo}</span>
                <span className="re-pkg-ticket-fechas">{p.fechas}</span>
              </div>
            </button>
          ))}
        </div>


        {/* Right: ticket details */}
        <div className="re-pkg-detail">
          <div className="re-pkg-detail-header" style={{ borderLeft: `4px solid ${pkg.tapeColor}` }}>
            <h2 className="re-pkg-detail-name">{pkg.nombre}</h2>
            <span className="re-pkg-detail-tipo">{pkg.tipo}</span>
          </div>


          <div className="re-pkg-detail-grid">
            <div className="re-pkg-detail-item">
              <span className="re-pkg-detail-label">Fechas</span>
              <span className="re-pkg-detail-value">{pkg.fechas}</span>
            </div>
            <div className="re-pkg-detail-item">
              <span className="re-pkg-detail-label">Nº de Invitados</span>
              <span className="re-pkg-detail-value">{pkg.invitados}</span>
            </div>
            <div className="re-pkg-detail-item">
              <span className="re-pkg-detail-label">Duración</span>
              <span className="re-pkg-detail-value">{pkg.duracion}</span>
            </div>
            <div className="re-pkg-detail-item">
              <span className="re-pkg-detail-label">Precio</span>
              <span className="re-pkg-detail-value">{pkg.precio}</span>
            </div>
            <div className="re-pkg-detail-item">
              <span className="re-pkg-detail-label">Precio por Invitado Adicional</span>
              <span className="re-pkg-detail-value">{pkg.precioAdicional}</span>
            </div>
          </div>


          <div className="re-pkg-amenidades">
            <span className="re-pkg-detail-label">Amenidades</span>
            <ul className="re-pkg-amenidades-list">
              {pkg.amenidades.map((a, i) => <li key={i}>✦ {a}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  , document.body)
}


// ── Mini calendar ─────────────────────────────────────────
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
        <button type="button" className="re-cal-btn" onClick={prevMonth}>‹</button>
        <span className="re-cal-title">{monthNames[viewMonth]} {viewYear}</span>
        <button type="button" className="re-cal-btn" onClick={nextMonth}>›</button>
      </div>
      <div className="re-calendar-grid">
        {dayNames.map((d, i) => <span key={i} className="re-cal-dayname">{d}</span>)}
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
  const [step, setStep] = useState(0)
  const [booking, setBooking] = useState<BookingData>(emptyBooking)
  const [confirmNum] = useState(() => Math.random().toString(36).slice(2,10).toUpperCase())
  const [showPkgInfo, setShowPkgInfo] = useState(false)


  useEffect(() => {
    const saved = sessionStorage.getItem('selectedPackage')
    if (saved) {
      setBooking(b => ({ ...b, paquete: saved }))
      sessionStorage.removeItem('selectedPackage')
    }
  }, [])


  const set = (field: keyof BookingData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setBooking(b => ({ ...b, [field]: e.target.value }))


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


  const goToPayment      = () => flipAnimation(true,  () => setStep(1))
  const goToConfirmation = () => flipAnimation(true,  () => setStep(2))
  const goBack           = () => flipAnimation(false, () => setStep(s => Math.max(s - 1, 0)))


  // ── Step 0 left: Calendar ────────────────────────────────
  const step0Left = (
    <div className="re-page-content re-page-content--top">
      <h2 className="re-section-title">Selecciona tus Fechas</h2>
      <div className="re-date-inputs">
        <DateInput label="Desde" value={booking.fechaDesde} onChange={v => setBooking(b => ({ ...b, fechaDesde: v }))} />
        <DateInput label="Hasta" value={booking.fechaHasta} onChange={v => setBooking(b => ({ ...b, fechaHasta: v }))} />
      </div>
      <MiniCalendar
        selectedFrom={booking.fechaDesde}
        selectedTo={booking.fechaHasta}
        onSelect={handleDateSelect}
      />
    </div>
  )


  // ── Step 0 right: Package + Location ────────────────────
  const step0Right = (
    <div className="re-page-content re-page-content--top">
      <h2 className="re-section-title">Tu Reserva</h2>


      <div className="re-form-group">
        <div className="re-label-row">
          <label className="re-label">Paquete</label>
          <button className="re-more-info-btn" onClick={() => setShowPkgInfo(true)}>Más Info</button>
        </div>
        <select className="re-select" value={booking.paquete} onChange={set('paquete')}>
          <option value="">Selecciona un paquete...</option>
          {PAQUETES.map(p => <option key={p.nombre} value={p.nombre}>{p.nombre}</option>)}
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
            <span className="re-preview-val">{formatDateES(booking.fechaDesde)}{booking.fechaHasta ? ` → ${formatDateES(booking.fechaHasta)}` : ''}</span>
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


  // ── Step 1 left: Client + Payment ───────────────────────
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


  // ── Step 1 right: Summary ────────────────────────────────
  const step1Right = (
    <div className="re-page-content re-page-content--top">
      <h2 className="re-section-title">Resumen de Reserva</h2>
      <div className="re-summary-card">
        <div className="re-summary-row"><span className="re-summary-label">Paquete</span><span className="re-summary-val">{booking.paquete || '—'}</span></div>
        <div className="re-summary-row"><span className="re-summary-label">Locación</span><span className="re-summary-val">{booking.locacion || '—'}</span></div>
        <div className="re-summary-row"><span className="re-summary-label">Desde</span><span className="re-summary-val">{formatDateES(booking.fechaDesde)}</span></div>
        <div className="re-summary-row"><span className="re-summary-label">Hasta</span><span className="re-summary-val">{formatDateES(booking.fechaHasta)}</span></div>
        <div className="re-summary-divider" />
        <div className="re-summary-row"><span className="re-summary-label">Precio del Paquete</span><span className="re-summary-val">Por definir</span></div>
        <div className="re-summary-row re-summary-row--total"><span className="re-summary-label">Total</span><span className="re-summary-val">Por definir</span></div>
      </div>
      <div className="re-summary-notice">
        <p className="re-notice-text">📸 Por favor tome foto del comprobante de pago</p>
        <p className="re-notice-contact">✉ contacto@destineto.com · 📞 +503 0000-0000</p>
        <a href="mailto:contacto@destineto.com" className="re-notice-link">Contáctanos →</a>
      </div>
      <div style={{marginTop: 'auto'}}>
        <button className="re-proceed-btn" disabled={!booking.nombre || !booking.email} onClick={goToConfirmation}>
          Confirmar Reserva ✓
        </button>
      </div>
    </div>
  )


  // ── Step 2 left: Confirmation ────────────────────────────
  const step2Left = (
    <div className="re-page-content re-page-content--centered">
      <div className="re-confirm-icon">✓</div>
      <h2 className="re-confirm-title">¡Reserva<br />Confirmada!</h2>
      <p className="re-confirm-text">La confirmación llegará a tu correo brevemente.</p>
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
        <div className="re-receipt-perforation" />
        <div className="re-receipt-body">
          <div className="re-receipt-row"><span className="re-receipt-label">Reservación</span><span className="re-receipt-val">{confirmNum}</span></div>
          <div className="re-receipt-row"><span className="re-receipt-label">Cliente</span><span className="re-receipt-val">{booking.nombre || '—'}</span></div>
          <div className="re-receipt-row"><span className="re-receipt-label">Paquete</span><span className="re-receipt-val">{booking.paquete || '—'}</span></div>
          <div className="re-receipt-row"><span className="re-receipt-label">Estadía</span><span className="re-receipt-val">{booking.locacion || '—'}</span></div>
          <div className="re-receipt-row"><span className="re-receipt-label">Fechas</span><span className="re-receipt-val">{booking.fechaDesde}{booking.fechaHasta ? ` — ${booking.fechaHasta}` : ''}</span></div>
          <div className="re-receipt-row"><span className="re-receipt-label">Pago</span><span className="re-receipt-val">{booking.metodoPago === 'tarjeta' ? `•••• ${booking.numeroTarjeta.slice(-4) || '••••'}` : 'Transferencia'}</span></div>
          <div className="re-receipt-divider" />
          <div className="re-receipt-row re-receipt-row--total"><span className="re-receipt-label">Total</span><span className="re-receipt-val">Por definir</span></div>
          <div className="re-receipt-row re-receipt-row--total"><span className="re-receipt-label">Nº Transacción</span><span className="re-receipt-val">{confirmNum}</span></div>
        </div>
        <div className="re-receipt-perforation" />
        <div className="re-receipt-barcode">
          <div className="re-receipt-barcode-bars" />
          <span className="re-receipt-barcode-num">DESTINETO · {confirmNum}</span>
        </div>
      <div className="re-receipt-actions">
        <button className="re-print-btn" onClick={() => window.print()} type="button">🖨 Imprimir</button>
        <button className="re-print-btn" onClick={() => {
          window.print()
        }} type="button">📄 Guardar como PDF</button>
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
            {step > 0 && <button className="re-arrow re-arrow-left" onClick={goBack}>←</button>}
          </div>
          <div className="re-book-page re-page-right flip-pages">
            {rightContent}
          </div>
        </div>


        <div className="re-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => <div key={i} className="re-ring" />)}
        </div>


        <nav className="re-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button key={bm.id} className="re-bookmark" style={{ '--i': i } as React.CSSProperties} onClick={() => flipTo(bm.path)}>
              {bm.label}
            </button>
          ))}
        </nav>


        <div className="re-step-indicator">
          {['Fecha & Paquete', 'Pago', 'Confirmación'].map((label, i) => (
            <div key={i} className={`re-step ${i === step ? 're-step--active' : ''} ${i < step ? 're-step--done' : ''}`}>
              <span className="re-step-num">{i < step ? '✓' : i + 1}</span>
              <span className="re-step-label">{label}</span>
            </div>
          ))}
        </div>
      </div>


      {showPkgInfo && <PaqueteInfoPopup onClose={() => setShowPkgInfo(false)} />}
    </div>
  )
}


export default Reservas;