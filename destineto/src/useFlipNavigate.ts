import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

/*
  Returns a navigate function that triggers the flip-out animation
  on the current FlipPage before switching routes.

  Usage:
    const flipTo = useFlipNavigate()
    <button onClick={() => flipTo('/acerca-de')}>Go</button>
*/
function useFlipNavigate() {
  const navigate = useNavigate()

  const flipTo = (path: string) => {
    // Find the active .flip-page element and add flip-out
    const el = document.querySelector('.flip-page') as HTMLElement | null
    if (!el) { navigate(path); return }
    el.classList.add('flip-out')
    setTimeout(() => navigate(path), 400)
  }

  return flipTo
}

export default useFlipNavigate