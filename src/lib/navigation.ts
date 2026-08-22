/** Navigate inside the single page app without adding a router dependency. */
export function navigate(path: string): void {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/** Return the current pathname and subscribe callers to browser navigation. */
export function subscribeToNavigation(callback: () => void): () => void {
  window.addEventListener('popstate', callback)
  return () => window.removeEventListener('popstate', callback)
}
