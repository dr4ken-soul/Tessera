# Tessera — Build Guide

## Before You Write a Single Line of Code

Read CLAUDE.md, APP_BLUEPRINT.md and FRONTEND_SPEC.md in full. CLAUDE.md holds the
product context, design system values, code rules and canonical values.
APP_BLUEPRINT.md holds the product summary, features, data structures and mainnet
flow. FRONTEND_SPEC.md holds the complete visual and interaction specification for
the landing page and every screen of the dapp. This guide tells you the order to
build the whole thing.

Tessera is a **full dapp**, not a marketing page. The build is complete only when
all of the following land: the landing page, the app screens, the contracts, the
mainnet transactions, and the demo recording. Do not stop after the landing page.

## Prerequisites

```bash
node --version        # 18 or higher
npm --version         # 9 or higher
git --version
```

## Repository Setup

```bash
mkdir tessera && cd tessera
git init
mkdir -p docs
mkdir -p src/components/ui src/components/layout src/components/landing
mkdir -p src/components/app src/hooks src/lib src/styles src/contracts
mkdir -p public
```

## Phase 1 — Foundation

1. Create `package.json` with react, motion, lucide-react, vite, typescript,
   tailwindcss, postcss, autoprefixer
2. Create `vite.config.ts`, `tsconfig.json`, `postcss.config.js`,
   `tailwind.config.ts`
3. Create `src/styles/globals.css` with the Midnight Luxe variables, the
   liquid-glass classes, the scrollbar rules, and the grain overlay
4. Create `index.html` with the Google Fonts link and the app root

Set the fontFamily tokens and the colour tokens exactly as in FRONTEND_SPEC.md.

## Phase 2 — Landing Page

Build to FRONTEND_SPEC.md Part 1, in order:

1. `src/components/layout/Nav.tsx` (A1 centred glass pill)
2. `src/components/landing/Hero.tsx` (cinematic-video-hero-split)
3. `src/components/landing/HowItWorks.tsx` (stacked-card-reveal)
4. `src/components/landing/Ledger.tsx` (asymmetric-bento-grid)
5. `src/components/landing/Statement.tsx` (full-width-statement)
6. `src/components/landing/Proof.tsx` (split-image-text)
7. `src/components/landing/Footer.tsx`

Utility components to write first: `GrainOverlay.tsx`, `FadeIn.tsx`,
`FadingVideo.tsx`. Hooks: `useParallax.ts`. A local `App.tsx` mounts the landing
route at `/`.

## Phase 3 — The Dapp

Build to FRONTEND_SPEC.md Part 2. The app is the actual product and must work on
mainnet against the STRK20 pool.

1. `src/context/WalletContext.tsx` and `src/context/PoolContext.tsx` for wallet
   and pool state
2. `src/hooks/useWallet.ts`, `src/hooks/useLoans.ts`, `src/hooks/useProof.ts`
3. `src/components/app/AppLayout.tsx`, a fixed top bar with wordmark and a
   disconnect control, content container `max-w-6xl mx-auto px-6 py-16`
4. Screens in order: `Connect.tsx`, `Dashboard.tsx`, `CreateLoan.tsx`,
   `Repay.tsx`, `Proof.tsx`
5. Wire routing so `/app` shows the app and each app screen has a path

Every screen carries a labelled status line, an honest empty state, and a
skeleton loading state. No spinner. No blank box.

## Phase 4 — Contracts and Mainnet

1. `src/contracts/` holds the Cairo contracts: the shielded loan, the scheduled
   repayment loop, the reference note issuer, and the anonymizer helper
2. Register in the pool and set a viewing key on first use
3. Deploy on Starknet mainnet
4. Execute three mainnet transactions:
   - Shield a principal into the pool
   - Settle a repayment on the schedule
   - Produce a selective credit proof
5. Record the transaction hashes for strk20.json

Nothing depends on sub-accounts or confidential compute, which are not shipped.

## Phase 5 — Verify the Full Build

```bash
npm run dev       # preview on localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

Walk the whole flow end to end: landing, open the app, connect, create a loan,
settle a repayment, ask for a proof. Every screen must read without any audio.

## Phase 6 — Demo Recording Guide

The demo is a silent screen recording. No voiceover, no music, no text overlay,
no subtitles and no captions. Do not add any of those. The recording must be
understood from the screen alone.

**Recording setup**
- Use a screen recorder capturing the browser tab or the whole window
- Record at full browser width, no cropped or tiny windows
- Record at a comfortable zoom so the labels are legible
- Do a dry run first, then record the real take

**Pacing**
- Keep each action slow. A hard cut on a fast click reads as a blur
- Pause between each step for a beat so the viewer can read what changed
- Aim for roughly ninety seconds in total, cut anything that adds nothing
- Do not rush the proof step, it is the whole point

**On-screen clarity**
- Every screen shows a short label telling the viewer what is happening
- Privacy fields read as "not disclosed" or "hidden", never just vanish
- The three mainnet transaction hashes are visible so the judge can verify them
- The UI never depends on a tooltip or a hover to explain a state

**Story order**
1. Open the app, hero loads with the ambient video already running
2. Connect the wallet
3. Create a loan, show the principal becoming a private note
4. Settle a repayment, show the old note spent and a new one minted
5. Ask the proof question, show the answer returned with the rest hidden
6. Point out the transaction hashes on screen
7. End on the Tessera wordmark

**Do not**
- Add any voice, music, subtitle, caption, or on-screen text overlay
- Record over a stuttering connection
- Leave the camera on your face, screen recording only
- Let the recording go past the submission limit

## Phase 7 — Quality Audit

Before submission run through the checklist plus:
- No once: true anywhere
- No em dashes anywhere in copy, comments or docs
- No JetBrains Mono, no Space Grotesk, no Inter as display
- Logo and favicon are comment slots, not invented marks
- Every scroll animation replays on re-entry
- Copy is British English and uses no banned filler words
- README, LICENSE, strk20.json, and the demo video are in the repo root
- The three mainnet transaction hashes are present
- The app works on mainnet for a real user, not a prototype behind a login
