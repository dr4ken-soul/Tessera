# Tessera — Frontend Spec

## Read First

This is the authoritative frontend specification for Tessera. It describes a
**full dapp**, not a marketing page. The application is a working product a real
user opens, connects a wallet, creates a private loan, settles repayments, and
presents a selective credit proof. The landing page is the front door to it. The
coding agent builds everything in this file and nothing less.

Tessera sits beside CLAUDE.md and BUILD_GUIDE.md. CLAUDE.md holds the product
context, design system values and code rules. BUILD_GUIDE.md holds the build order,
the contract flow, and the demo recording guide. This file holds the complete
visual and interaction specification for every screen in the marketing page and
every screen in the app.

The design decisions were confirmed across all seven gates.

- Gate 1 aesthetic: cinematic motion + dark editorial
- Gate 2 nav: A1, centred glass pill
- Gate 3 background: Option 1c cinematic ambient loop + Option B staggered viewport reveal
- Gate 4 font: DM Serif Display + DM Sans + IBM Plex Mono
- Gate 5 colour: Midnight Luxe, gold accent on near-black
- Gate 6 hero: asymmetric bottom-left copy over full-bleed ambient video
- Gate 7 sections: landing hero, how it works, ledger, statement, proof, footer,
  then the app screens

**Project Identity Fingerprint (final):**
asymmetric editorial / editorial serif + sans / cold ops /
full-bleed video with tonal overlay / wave / cinematic entrance

Fingerprint redeclared once: the typography character axis moved from clean
grotesk to editorial serif + sans when the approved Midnight Luxe palette
locked DM Serif Display as the display face.

---

## Global Rules

Every rule below applies to the whole app without exception.

**Typography scale:**
```
display-xl:  font-display, clamp(2.75rem, 6vw, 5.5rem) / 1.02 leading, weight 400
display-lg:  font-display, clamp(2rem, 4vw, 3.25rem) / 1.08 leading, weight 400
heading:     font-body, 1.25rem (20px) / 1.3 leading, weight 500
body-lg:     font-body, 1.125rem (18px) / 1.6 leading, weight 300
body:        font-body, 1rem (16px) / 1.6 leading, weight 400
body-sm:     font-body, 0.875rem (14px) / 1.6 leading, weight 300
mono:        font-mono, 0.875rem (14px) / 1.5 leading, weight 400
label:       font-mono, 0.75rem (12px) / 1 leading, weight 400, tracking 0.15em, uppercase
```

**Fonts loaded in index.html:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=IBM+Plex+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

tailwind.config.ts fontFamily:
```
serif: ['DM Serif Display', 'Georgia', 'serif']
sans:  ['DM Sans', 'system-ui', 'sans-serif']
mono:  ['IBM Plex Mono', 'monospace']
```

**Colour palette (Midnight Luxe), CSS variables only, never hardcoded hex in components:**
```css
:root {
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
}
```

**Spacing tokens:**
```
xs 0.25rem, sm 0.5rem, md 1rem, lg 1.5rem, xl 2rem, 2xl 3rem, 3xl 4rem, 4xl 6rem, 5xl 8rem
```

**Radius tokens:**
```
sm 0.375rem, md 0.75rem, lg 1rem, xl 1.5rem, 2xl 2rem, pill 9999px
```

**Transition standard:**
```
fast 120ms ease, default 220ms ease, slow 400ms cubic-bezier(0.16,1,0.3,1)
```

**Animation entrance standard (all below-fold elements):**
```
initial:   { opacity: 0, filter: 'blur(8px)', y: 20 }
animate:   { opacity: 1, filter: 'blur(0px)', y: 0 }
viewport:  { once: false, amount: 0.1 }
transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
```

**REPEATABLE SCROLL ANIMATIONS:** never use `viewport={{ once: true }}`. Every
scroll-triggered animation must replay when the element leaves and re-enters the
viewport. This is non-negotiable.

**Stagger containers:** `staggerChildren: 0.08` on parent, children use variants.

