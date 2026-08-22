import { useState } from 'react'

/** Play the supplied ambient loop as a muted, accessible hero background. */
export function FadingVideo(): JSX.Element {
  const [activeVideo, setActiveVideo] = useState(0)
  const handleEnded = () => setActiveVideo((current) => current === 0 ? 1 : 0)
  return <div className="absolute inset-0 bg-[var(--bg-primary)]"><video className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${activeVideo === 0 ? 'opacity-75' : 'opacity-0'}`} autoPlay muted loop playsInline poster="/hero-poster.jpeg" onEnded={handleEnded} aria-label="Ambient golden light moving across a dark field"><source src="/hero.mp4" type="video/mp4" /></video><video className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${activeVideo === 1 ? 'opacity-75' : 'opacity-0'}`} autoPlay muted loop playsInline onEnded={handleEnded} aria-hidden="true"><source src="/hero.mp4" type="video/mp4" /></video></div>
}
