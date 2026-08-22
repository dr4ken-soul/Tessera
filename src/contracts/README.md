# Tessera contract package

The deployable Cairo package lives in `contracts/`. It contains the Tessera loan coordinator and the anonymizer helper. The coordinator records loan indexes, repayment events, selective proof statements and reference notes. Principal shielding, note spending, nullifiers and proof validity stay inside the STRK20 privacy pool. The frontend never receives a viewing key.

Build from the repository root after installing Scarb:

```bash
cd contracts
scarb build
```

The wallet adapter in `src/lib/starknet.ts` sends private actions through the STRK20 wallet API. Contract addresses and the prover and discovery endpoints must be supplied by the deployed environment before a mainnet transaction can be signed.
