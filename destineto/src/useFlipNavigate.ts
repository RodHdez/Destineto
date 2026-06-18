import { useNavigate } from 'react-router-dom'

function useFlipNavigate() {
  const navigate = useNavigate()

  const flipTo = (path: string) => {
    const isClosing = path === '/'

    // For closing, target the left page; for opening, target the right page
    const selector = isClosing ? '.flip-pages-left' : '.flip-pages'
    const el = document.querySelector(selector) as HTMLElement | null
    if (!el) { navigate(path); return }

    el.style.animation = 'none'
    void el.offsetHeight

    el.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 1, 1), opacity 0.4s ease-in, box-shadow 0.5s ease-in'
    el.style.transformOrigin = isClosing ? 'right center' : 'left center'
    el.style.transform = isClosing
    ? 'perspective(1200px) rotateY(90deg)'   // left page folds RIGHT, over the right page
    : 'perspective(1200px) rotateY(-90deg)'  // right page folds LEFT, away from view
    el.style.opacity = '0'
    el.style.boxShadow = isClosing
      ? '20px 0 60px rgba(0,0,0,0.5)'
      : '-30px 0 60px rgba(0,0,0,0.5)'

    setTimeout(() => navigate(path), 500)
  }

  return flipTo
}

export default useFlipNavigate