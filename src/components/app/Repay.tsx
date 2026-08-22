import { Check, Circle } from 'lucide-react'
import { useState } from 'react'
import { useLoans } from '../../hooks/useLoans'
import { SkeletonBlock } from './SkeletonBlock'
import { StatusLine } from './StatusLine'

/** Render the due-indexed repayment schedule and its private settlement action. */
export function Repay(): JSX.Element {
  const { loans, settleNextRepayment, isSubmitting, status } = useLoans()
  const [error, setError] = useState<string | null>(null)
  const loan = loans[0]
  const next = loan?.schedule.find((slot) => slot.status === 'pending')
  const settle = async () => { try { setError(null); await settleNextRepayment() } catch (actionError) { setError(actionError instanceof Error ? actionError.message : 'The repayment could not be settled.') } }
  return <article className="mx-auto max-w-2xl"><StatusLine>step 04 · scheduled repayment</StatusLine><h1 className="mt-5 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.08]">Settle the schedule.</h1><p className="mt-5 max-w-xl text-base leading-[1.6] text-[var(--text-secondary)]">Each repayment spends the old note and mints a new one. The schedule stays readable to the agreement parties.</p><div className="mt-12 space-y-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 md:p-6">{loan ? loan.schedule.map((slot) => <div className="flex items-center justify-between border-b border-[var(--border-subtle)] py-4 last:border-0" key={slot.index}><span className="font-mono text-xs text-[var(--text-muted)]">due index {String(slot.index).padStart(2, '0')}</span><span className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] ${slot.status === 'settled' ? 'text-[var(--success)]' : 'text-[var(--accent)]'}`}>{slot.status === 'settled' ? <Check size={14} /> : <Circle size={12} />}{slot.status}</span></div>) : <div className="px-3 py-8"><p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">no private agreement</p><p className="mt-3 text-sm text-[var(--text-secondary)]">Create a loan first. Its schedule will appear here after the wallet confirms the note.</p></div>}</div>{loan && <button disabled={isSubmitting || !next} className="liquid-glass-strong mt-8 rounded-full px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60" onClick={settle}>Settle next repayment</button>}<div className="mt-7 space-y-3"><StatusLine tone={error ? 'error' : 'default'}>{error ?? (next ? status : 'result: note spent · note minted · nullifier fired')}</StatusLine>{isSubmitting && <SkeletonBlock className="h-5 w-64" />}</div></article>
}
