export type LoanStatus = 'pending' | 'settled'

export interface RepaymentSlot {
  index: number
  status: LoanStatus
  dueAt: number
}

export interface LoanAgreement {
  id: string
  lenderNote: string
  borrowerNote: string
  schedule: RepaymentSlot[]
  amount: string
  createdAt: number
  status: 'active' | 'complete'
  transactionHash?: string
}

export interface CreditProof {
  statement: string
  answer: boolean
  fields: Array<{ name: string; value: string | null }>
  transactionHash?: string
}

export interface ReferenceNote {
  issuer: string
  subject: string
  signedAt: number
  statement: string
}

export interface WalletState {
  address: string | null
  chainId: string | null
  isConnecting: boolean
  error: string | null
}

export interface PrivacyActionResult {
  transactionHash: string
  noteId?: string
}
