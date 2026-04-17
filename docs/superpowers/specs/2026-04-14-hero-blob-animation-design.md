# Hero Blob Animation — Design Spec
Date: 14.04.2026

## What & Why
Add fluid morphing blob animations to the hero section of `index.html` to deepen the "Bohemian Flow" vibe — organic, alive, and warm without being distracting.

## Decisions Made
- **Animation style:** Fluid gradient blobs (morphing border-radius + slow translate)
- **Location:** Hero section only
- **Intensity:** Prominent (~0.42–0.55 opacity) — rich color, clearly moving
- **Logo watermark:** Existing `./brand_assests/logo.png` image (already in hero), no change needed

## Implementation

### Three blobs, pure CSS — no JS, no libraries

| Blob | Color | Position | Size | Duration | Opacity |
|------|-------|----------|------|----------|---------|
| 1 | Orange `rgba(245,168,0,…)` | Upper-left | 55% × 70% | 9s | 0.48 |
| 2 | Navy-blue `rgba(40,80,160,…)` | Lower-right | 60% × 75% | 12s | 0.55 |
| 3 | Orange accent (smaller) | Mid-right | 30% × 40% | 7s | 0.42 |

Each blob uses:
- `filter: blur(45–70px)` for soft glow
- Unique `border-radius` keyframe morphing (organic shape shift)
- Slow `translate` drift on top of the morph
- `pointer-events: none` so they never block clicks

### Files changed
- `index.html` only — add CSS keyframes + blob classes to `<style>`, add 3 `<div>` elements inside `#hero`

### Placement in hero HTML
After the existing background layers (dot-grid, radial gradient, corner gradient) and before the scan line — blobs sit between background decorations and content.

## What stays unchanged
- Existing dot grid, radial gradient, corner gradient, scan line, floating logo — all kept as-is
- Blobs are additive; they layer underneath the existing orange top-glow and complement it
