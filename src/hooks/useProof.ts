import { usePoolContext } from '../context/PoolContext'

/** Return selective proof state and the proof generation action. */
export function useProof() {
  const { proof, generateProof, isSubmitting, status } = usePoolContext()
  return { proof, generateProof, isSubmitting, status }
}
