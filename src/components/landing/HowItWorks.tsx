import { motion } from 'motion/react'
import { FadeIn } from '../ui/FadeIn'

const steps = [
  ['01', 'Shield the principal', 'The principal enters the pool and becomes a private note. The agreement parties can read it. Observers cannot read the amount or the wallets.'],
  ['02', 'Settle on a schedule', 'Each due repayment spends the old note and mints a fresh one. A new nullifier marks the movement without exposing the path.'],
  ['03', 'Prove you repay', 'Answer one question about your history. The lender gets a true or false answer, with every unrelated field kept hidden.'],
]

/** Explain the private loan lifecycle with replayable stacked reveals. */
export function HowItWorks(): JSX.Element {
  const topClasses = ['top-28', 'top-32', 'top-36']
  return <section className="bg-[var(--bg-primary)] px-6 py-32 md:py-48"><FadeIn className="mx-auto max-w-4xl"><p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]">how it works</p><h2 className="mt-5 max-w-xl font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.08]">A private note, a clear schedule, one honest answer.</h2></FadeIn><div className="mx-auto mt-20 max-w-4xl space-y-5">{steps.map(([number, title, copy], index) => <motion.article key={number} className={`sticky ${topClasses[index]} rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-10 shadow-2xl shadow-black/5 md:p-16`} initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }} whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}><span className="font-mono text-xs tracking-[0.15em] text-[var(--accent)]">{number}</span><h3 className="mt-8 font-sans text-xl font-medium">{title}</h3><p className="mt-4 max-w-xl text-base leading-[1.6] text-[var(--text-secondary)]">{copy}</p></motion.article>)}</div></section>
}
