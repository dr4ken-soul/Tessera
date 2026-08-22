import { starknetMainnetChainId } from './constants'
import type { PrivacyActionResult } from './types'

interface StarknetWallet {
  enable?: () => Promise<string[]>
  request?: (request: { type: string; params?: Record<string, unknown> }) => Promise<unknown>
  selectedAddress?: string
  account?: { address?: string }
  chainId?: string
}

declare global {
  interface Window { starknet?: StarknetWallet }
}

/** Return the injected Starknet wallet when a compatible extension is present. */
export function getInjectedWallet(): StarknetWallet | null {
  return window.starknet ?? null
}

/** Ask the injected wallet for an account and return its address. */
export async function connectInjectedWallet(): Promise<{ address: string; chainId: string | null }> {
  const wallet = getInjectedWallet()
  if (!wallet) {
    throw new Error('No Starknet wallet detected. Install a privacy-enabled Starknet wallet and try again.')
  }

  const accounts = wallet.enable ? await wallet.enable() : await wallet.request?.({ type: 'wallet_requestAccounts' })
  const address = Array.isArray(accounts) ? accounts[0] : wallet.selectedAddress ?? wallet.account?.address
  if (!address) throw new Error('The wallet did not return an account.')
  const requestedChainId = await wallet.request?.({ type: 'wallet_requestChainId' })
  const chainId = typeof requestedChainId === 'string' ? requestedChainId : wallet.chainId ?? null
  if (chainId && chainId.toLowerCase() !== starknetMainnetChainId.toLowerCase()) throw new Error('Switch the wallet to Starknet mainnet before using Tessera.')
  return { address, chainId }
}

/** Disconnect the local wallet session. Injected wallets retain their own permission state. */
export function disconnectInjectedWallet(): void { return undefined }

/** Submit a privacy action through the STRK20 wallet API without exposing a viewing key. */
export async function submitPrivacyAction(actions: Array<Record<string, unknown>>): Promise<PrivacyActionResult> {
  const wallet = getInjectedWallet()
  if (!wallet?.request) throw new Error('Connect a Starknet wallet before submitting a private action.')
  const result = await wallet.request({ type: 'wallet_strk20InvokeTransaction', params: { actions, api_version: '0.10.4-rc.1' } })
  const transactionHash = extractTransactionHash(result)
  if (!transactionHash) {
    throw new Error('The wallet did not return a transaction hash for this private action.')
  }
  return { transactionHash, noteId: extractNoteId(result) }
}

/** Convert wallet API responses into the transaction hash shape used by the app. */
function extractTransactionHash(result: unknown): string | null {
  if (typeof result === 'string') return result
  if (!result || typeof result !== 'object') return null
  const value = result as Record<string, unknown>
  for (const key of ['transaction_hash', 'transactionHash', 'txHash']) {
    if (typeof value[key] === 'string') return value[key]
  }
  return null
}

/** Read a returned note id when a wallet includes one in its private response. */
function extractNoteId(result: unknown): string | undefined {
  if (!result || typeof result !== 'object') return undefined
  const value = result as Record<string, unknown>
  return typeof value.note_id === 'string' ? value.note_id : undefined
}
