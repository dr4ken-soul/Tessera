import { motion, type HTMLMotionProps } from 'motion/react'

interface FadeInProps extends HTMLMotionProps<'div'> { delay?: number }

/** Render a replayable blur-in entrance for a section element. */
export function FadeIn({ children, delay = 0, transition, ...props }: FadeInProps): JSX.Element {
  return <motion.div initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }} whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay, ...transition }} {...props}>{children}</motion.div>
}
