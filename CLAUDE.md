# Tessera — Agent Context

## What This Is

Tessera is a private peer-to-peer lending protocol with a verifiable credit
reputation, built on the STRK20 privacy pool. A lender and a borrower agree terms,
the principal becomes a private note, repayments settle on a schedule, and a
borrower later proves that they repay on time without revealing amounts,
counterparties or wallets.

Built for the STRK20 Private Sprint. Submissions close August 31 at 23:59 UTC,
winners announced September 4. Judges are StarkWare.

## One-Line Pitch

Borrow privately through the pool, then prove you repay without showing a single
amount, counterparty or wallet.

## Product Identity

Name: Tessera
Fingerprint: asymmetric editorial / editorial serif + sans / cold ops /
full-bleed video with tonal overlay / wave / cinematic entrance
Dials: DESIGN_VARIANCE 6 / MOTION_INTENSITY 6 / VISUAL_DENSITY 4

## Design System (confirmed across seven gates)

Aesthetic: cinematic motion + dark editorial
Fonts:
- Display: DM Serif Display
- Body: DM Sans
- Mono: IBM Plex Mono
Load via Google Fonts in index.html. Never use JetBrains Mono, Space Grotesk, or Inter as display.

Colour palette (Midnight Luxe):
```css
--bg-primary:     #0a0a0f;
--bg-secondary:   #111118;
--bg-surface:     #1a1a24;
--bg-elevated:    #22222e;
--accent:         #d4a853;
--accent-hover:   #e0be78;
--accent-glow:    rgba(212, 168, 83, 0.15);
--accent-dim:     #8a7233;
--text-primary:   #f0efe8;
--text-secondary: #a3a098;
--text-muted:     #525050;
--border-subtle:  rgba(255, 255, 255, 0.05);
--border-default: rgba(255, 255, 255, 0.09);
--success:        #4ade80;
--error:          #ef4444;
```

Nav: A1 centred glass pill, fixed, liquid-glass, wordmark left, one CTA right.
No centre links. No login.

## Scope

Tessera is a full dapp, not a marketing page. When a task asks to build, build
the whole thing: the landing page, the app screens, the contracts, and the
mainnet wiring. The landing page is the front door; the app is the product.

## Mainnet Flow

1. Register in the pool and set a viewing key on first use
2. Lender shields the principal into a private note, records the agreement
3. Repayments settle on the schedule, each spending a note and minting a new one
4. A lender or platform issues a signed reference note
5. A borrower answers a single question with a selective credit proof

## Landing Page Sections (in order)

1. Hero, full-viewport ambient video, asymmetric bottom-left copy
2. How it works, sticky stacked card reveal
3. The ledger, asymmetric bento grid
4. Statement, full-width type
5. The proof, split image and text
6. Footer

Details and exact class values are in FRONTEND_SPEC.md.

## Code Rules

- camelCase for all variables and functions
- JSDoc on every function and custom hook
- No inline styles except motion values and terminal-style error colour
- CSS variables used directly, never hardcoded hex in components
- No placeholder logo or favicon, slots are comments only
- No invented icon or emoji as visual accent
- No localStorage or sessionStorage
- No console.log in production paths

**Animations:**
- Import from `motion/react`
- Blur-in entrance: `initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}`
  `animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}`
- Never `viewport={{ once: true }}`. Always `once: false, amount: 0.1` so
  animations replay on re-entry
- Stagger containers use `staggerChildren: 0.08`
- No onMouseEnter or onMouseLeave for styling, CSS transitions only
- Magnetic, tilt and parallax use useMotionValue and useTransform, never useState

**Writing (copy, labels, docs, comments):**
- British English
- No em dashes anywhere
- Periods only when necessary
- Commas only when necessary
- Short direct sentences
- No filler words: seamless, powerful, robust, leverage, cutting-edge, unlock, elevate, empower, transform, revolutionise, next-gen
- CTA is direct and singular in intent, one label everywhere

## Code Standards

- No em dashes in any generated output
- Use uppercase and lowercase correctly
- Proofread every string before it ships

## Rules Without Exception

- Build to FRONTEND_SPEC.md, do not simplify or invent cheaper versions of the
  Premium Component Library patterns
- The hero video and poster come from the path in ASSET_REFERENCE.md
- The logo and favicon stay comment slots until Paul provides them
- The demo video is a silent screen recording with no voiceover, no music, no
  text overlay, no subtitles and no captions

## Submitting

- Repository goes in registry.json via a single pull request
- Build in a public repo, pushes read every 30 minutes
- Three mainnet transactions, plus a demo anyone can open
- strk20.json at the repo root with the demo video, contracts and transaction hashes
- README, LICENSE, reproducible install steps