**Framer Motion import:** `import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react'`

**No inline styles except:** dynamic values from useMotionValue or useTransform, and
`style={{ color: '#ef4444' }}` for error text in the terminal or ledger frames.

**No onMouseEnter or onMouseLeave for styling.** CSS class transitions only.

**No JetBrains Mono and no Space Grotesk and no Inter as display.** Every mono
instance is IBM Plex Mono.

**No logo and no favicon.** Both are comment placeholder slots until Paul supplies
the asset.

**Scrollbar:** hide it. `scrollbar-width: none` on html, `::-webkit-scrollbar { display: none }` on webkit.
`html { scroll-behavior: smooth }`.

**No em dashes anywhere** in the spec, in code comments, or in any visible copy.

---

## Routing

Use a single-page Vite app with client-side routing for the two surfaces.

```
/            landing page (marketing)
/app         the dapp (connect wallet, lend, repay, proof)
```

The landing page `Open the app` CTA routes to `/app`. The app has its own
top-level layout with the same design system and a compact app nav.

---

## PART 1 — LANDING PAGE

### Section 1 — Nav

**Component:** `src/components/layout/Nav.tsx`

**Behaviour:** Fixed position, floating above the page, does not push content down.

**Structure:**
```
<header> (fixed, top-6, left-1/2, -translate-x-1/2, z-[100], w-full, max-w-2xl, px-4)
  <nav> (liquid-glass, rounded-full, px-5, py-3, flex, items-center, justify-between)
    <div> wordmark left
      {/* Logo slot: replace with public/logo.svg once provided */}
      <span> "Tessera" — font-display, text-lg, text-[var(--text-primary)], weight 400
    <a href="/app"> (CTA)
      "Open the app"
      rounded-full, bg-[var(--accent)], text-[var(--bg-primary)]
      font-body text-sm font-medium, px-4 py-2
      hover:bg-[var(--accent-hover)] transition-default
```

**Scroll behaviour:** No change on scroll. The liquid-glass pill handles separation.

---

### Section 2 — Hero

**Component:** `src/components/landing/Hero.tsx`
**Recipe:** `cinematic-video-hero-split`, customised to a single side.

**Dimensions:** 100dvh, position relative, overflow hidden.

**z-index stack:**
```
z-0:   video background (absolute inset-0, object-cover)
z-3:   noise grain overlay (absolute inset-0, pointer-events-none)
z-[2]: gradient veil (absolute inset-0, pointer-events-none)
z-10:  content layer (absolute inset-0, flex items-end)
z-[100]: nav (fixed)
```

**Layer 1 — Video (FadingVideo):** crossfade loop, source read from
ASSET_REFERENCE.md and copied to `public/hero.mp4`.

**Layer 2 — Gradient veil:**
```
<div> (absolute, inset-0, z-[2], pointer-events-none)
  background: linear-gradient(to top, var(--bg-primary) 0%, rgba(10,10,15,0.55) 35%, transparent 65%)
```

**Layer 3 — Grain:** `<GrainOverlay />` fixed, z-[3], full viewport.

**Layer 4 — Content:** bottom-left anchor.
```
<div> (absolute inset-0 z-10 flex items-end)
  <div> (max-w-2xl, px-6 md:px-10, pb-24 md:pb-28, flex flex-col items-start)
    <motion.span> (FadeIn, delay 0.2)
      label style: font-mono text-[12px] tracking-[0.15em] uppercase text-[var(--accent)]
      "private credit on starknet"
    <motion.h1> (FadeIn, delay 0.35)
      font-display display-xl text-[var(--text-primary)]
      "Borrow privately."
      <br />
      "Prove you repay."
    <motion.p> (FadeIn, delay 0.5)
      font-body body-lg text-[var(--text-secondary)] max-w-md
      "Lend and borrow through the STRK20 pool, then prove your repayment history without revealing a single amount, counterparty or wallet."
    <motion.div> (FadeIn, delay 0.65) CTA pair
      <a href="/app"> primary "Open the app"
        liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-[var(--text-primary)]
        hover:scale-[1.02] active:scale-[0.98] transition-transform
      <a href="#proof"> secondary "See the proof"
        text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors
```

