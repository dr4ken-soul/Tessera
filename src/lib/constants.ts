export const appRoutes = {
  home: '/',
  app: '/app',
  lend: '/app/lend',
  repay: '/app/repay',
  proof: '/app/proof',
} as const

export const starknetMainnetChainId = '0x534e5f4d41494e'

export const demoHashes = {
  shield: 'awaiting mainnet transaction',
  repayment: 'awaiting mainnet transaction',
  proof: 'awaiting mainnet transaction',
} as const

export const proofFields = [
  { name: 'amount', value: null },
  { name: 'peer', value: null },
  { name: 'address', value: null },
]
