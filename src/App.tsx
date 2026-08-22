import { useEffect, useState } from 'react'
import { PoolProvider } from './context/PoolContext'
import { WalletProvider } from './context/WalletContext'
import { useWallet } from './hooks/useWallet'
import { navigate, subscribeToNavigation } from './lib/navigation'
import { AppLayout } from './components/app/AppLayout'
import { Connect } from './components/app/Connect'
import { CreateLoan } from './components/app/CreateLoan'
import { Dashboard } from './components/app/Dashboard'
import { Proof } from './components/app/Proof'
import { Repay } from './components/app/Repay'
import { Footer } from './components/landing/Footer'
import { Hero } from './components/landing/Hero'
import { HowItWorks } from './components/landing/HowItWorks'
import { Ledger } from './components/landing/Ledger'
import { Nav } from './components/layout/Nav'
import { Proof as LandingProof } from './components/landing/Proof'
import { Statement } from './components/landing/Statement'

/** Mount the landing surface or the wallet-gated product surface by pathname. */
export function App(): JSX.Element {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => subscribeToNavigation(() => setPath(window.location.pathname)), [])
  return <WalletProvider><PoolProvider>{path.startsWith('/app') ? <ProductRoute path={path} /> : <LandingPage />}</PoolProvider></WalletProvider>
}

function LandingPage(): JSX.Element { return <><Nav /><main><Hero /><HowItWorks /><Ledger /><Statement /><LandingProof /></main><Footer /></> }

function ProductRoute({ path }: { path: string }): JSX.Element {
  const { address } = useWallet()
  return <AppLayout>{!address ? <Connect /> : path === '/app/lend' ? <CreateLoan /> : path === '/app/repay' ? <Repay /> : path === '/app/proof' ? <Proof /> : <Dashboard />}</AppLayout>
}

/** Keep navigation available to button-driven surfaces that need a safe fallback. */
export function openApp(): void { navigate('/app') }