Copy register: British English, no em dashes, no banned filler words, concrete.

**No scroll indicator, no arrow, no "scroll down" copy.**

---

### Section 3 — How It Works

**Component:** `src/components/landing/HowItWorks.tsx`
**Recipe:** `stacked-card-reveal`

Three sticky cards, each `max-w-4xl rounded-2xl p-10 md:p-16 bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl shadow-black/5`.

Card 1 "Shield the principal", Card 2 "Settle on a schedule", Card 3 "Prove you repay".
Each reveals with FadeIn `once: false, amount: 0.1`.

---

### Section 4 — The Ledger

**Component:** `src/components/landing/Ledger.tsx`
**Recipe:** `asymmetric-bento-grid`

A bento grid showing the private note lifecycle, a mono ledger frame, and the
Notes, Nullifiers and Selective proof cards.

---

### Section 5 — Statement

**Component:** `src/components/landing/Statement.tsx`
**Recipe:** `full-width-statement`

```
<p> font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tighter text-[var(--text-primary)]
  "Your credit, in one proof."
```
Word-by-word FadeIn with stagger 0.05s per word, replayable. No images, no cards, no CTA.

---

### Section 6 — The Proof

**Component:** `src/components/landing/Proof.tsx`
**Recipe:** `split-image-text`

Left column headline and body, right column a framed mono proof showing a
question, the answer, and the hidden fields. Two CTAs link to `/app`.

---

### Section 7 — Footer

**Component:** `src/components/landing/Footer.tsx`

Wordmark, GitHub link, app link, and the tagline `your on-chain credit, private`.

---

## PART 2 — THE DAPP

The app is the actual product. It must work on mainnet against the STRK20 pool,
and it must carry the whole story on the screen with no audio and no captions.

**Layout:** `src/components/app/AppLayout.tsx`, a fixed top bar with the wordmark
and a disconnect control, plus a content container `max-w-6xl mx-auto px-6 py-16`.

**State:** `src/hooks/useWallet.ts`, `src/hooks/useLoans.ts`, `src/hooks/useProof.ts`.
Wallet and pool state live in React context. Status is surfaced on every screen
with a labelled status line, because the demo is silent.

**Default empty state:** every list screen shows an honest empty state with a
label and a primary action, never a blank box.

**Loading state:** skeleton shimmer, never a spinner.

### Screen A — Connect

**Path:** `/app`
**Component:** `src/components/app/Connect.tsx`

```
<section> flex flex-col items-center justify-center min-h-[70vh] text-center px-6
  <span> label: "step 01"
  <h1> display-lg font-display text-[var(--text-primary)]
    "Connect your wallet."
  <p> font-body body text-[var(--text-secondary)] max-w-md
    "Tessera runs against the live STRK20 pool on Starknet mainnet. Register the first time you use it and set a viewing key."
  <button> "Connect wallet"
    liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-[var(--text-primary)]
    hover:scale-[1.02] transition-transform
  <p> font-mono text-xs text-[var(--text-muted)] mt-6
    "network: starknet mainnet"
```

If the wallet is already connected, this screen is skipped and the app goes to
the dashboard.

### Screen B — Dashboard

**Path:** `/app`
**Component:** `src/components/app/Dashboard.tsx`

A grid of the user's position. Three cards: private balance (reads a note),
active loans, and credit proof status. Each has a mono data line and a label.

```
<div> grid grid-cols-1 md:grid-cols-3 gap-6
  Card "Private balance": value reads a shielded note, label "not disclosed",
     secondary line "notes in this channel"
  Card "Active loans": count and a status line for the schedule
  Card "Credit proof": whether the borrower has a provable record
```

Top row CTAs: `Create a loan` and `Ask for a proof`, both moving to their screens.

### Screen C — Create Loan

