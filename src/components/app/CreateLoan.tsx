import { useState } from 'react'
import { useLoans } from '../../hooks/useLoans'
import { navigate } from '../../lib/navigation'
import { SkeletonBlock } from './SkeletonBlock'
import { StatusLine } from './StatusLine'

/** Render the private loan creation action. */
export function CreateLoan(): JSX.Element {
  const [amount, setAmount] = useState('')
  const [repayments, setRepayments] = useState('11')
  const [error, setError] = useState<string | null>(null)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const { createLoan, isSubmitting, status } = useLoans()
  const submit = async () => {
    setError(null)
    if (!amount || Number(amount) <= 0) { setError('Enter a principal amount before shielding it.'); return }
    try { const result = await createLoan(amount, Number(repayments)); setTransactionHash(result.transactionHash) } catch (actionError) { setError(actionError instanceof Error ? actionError.message : 'The loan could not be created.') }
  }
  return <article className="mx-auto max-w-2xl"><StatusLine>step 03 · create agreement</StatusLine><h1 className="mt-5 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.08]">Create a private loan.</h1><p className="mt-5 max-w-xl text-base leading-[1.6] text-[var(--text-secondary)]">Set the terms. The principal becomes a note the moment it lands in the pool.</p><div className="mt-12 space-y-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:p-8"><label className="block"><span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">principal</span><input className="mt-3 w-full border-b border-[var(--border-default)] bg-transparent py-3 text-lg text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" placeholder="amount in STRK" value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" /></label><label className="block"><span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">schedule</span><select className="mt-3 w-full border-b border-[var(--border-default)] bg-[var(--bg-surface)] py-3 text-base text-[var(--text-primary)] outline-none focus:border-[var(--accent)]" value={repayments} onChange={(event) => setRepayments(event.target.value)}><option value="3">3 repayments</option><option value="6">6 repayments</option><option value="11">11 repayments</option></select></label><div className="border-t border-[var(--border-subtle)] pt-5"><span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">amount</span><p className="mt-3 font-mono text-sm text-[var(--text-secondary)]">hidden from the ledger</p></div></div><button disabled={isSubmitting} className="liquid-glass-strong mt-8 rounded-full px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-transform hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60" onClick={submit}>Shield the principal</button><div className="mt-7 space-y-3"><StatusLine tone={error ? 'error' : transactionHash ? 'success' : 'default'}>{error ?? (transactionHash ? `result: note minted · ${transactionHash}` : status)}</StatusLine>{isSubmitting && <SkeletonBlock className="h-5 w-64" />}</div><button className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]" onClick={() => navigate('/app/repay')}>Continue to repayments</button></article>
}
