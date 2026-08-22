import { ArrowLeft, LogOut } from 'lucide-react'
import type { ReactNode } from 'react'
import { navigate } from '../../lib/navigation'
import { useWallet } from '../../hooks/useWallet'

/** Render the compact app shell and its persistent wallet controls. */
export function AppLayout({ children }: { children: ReactNode }): JSX.Element {
  const { address, disconnect } = useWallet()
  return <div className="min-h-screen bg-[var(--bg-primary)]"><header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border-subtle)] bg-[rgba(10,10,15,0.82)] backdrop-blur-xl"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><button className="font-serif text-xl" onClick={() => navigate('/app')}>Tessera</button><div className="flex items-center gap-5">{address && <span className="hidden font-mono text-xs text-[var(--text-muted)] md:inline">{address.slice(0, 8)}…{address.slice(-5)}</span>}<button className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]" onClick={() => { disconnect(); navigate('/app') }}><LogOut size={14} /> disconnect</button></div></div></header><main className="mx-auto max-w-6xl px-6 pb-20 pt-28">{children}</main><button className="fixed bottom-6 left-6 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] md:flex" onClick={() => navigate('/')}><ArrowLeft size={14} /> landing</button></div>
}
