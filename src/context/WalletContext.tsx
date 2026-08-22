import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { connectInjectedWallet, disconnectInjectedWallet } from '../lib/starknet'
import type { WalletState } from '../lib/types'

interface WalletContextValue extends WalletState {
  connect: () => Promise<boolean>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextValue | null>(null)

/** Provide the connected Starknet wallet to every app screen. */
export function WalletProvider({ children }: { children: ReactNode }): JSX.Element {
  const [state, setState] = useState<WalletState>({ address: null, chainId: null, isConnecting: false, error: null })

  const connect = useCallback(async () => {
    setState((current) => ({ ...current, isConnecting: true, error: null }))
    try {
      const wallet = await connectInjectedWallet()
      setState({ address: wallet.address, chainId: wallet.chainId, isConnecting: false, error: null })
      return true
    } catch (error) {
      setState((current) => ({ ...current, isConnecting: false, error: error instanceof Error ? error.message : 'Wallet connection failed.' }))
      return false
    }
  }, [])

  const disconnect = useCallback(() => {
    disconnectInjectedWallet()
    setState({ address: null, chainId: null, isConnecting: false, error: null })
  }, [])

  const value = useMemo(() => ({ ...state, connect, disconnect }), [connect, disconnect, state])
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

/** Access wallet state and connection actions. */
export function useWalletContext(): WalletContextValue {
  const context = useContext(WalletContext)
  if (!context) throw new Error('useWalletContext must be used inside WalletProvider.')
  return context
}
