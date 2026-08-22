import { navigate } from '../../lib/navigation'

/** Render the quiet landing page close with the public project links. */
export function Footer(): JSX.Element {
  return <footer className="border-t border-[var(--border-subtle)] px-6 py-10"><div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><button className="font-serif text-2xl" onClick={() => navigate('/')}>Tessera</button><p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">your on-chain credit, private</p></div><div className="flex gap-6 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-secondary)]"><a className="transition-colors hover:text-[var(--text-primary)]" href="https://github.com/dr4ken-soul/Tessera.git" target="_blank" rel="noreferrer">GitHub</a><button className="transition-colors hover:text-[var(--text-primary)]" onClick={() => navigate('/app')}>Open the app</button></div></div></footer>
}
