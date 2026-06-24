import { useState } from 'react'
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

// ── Social platforms ──────────────────────────────────────
interface Platform {
  id: string
  name: string
  color: string
  sealColor: string
  url: string
  preview: React.ReactNode
}

const platforms: Platform[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    color: '#25D366',
    sealColor: '#128C7E',
    url: 'https://wa.me/00000000000',
    preview: (
      <div className="co-preview co-preview--whatsapp">
        <div className="co-preview-header" style={{background:'#075e54'}}>
          <div className="co-preview-avatar" />
          <span className="co-preview-name">Destineto</span>
        </div>
        <div className="co-preview-chat">
          <div className="co-preview-bubble co-preview-bubble--in">¡Hola! ¿En qué podemos ayudarte? 👋</div>
          <div className="co-preview-bubble co-preview-bubble--out">Escribe aquí…</div>
        </div>
      </div>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    sealColor: '#0c5cba',
    url: 'https://facebook.com/destineto',
    preview: (
      <div className="co-preview co-preview--facebook">
        <div className="co-preview-header" style={{background:'#1877F2'}}>
          <div className="co-preview-avatar" />
          <span className="co-preview-name">Destineto</span>
        </div>
        <div className="co-preview-fb-body">
          <div className="co-preview-fb-cover" />
          <p className="co-preview-fb-desc">Página oficial de Destineto</p>
        </div>
      </div>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#E1306C',
    sealColor: '#833AB4',
    url: 'https://instagram.com/destineto',
    preview: (
      <div className="co-preview co-preview--instagram">
        <div className="co-preview-header" style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'}}>
          <div className="co-preview-avatar" />
          <span className="co-preview-name">@destineto</span>
        </div>
        <div className="co-preview-ig-grid">
          {[...Array(6)].map((_,i) => <div key={i} className="co-preview-ig-cell" />)}
        </div>
      </div>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    color: '#010101',
    sealColor: '#EE1D52',
    url: 'https://tiktok.com/@destineto',
    preview: (
      <div className="co-preview co-preview--tiktok">
        <div className="co-preview-header" style={{background:'#010101'}}>
          <div className="co-preview-avatar" />
          <span className="co-preview-name">@destineto</span>
        </div>
        <div className="co-preview-tt-body">
          <div className="co-preview-tt-video" />
          <div className="co-preview-tt-video" />
        </div>
      </div>
    ),
  },
  {
    id: 'email',
    name: 'Correo',
    color: '#8b4513',
    sealColor: '#5c2d0a',
    url: 'mailto:contacto@destineto.com',
    preview: (
      <div className="co-preview co-preview--email">
        <div className="co-preview-header" style={{background:'#8b4513'}}>
          <span className="co-preview-name">contacto@destineto.com</span>
        </div>
        <div className="co-preview-email-body">
          <p className="co-preview-email-line">Para: contacto@destineto.com</p>
          <p className="co-preview-email-line">Asunto: ___________________</p>
          <div className="co-preview-email-body-area" />
        </div>
      </div>
    ),
  },
]

// ── Envelope component ────────────────────────────────────
function Envelope({ platform }: { platform: Platform }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`co-envelope ${hovered ? 'co-envelope--open' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Visitar ${platform.name}`}
      style={{ '--env-color': platform.color, '--seal-color': platform.sealColor } as React.CSSProperties}
    >
      {/* Envelope body */}
      <div className="co-env-body">

        {/* Back flap (behind) */}
        <div className="co-env-flap co-env-flap--back" />

        {/* Left and right side triangles */}
        <div className="co-env-side co-env-side--left" />
        <div className="co-env-side co-env-side--right" />

        {/* Bottom triangle */}
        <div className="co-env-bottom" />

        {/* Preview content — visible when open */}
        <div className="co-env-preview-window">
          {platform.preview}
        </div>

        {/* Top flap — animates open on hover */}
        <div className="co-env-flap co-env-flap--top" />

        {/* Seal — sits on top of closed flap */}
        <div className="co-env-seal">
          {/* Replace inner content with <img> when you have logos */}
          <span className="co-env-seal-placeholder">{platform.name[0]}</span>
        </div>

      </div>

      {/* Label below */}
      <span className="co-env-label">{platform.name}</span>
    </a>
  )
}

// ── Page content arrays ───────────────────────────────────
const leftPages = [
  <div className="co-page-content">
    <h1 className="co-title">Escríbenos<br />un Mensaje</h1>
    <div className="co-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <div className="co-info-block">
      <span className="co-info-label">Correspondencia</span>
      <p className="co-info-text">contacto@destineto.com</p>
      <p className="co-info-text">+1 (555) 019-2834</p>
    </div>
  </div>,
  <div className="co-page-content co-page-content--centered">
    <h1 className="co-title">Síguenos</h1>
    <div className="co-vintage-divider" aria-hidden="true">✦ ✦ ✦</div>
    <p className="co-aside">Abre cada sobre para visitarnos en nuestras redes.</p>
  </div>,
]

const rightPages = [
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
      <button type="submit" className="co-submit-btn">Enviar Nota</button>
    </form>
  </div>,
  // Envelope grid — rendered inline so Envelope has access to useState
  null,
]

function Contacto() {
  const flipTo = useFlipNavigate()
  const [page, setPage] = useState(0)

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

  const goNext = () => { if (page < rightPages.length - 1) flipAnimation(true,  () => setPage(p => p + 1)) }
  const goPrev = () => { if (page > 0)                    flipAnimation(false, () => setPage(p => p - 1)) }

  // Right page 1 (envelopes) needs to be rendered here so Envelope can use hooks
  const rightContent = page === 1
    ? (
      <div className="co-page-content co-page-content--envelopes">
        <div className="co-envelope-grid">
          {platforms.map(p => <Envelope key={p.id} platform={p} />)}
        </div>
      </div>
    )
    : rightPages[page]

  return (
    <div className="co-scene">
      <div className="co-bg" aria-hidden="true" />

      <div className="co-current-tab">
        <span className="co-current-tab__dot" />
        Contáctanos
      </div>

      <div className="co-journal open-book flip-journal">
        <div className="co-back-cover" aria-hidden="true" />

        <div className="co-book-body">
          <div className="co-book-page co-page-left flip-pages-left">
            {leftPages[page]}
            {page > 0 && (
              <button className="co-arrow co-arrow-left" onClick={goPrev}>←</button>
            )}
          </div>

          <div className="co-book-page co-page-right flip-pages">
            {rightContent}
            {page < rightPages.length - 1 && (
              <button className="co-arrow co-arrow-right" onClick={goNext}>→</button>
            )}
          </div>
        </div>

        <div className="co-rings" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="co-ring" />
          ))}
        </div>

        <nav className="co-bookmarks" aria-label="Secciones del sitio">
          {bookmarks.map((bm, i) => (
            <button
              key={bm.id}
              className="co-bookmark"
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => flipTo(bm.path)}
            >
              {bm.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Contacto;