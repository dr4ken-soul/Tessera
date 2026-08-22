# Tessera — App Blueprint

## Product Summary

Tessera is a private peer-to-peer lending protocol with a verifiable credit
reputation, built on the STRK20 privacy pool. A lender and a borrower meet, agree
the terms, and the principal becomes a private note inside the pool. Repayments
settle on a schedule, each one spending a note and minting a new one. When a
borrower wants credit again, they present a proof that they repaid their past
loans on time, and the next lender gets a yes or a no, never the amounts, the
counterparties, or the wallets.

Built for the STRK20 Private Sprint. Submissions close August 31 at 23:59 UTC,
winners announced September 4. Judges are StarkWare.

## One-Line Pitch

Borrow privately through the pool, then prove you repay without showing a single
amount, counterparty or wallet.

## Why This Wins

The spread is judged thirty percent on STRK20 integration depth, thirty percent on
a working mainnet product, twenty-five percent on innovation, and fifteen percent
on documentation. Working product is the bar every entrant clears, so the
differentiator is integration depth plus innovation. Tessera goes deep across the
whole stack: shielded balance, private transfer, nullifier and commitment
machinery, an anonymizer flow for collateral, and selective disclosure for the
credit proof. A private credit reputation is genuinely absent from the ecosystem,
which is the innovation piece. It is a materially better take on a real problem
rather than a new toy, and it runs on what already ships.

## Scope

Tessera is delivered as a complete dapp, not a marketing page. The landing page
is the front door. The product itself is the app that a real user opens, connects
a wallet, creates a private loan, settles repayments, and presents a selective
credit proof, all against the live STRK20 pool on Starknet mainnet. The
deliverable includes the app screens, the Cairo contracts, three mainnet
transactions, and the demo recording.

## MVP Feature Set

### Feature 1: Shielded Loan

**Story:** As a lender I want to fund a loan through the pool so the principal and
both parties stay private.
- Acceptance: principal is deposited into the pool and returned as an encrypted
  note that only the agreement parties can read. The amount and the two wallet
  addresses are not recoverable by a third party.
- Complexity: Medium

### Feature 2: Scheduled Repayment

**Story:** As a borrower I want the repayment schedule enforced on-chain so the
lender knows it is set and nothing can go missing.
- Acceptance: each repayment fires on its due index, spends the previous note,
  and mints a new one. Every movement is a private transfer with a fresh nullifier.
- Complexity: Medium

### Feature 3: Selective Credit Proof

**Story:** As a borrower I want to prove my repayment history to a new lender
without revealing my amounts, counterparties or wallet.
- Acceptance: a lender can ask whether the borrower repaid eleven of eleven
  loans on time and receive a true or false answer, with every other field
  disclosed as hidden. The proof never returns the balance, the peer, or the
  address.
- Complexity: High

### Feature 4: Reference Note

**Story:** As a borrower I want a lender, an employer, or a platform to vouch for
me by issuing a signed reference note.
- Acceptance: any party with a registered viewing key can issue a signed
  reference note the borrower later presents as part of a proof. This is what
  makes Tessera adoptable rather than a walled garden.
- Complexity: Medium

## What Is Not Built in MVP

- A full order book or matched lending market
- Collateral liquidation with sub-accounts, sub-accounts are not shipped yet
- Confidential compute, not shipped yet
- A mobile app
- Off-chain fiat rails

Nothing in the MVP depends on sub-accounts or confidential compute.

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Contracts | Cairo, STRK20 pool + anonymizer helper | Native to Starknet, no separate chain |
| SDK | Privacy SDK (starkware-libs/starknet-privacy) | Wraps register, deposit, transfer, proof |
| Wallet | Privacy Wallet API where available | Dapp never touches the viewing key |
| Frontend | Vite + React 18 + TypeScript | Fast build |
| Styling | Tailwind CSS v3 | Utility-first |
| Animations | motion/react | Correct import path for v11+ |
| Icons | Lucide React | Tree-shakeable |
| Deployment | Vercel for the landing page, mainnet for the contracts | Static build plus on-chain |

## Data Structures

```typescript
interface LoanAgreement {
  lenderNote: string          // identity of the principal note
  borrowerNote: string        // identity of the borrower note
  schedule: RepaymentSlot[]   // ordered due-indexed repayments
  amount: string              // hidden but not displayed
  createdAt: number
}

interface RepaymentSlot {
  index: number
  status: 'pending' | 'settled'
  dueAt: number
}

interface CreditProof {
  statement: string           // e.g. "repaid 11 of 11 loans on time"
  answer: boolean
  fields: DisclosedField[]    // what stays hidden vs what is shown
}

interface DisclosedField {
  name: string
  value: string | null        // null when hidden
}

interface ReferenceNote {
  issuer: string
  subject: string
  signedAt: number
  statement: string
}
```

## Mainnet Flow

1. Both parties register in the pool and set a viewing key on first use
2. Lender shields the principal into the pool, producing a private note
3. The agreement is recorded with the schedule
4. On each due index, the borrower spends the old note and mints a new one
5. A lender or platform can issue a signed reference note to a borrower
6. A new lender asks a single question, the borrower answers with a proof, and
   every unrelated field stays hidden

## Submission Assets

- Repository goes in registry.json via a single pull request
- Build in a public repo, pushes read every 30 minutes
- Three mainnet transactions, plus a demo anyone can open
- strk20.json at the repo root with the demo video, contracts and transaction hashes
- README, LICENSE, and reproducible install steps

## Recording / Demo Notes

The demo is a pure screen recording. No voiceover, no music, no text overlay, no
subtitles and no captions. The UI must carry the entire story on its own, so
every step has a clear on-screen label and a deliberate pause. See the
guide in BUILD_GUIDE.md.
