import { motion } from 'motion/react'

/** Render the central product statement word by word. */
export function Statement(): JSX.Element {
  return <section className="px-6 py-32 md:py-56"><motion.p className="mx-auto max-w-6xl font-serif text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tighter text-[var(--text-primary)]" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>{'Your credit, in one proof.'.split(' ').map((word) => <motion.span key={word} className="mr-[0.2em] inline-block" variants={{ hidden: { opacity: 0, filter: 'blur(8px)', y: 20 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>{word}</motion.span>)}</motion.p></section>
}
