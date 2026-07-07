import { Routes, Route } from 'react-router-dom'
import Keychain from './Pagstsx/Keychain'
import HomePage from './Pagstsx/HomePage'
import Acerca from './Pagstsx/Acerca'
import Historia from './Pagstsx/Historia'
import Contacto from './Pagstsx/Contacto'
import Paquetes from './Pagstsx/Paquetes'
import Reservas from './Pagstsx/Reservas'
import Locaciones from './Pagstsx/Locaciones'

function App() {
  return (
    <>
      <Keychain />
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/acerca-de"  element={<Acerca />} />
        <Route path="/historia"   element={<Historia />} />
        <Route path="/contacto"   element={<Contacto />} />
        <Route path="/paquetes"   element={<Paquetes />} />
        <Route path="/reservas"   element={<Reservas />} />
        <Route path="/locaciones" element={<Locaciones />} />
      </Routes>
    </>
  )
}

export default App