**Path:** `/app/lend`
**Component:** `src/components/app/CreateLoan.tsx`

The lender shields principal into the pool and records the agreement.

```
<article> max-w-2xl mx-auto
  <h1> display-lg  "Create a private loan."
  <p> body  "Set the terms. The principal becomes a note the moment it lands in the pool."
  <div> form-like rows, each with a label and an input
    <label> "principal"
    <label> "schedule"  a select of repayments and due index
    <label> "amount"   displayed but hidden from the ledger
  <button> "Shield the principal"  liquid-glass-strong rounded-full
  <p> font-mono text-xs text-[var(--text-muted)] mt-6
    "result: note 0x3a…11 minted"
```

On submit, show a labelled status line and a skeleton while the transaction confirms.

### Screen D — Repay

**Path:** `/app/repay`
**Component:** `src/components/app/Repay.tsx`

The borrower settles a due repayment on the schedule.

```
<article> max-w-2xl mx-auto
  <h1> display-lg  "Settle the schedule."
  <p> body  "Each repayment spends the old note and mints a new one."
  <div> list of repayment slots, each row a mono label and a status
    "./row" shows the due index, status pending or settled
  <button> "Settle next repayment"  liquid-glass-strong rounded-full
  <p> font-mono text-xs text-[var(--text-muted)] mt-6
    "result: note spent · note minted · nullifier fired"
```

### Screen E — Proof

**Path:** `/app/proof`
**Component:** `src/components/app/Proof.tsx`

The borrower answers a single question with a selective proof.

```
<article> max-w-2xl mx-auto
  <h1> display-lg  "Prove you repay."
  <p> body  "Ask one question and get one answer. Nothing else is disclosed."
  <div> mono ledger frame
    Row: question   "repaid 11 of 11 loans on time?"
    Row: answer     "true"
    Row: amount     "not disclosed"
    Row: peer       "not disclosed"
    Row: address    "not disclosed"
  <button> "Generate proof"  liquid-glass-strong rounded-full
  <p> font-mono text-xs text-[var(--text-muted)] mt-6
    "proof: 0x9e…d4 verified on mainnet"
```

The app reuses the same mono ledger frame style as the landing Proof section so
the two surfaces read as one product.

---

## Asset Checklist

| Asset | Location | Status |
|---|---|---|
| Hero video | `public/hero.mp4` | Paul to copy from path in ASSET_REFERENCE.md |
| Logo SVG | `public/logo.svg` | Paul to provide, comment slot until then |
| Favicon | `public/favicon.ico` | Paul to provide, comment slot until then |
| GitHub repo URL | Footer link href | Update once repo is created |

**ASSET BRIEF for hero video:**
```
ASSET BRIEF:
  Type: cinematic ambient background video
  Description: dark near-black scene with a slow drifting golden light, subtle
    floating particles, a faint technical grid, low-key and premium
  Motion: slow ambient drift, 8 to 12 second seamless loop
  Mood: cinematic, restrained, premium, privacy-native
  Resolution: 1080p minimum, MP4 H.264, target under 10MB
  Source: Paul provides, path in ASSET_REFERENCE.md
  Hosting: project public folder
  Fallback: a single poster frame from the same video, used by FadingVideo
```

---

## Banned Patterns

- JetBrains Mono, Space Grotesk, or Inter as display font
- localStorage or sessionStorage
- onMouseEnter or onMouseLeave for styling logic
- Hardcoded hex colours in component files, use CSS variables
- console.log in any component or hook
- Placeholder text, lorem ipsum, "Coming soon", "TBD"
- Round vanity numbers like "10,000+ developers" or "99.9% uptime"
- AI aesthetic symbols used as visual accents
- Gradient text on large headings
- Outer neon glows on elements
- Custom cursor overrides
- `<form>` HTML elements, use button with onClick
- Any logo or favicon not provided by Paul, slot stays a code comment
- Spinner loading states, use skeleton shimmer or nothing
- `once: true` on any whileInView or useInView
- Em dashes anywhere
