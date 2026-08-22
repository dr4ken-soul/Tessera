import { motion } from 'motion/react'
import { useWallet } from '../../hooks/useWallet'
import { navigate } from '../../lib/navigation'
import { StatusLine } from './StatusLine'

/** Render the first-use wallet and viewing-key connection step. */
export function Connect(): JSX.Element {
  const { connect, isConnecting, error } = useWallet()
  return <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"><motion.span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]" initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 0.6 }}>step 01</motion.span><motion.h1 className="mt-5 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.08]" initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>Connect your wallet.</motion.h1><motion.p className="mt-5 max-w-md text-base leading-[1.6] text-[var(--text-secondary)]" initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>Tessera runs against the live STRK20 pool on Starknet mainnet. Register the first time you use it and set a viewing key.</motion.p><button disabled={isConnecting} className="liquid-glass-strong mt-8 rounded-full px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-transform hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60" onClick={() => { void connect().then((connected) => { if (connected) navigate('/app') }) }}>{isConnecting ? 'Connecting' : 'Connect wallet'}</button>{error && <StatusLine tone="error">{error}</StatusLine>}<p className="mt-6 font-mono text-xs text-[var(--text-muted)]">network: starknet mainnet</p></section>
}
