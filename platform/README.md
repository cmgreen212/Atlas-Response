# Atlas Response Platform Apps

Two React-based operator interfaces for the Atlas Response medical cargo drone platform.

## Apps

### Atlas Mobile v3
Field operator app for mission crews — NMP perfusion profiles, ischemic window countdown, pod telemetry, transplant checklist, hospital dropdowns, and cross-app state sync via localStorage bridge.

- **Source**: `src/atlas_mobile_v3.jsx`
- **Compiled**: `dist/atlas_mobile_v3.html`

### Atlas ROC Console v4
Remote Operations Center dashboard — mission dispatch, fleet status, real-time telemetry monitoring, and mission value tracking.

- **Source**: `src/atlas_roc_v4.jsx`
- **Compiled**: `dist/atlas_roc_v4.html`

## Architecture

Apps are authored in JSX and pre-compiled server-side with `@babel/cli` using the classic React runtime (`React.createElement()`). The compiled HTML files are self-contained with:

- React 18.3.1 loaded from cdnjs.cloudflare.com (UMD build, no bundler needed)
- Google Fonts via `<link>` tag (no CSP-blocked `@import`)
- No runtime Babel — no `eval()` required (mobile WebView CSP-safe)
- No outer HTML skeleton — Artifact tool provides the document wrapper

## Brand System

| Token | Value | Use |
|-------|-------|-----|
| Navy | `#020C15` | Primary background |
| Gold | `#C8961E` / `#E8B84B` | Primary accent / highlight |
| Sky Blue | `#4EAEE8` | Status / telemetry accent |
| Silver | `#C4C9D4` | Secondary text |

## PHI Boundary

Platform captures logistics and telemetry only: mission IDs, pod IDs, hospital names, timestamps. No patient identifiers or clinical data. See `ADS-COC-001 Rev 1.1` for full data classification policy.
