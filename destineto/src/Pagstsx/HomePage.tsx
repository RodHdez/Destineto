import { useNavigate } from 'react-router-dom'
import '../Pagscss/HomePage.css'

const tabs = [
  { id: 'acerca-de', label: 'Acerca de', path: '/acerca-de', description: 'Conoce quiénes somos y lo que nos inspira.', number: '01' },
  { id: 'historia', label: 'Historia', path: '/historia', description: 'Un recorrido por nuestros orígenes y trayectoria.', number: '02' },
  { id: 'locaciones', label: 'Locaciones', path: '/locaciones', description: 'Espacios únicos para cada ocasión especial.', number: '03' },
  { id: 'paquetes', label: 'Paquetes', path: '/paquetes', description: 'Opciones pensadas para cada necesidad y presupuesto.', number: '04' },
  { id: 'reservas', label: 'Reservas', path: '/reservas', description: 'Asegura tu fecha y comienza a planear.', number: '05' },
  { id: 'contacto', label: 'Contacto', path: '/contacto', description: 'Estamos aquí para responder tus preguntas.', number: '06' },
]

function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="home">
      <div className="home__bg" aria-hidden="true" />

      <section className="home__hero">
        <p className="home__eyebrow">Bienvenido</p>
        <h1 className="home__title">
          Explora<br />
          <em>nuestra</em> historia
        </h1>
        <p className="home__subtitle">Descubre todo lo que tenemos para ofrecerte.</p>
      </section>

      <section className="home__grid" aria-label="Secciones principales">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="home__card"
            onClick={() => navigate(tab.path)}
            aria-label={`Ir a ${tab.label}`}
          >
            <span className="home__card-number">{tab.number}</span>
            <div className="home__card-body">
              <h2 className="home__card-title">{tab.label}</h2>
              <p className="home__card-desc">{tab.description}</p>
            </div>
            <span className="home__card-arrow" aria-hidden="true">→</span>
          </button>
        ))}
      </section>

      <footer className="home__footer">
        <span>© {new Date().getFullYear()}</span>
        <span className="home__footer-divider">·</span>
        <span>Todos los derechos reservados</span>
      </footer>
    </main>
  )
}

export default HomePage