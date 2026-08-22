import { useWalletContext } from '../context/WalletContext'

/** Return wallet state and connection actions for a screen. */
export function useWallet() { return useWalletContext() }
