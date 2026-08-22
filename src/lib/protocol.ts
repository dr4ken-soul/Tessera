const tokenAddress = import.meta.env.VITE_STRK20_TOKEN_ADDRESS as string | undefined
const coordinatorAddress = import.meta.env.VITE_TESSERA_LOAN_ADDRESS as string | undefined
const counterpartyAddress = import.meta.env.VITE_COUNTERPARTY_ADDRESS as string | undefined

/** Build a shield action and a private coordinator call for a new agreement. */
export function buildCreateLoanActions(amount: string, repayments: number): Array<Record<string, unknown>> {
  assertConfig(tokenAddress, 'VITE_STRK20_TOKEN_ADDRESS')
  assertConfig(coordinatorAddress, 'VITE_TESSERA_LOAN_ADDRESS')
  return [
    { type: 'deposit', token: tokenAddress, amount: toSmallestUnit(amount) },
    { type: 'shadow_account_invoke', dapp_name: 'tessera', nonce: '0', calls: [{ contract_address: coordinatorAddress, entry_point: 'create_loan', calldata: [String(repayments)] }] },
  ]
}

/** Build a private transfer and coordinator call for the next repayment. */
export function buildRepaymentActions(amount: string, loanId: string, dueIndex: number): Array<Record<string, unknown>> {
  assertConfig(tokenAddress, 'VITE_STRK20_TOKEN_ADDRESS')
  assertConfig(coordinatorAddress, 'VITE_TESSERA_LOAN_ADDRESS')
  assertConfig(counterpartyAddress, 'VITE_COUNTERPARTY_ADDRESS')
  return [
    { type: 'transfer', token: tokenAddress, amount: toSmallestUnit(amount), recipient: counterpartyAddress },
    { type: 'shadow_account_invoke', dapp_name: 'tessera', nonce: '0', calls: [{ contract_address: coordinatorAddress, entry_point: 'settle_repayment', calldata: [loanId, String(dueIndex)] }] },
  ]
}

/** Build the on-chain reference for a selective credit proof. */
export function buildProofActions(): Array<Record<string, unknown>> {
  assertConfig(coordinatorAddress, 'VITE_TESSERA_LOAN_ADDRESS')
  return [{ type: 'shadow_account_invoke', dapp_name: 'tessera', nonce: '0', calls: [{ contract_address: coordinatorAddress, entry_point: 'record_credit_proof', calldata: ['11', '1'] }] }]
}

/** Convert a human STRK value into the 18 decimal smallest unit representation. */
function toSmallestUnit(value: string): string {
  const [whole, decimals = ''] = value.trim().split('.')
  const paddedDecimals = `${decimals}000000000000000000`.slice(0, 18)
  return (BigInt(whole || '0') * 1000000000000000000n + BigInt(paddedDecimals)).toString()
}

/** Fail before opening a wallet approval flow when deployment configuration is absent. */
function assertConfig(value: string | undefined, name: string): asserts value is string {
  if (!value) throw new Error(`${name} is not configured for this deployment.`)
}
