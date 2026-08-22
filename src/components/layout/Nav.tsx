import { navigate } from '../../lib/navigation'

/** Render the fixed glass navigation shared by the landing page. */
export function Nav(): JSX.Element {
  return <header className="fixed left-1/2 top-6 z-[100] w-full max-w-2xl -translate-x-1/2 px-4"><nav className="liquid-glass flex items-center justify-between rounded-full px-5 py-3"><a className="font-serif text-lg text-[var(--text-primary)]" href="/" onClick={(event) => { event.preventDefault(); navigate('/') }}>Tessera</a><a className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]" href="/app" onClick={(event) => { event.preventDefault(); navigate('/app') }}>Open the app</a></nav></header>
}
