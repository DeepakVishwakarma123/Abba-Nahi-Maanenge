---
name: Panic Key
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#5c3f40'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#906f70'
  outline-variant: '#e5bdbe'
  surface-tint: '#be0037'
  primary: '#b80035'
  on-primary: '#ffffff'
  primary-container: '#e11d48'
  on-primary-container: '#fffaf9'
  inverse-primary: '#ffb3b6'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006855'
  on-tertiary: '#ffffff'
  tertiary-container: '#00836c'
  on-tertiary-container: '#eefff7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b6'
  on-primary-fixed: '#40000c'
  on-primary-fixed-variant: '#920028'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#90f5d9'
  tertiary-fixed-dim: '#74d8bd'
  on-tertiary-fixed: '#002019'
  on-tertiary-fixed-variant: '#005142'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  shortcut-key:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
spacing:
  unit: 4px
  container-padding: 16px
  stack-gap: 12px
  element-gap: 8px
---

## Brand & Style

The design system is centered on **high-performance minimalism** and **immediacy**. Designed for a browser utility that requires split-second execution, the visual language prioritizes clarity, speed, and precision. The aesthetic is "functional-industrial," stripping away all decorative elements to ensure the user's focus remains entirely on configuration and status.

The style is **Flat Modern**, characterized by:
- **Zero-latency Visuals:** No blurs, heavy shadows, or gradients that suggest "weight."
- **Precision Engineering:** Sharp corners and hairline strokes to evoke the feeling of a calibrated tool.
- **Vast Negative Space:** Generous breathing room to prevent cognitive overload during high-stress moments.
- **Information Density:** High contrast between structural elements and interactive triggers.

## Colors

The palette is restricted to a high-utility triad to maximize signal-to-noise ratio:

- **Primary (Emergency Red):** Used exclusively for destructive actions, active "Panic" states, and the main CTA. It is a vibrant, high-visibility red that commands immediate attention.
- **Secondary (Deep Slate):** Used for primary typography and iconography. This charcoal tone provides maximum legibility against the white canvas without the harshness of pure black.
- **Neutral (Surface):** A clean white background (`#FFFFFF`) paired with a cool-toned off-white (`#F8FAFC`) for secondary containers and hover states.
- **Accent/Border:** A precise light gray (`#E2E8F0`) for structural hairlines and input boundaries.

## Typography

This design system utilizes **Inter** for its neutral, systematic clarity and high legibility at small sizes. **JetBrains Mono** is introduced for shortcut keys and technical values to provide a distinct "utility" feel.

- **Headlines:** Bold and tight-set to convey authority.
- **Body:** Standardized at 14px for optimal reading within the constrained dimensions of a browser extension popup.
- **Labels:** Uppercase tracking is used for section headers to create clear visual hierarchy without increasing font size.
- **Shortcuts:** Monospaced fonts within badges ensure that key combinations (e.g., `CMD + SHIFT + W`) are instantly recognizable as technical inputs.

## Layout & Spacing

The layout follows a **Fixed Grid** model optimized for the standard Chrome extension dimensions (360px width). 

- **The 4px Rule:** All spacing and sizing must be multiples of 4px to maintain a rigid, mathematical rhythm.
- **Margins:** A consistent 16px internal padding for all main containers.
- **Stacking:** Vertically oriented content blocks with 12px gaps to separate distinct features.
- **Alignment:** Content is strictly left-aligned to mirror the way users scan technical documentation.

## Elevation & Depth

This design system intentionally avoids depth. It uses a **Flat Layering** approach:

- **Borders over Shadows:** Depth is communicated through 1px solid strokes (`#E2E8F0`) rather than drop shadows.
- **Tonal Separation:** Use the Neutral background (`#F8FAFC`) to distinguish between the primary surface and inset areas like code blocks or input fields.
- **Active State:** When an element is focused or active, the border color shifts to the Secondary color (`#0F172A`) or Primary red, providing immediate tactile feedback without changing the layout's Z-axis.

## Shapes

To reinforce the concept of "Panic" and "Precision," this design system utilizes **Sharp Corners (0px)** for all primary UI elements. 

- **Buttons & Cards:** 0px radius. This creates a technical, hardware-like aesthetic.
- **Exceptions:** Very small internal elements like Checkbox ticks or Radio inner-circles may use minimal rounding only where necessary for clarity, but the containing boxes must remain sharp.

## Components

### Buttons
- **Primary:** Solid Red (`#E11D48`) background with White text. Bold, sharp edges, no shadow.
- **Secondary:** Transparent background with a 1px Slate border. 
- **Ghost:** Text-only for low-priority actions like "Cancel" or "Reset."

### Shortcut Badges
Key combinations should be styled as "Physical Keys":
- Background: `#F1F5F9`.
- Border: 1px solid `#CBD5E1`.
- Typography: JetBrains Mono, 13px.
- Padding: 4px 8px.

### Feature Cards
Feature containers should use a 1px border (`#E2E8F0`). Do not use background fills unless the card is "Active" or "Armed," in which case use a subtle 2px left-border accent in Primary Red.

### Input Fields
Strictly rectangular. 1px border. On focus, the border thickness increases to 2px Slate (`#0F172A`). Use monospaced font for shortcut recording inputs.

### Status Indicators
A simple 8px square (sharp corners) to indicate system status:
- **Active:** Primary Red.
- **Inactive:** Slate.
- **Standby:** Light Gray.