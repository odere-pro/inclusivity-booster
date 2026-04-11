export function typewriter(node, { speed = 12, delay = 0 } = {}) {
  const text = node.textContent
  node.textContent = ''
  node.style.visibility = 'visible'

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let i = 0
  let timeoutId

  function type() {
    if (prefersReducedMotion) {
      node.textContent = text
      return
    }
    if (i <= text.length) {
      node.textContent = text.slice(0, i)
      i++
      timeoutId = setTimeout(type, speed)
    }
  }

  timeoutId = setTimeout(type, delay)

  return {
    update({ speed: newSpeed = 12, delay: newDelay = 0 } = {}) {
      clearTimeout(timeoutId)
      i = 0
      node.textContent = ''
      if (prefersReducedMotion) {
        node.textContent = text
        return
      }
      timeoutId = setTimeout(() => {
        function typeUpdated() {
          if (i <= text.length) {
            node.textContent = text.slice(0, i)
            i++
            timeoutId = setTimeout(typeUpdated, newSpeed)
          }
        }
        typeUpdated()
      }, newDelay)
    },
    destroy() {
      clearTimeout(timeoutId)
      node.textContent = text
    }
  }
}
