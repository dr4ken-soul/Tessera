# Tessera

Tessera is private peer-to-peer credit on Starknet. A lender shields a principal into STRK20, a borrower settles each due note, and a new lender receives one selective answer about the repayment record. Amounts, counterparties and wallet addresses stay hidden.

## What is included

- A cinematic landing surface at `/`
- A wallet-connected dapp at `/app`
- Private loan, scheduled repayment and selective proof screens
- A Cairo loan coordinator and anonymizer helper in `contracts/`
- A typed STRK20 wallet API adapter that keeps viewing keys inside the wallet
- The supplied ambient video in `public/hero.mp4`

## Run it

Requires Node.js 20 or later. The privacy SDK currently requires Node.js 24 or later when used as a direct client dependency. Tessera talks to a privacy-enabled wallet API so the browser does not handle viewing keys.

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run typecheck
npm run build
npm run preview
```

## Mainnet configuration

Copy `.env.example` to `.env` and provide the deployed Tessera contract addresses and the STRK20 prover and discovery endpoints. Connect a privacy-enabled Starknet wallet. The first private action registers the viewing key and opens the required pool channel through the wallet or SDK implementation.

Never put a private key in a `VITE_` environment variable. Vite exposes every `VITE_` variable to the browser bundle. Deployment signing must use a separate local-only deployer configuration or a wallet approval flow.

The app intentionally fails with a visible status line if no compatible wallet or transaction hash is available. It does not simulate a mainnet transaction or store a viewing key in browser storage.

## Cairo contracts

```bash
cd contracts
scarb build
```

The coordinator emits the loan, repayment, proof and reference events that a read-side indexer can project. STRK20 remains the source of truth for encrypted notes and nullifiers.

## Submission status

`strk20.json` is the machine-readable submission manifest. Mainnet transaction hashes and the silent screen recording are marked pending because they require a connected signing wallet and a recorded browser session. No fabricated hashes are included.

## License

MIT
