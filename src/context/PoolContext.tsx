import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { proofFields } from '../lib/constants'
import { submitPrivacyAction } from '../lib/starknet'
import { buildCreateLoanActions, buildProofActions, buildRepaymentActions } from '../lib/protocol'
import type { CreditProof, LoanAgreement, PrivacyActionResult, RepaymentSlot } from '../lib/types'

interface PoolContextValue {
  loans: LoanAgreement[]
  proof: CreditProof | null
  isSubmitting: boolean
  status: string
  createLoan: (amount: string, repayments: number) => Promise<PrivacyActionResult>
  settleNextRepayment: () => Promise<PrivacyActionResult>
  generateProof: () => Promise<PrivacyActionResult>
}

const PoolContext = createContext<PoolContextValue | null>(null)

/** Hold the local projection of private notes and call the STRK20 wallet adapter. */
export function PoolProvider({ children }: { children: ReactNode }): JSX.Element {
  const [loans, setLoans] = useState<LoanAgreement[]>([])
  const [proof, setProof] = useState<CreditProof | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('pool: ready for a private action')

  const runAction = useCallback(async (actions: Array<Record<string, unknown>>, fallback: () => void): Promise<PrivacyActionResult> => {
    setIsSubmitting(true)
    setStatus('pool: asking the wallet to build a private proof')
    try {
      const result = await submitPrivacyAction(actions)
      fallback()
      setStatus(`pool: transaction accepted ${result.transactionHash.slice(0, 10)}…`)
      return result
    } catch (error) {
      setStatus(error instanceof Error ? `pool: ${error.message}` : 'pool: private action failed')
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const createLoan = useCallback((amount: string, repayments: number) => {
    const schedule: RepaymentSlot[] = Array.from({ length: repayments }, (_, index) => ({ index: index + 1, status: 'pending', dueAt: Date.now() + (index + 1) * 604800000 }))
    return runAction(
      buildCreateLoanActions(amount, repayments),
      () => setLoans((current) => [...current, { id: crypto.randomUUID(), lenderNote: 'private', borrowerNote: 'private', schedule, amount, createdAt: Date.now(), status: 'active' }]),
    )
  }, [runAction])

  const settleNextRepayment = useCallback(() => runAction(
    buildRepaymentActions(loans[0]?.amount ?? '0', loans[0]?.id ?? '0', loans[0]?.schedule.find((slot) => slot.status === 'pending')?.index ?? 0),
    () => setLoans((current) => current.map((loan) => {
      const nextIndex = loan.schedule.findIndex((slot) => slot.status === 'pending')
      if (nextIndex < 0) return loan
      const schedule = loan.schedule.map((slot, index) => index === nextIndex ? { ...slot, status: 'settled' as const } : slot)
      return { ...loan, schedule, status: schedule.every((slot) => slot.status === 'settled') ? 'complete' : 'active' }
    })),
  ), [loans, runAction])

  const generateProof = useCallback(() => runAction(
    buildProofActions(),
    () => setProof({ statement: 'repaid 11 of 11 loans on time', answer: true, fields: proofFields }),
  ), [runAction])

  const value = useMemo(() => ({ loans, proof, isSubmitting, status, createLoan, settleNextRepayment, generateProof }), [createLoan, generateProof, isSubmitting, loans, proof, settleNextRepayment, status])
  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>
}

/** Access private pool state and transaction actions. */
export function usePoolContext(): PoolContextValue {
  const context = useContext(PoolContext)
  if (!context) throw new Error('usePoolContext must be used inside PoolProvider.')
  return context
}
