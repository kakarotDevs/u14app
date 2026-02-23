# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Project Overview

Static single-page site for North Lakes United FC U14 team. Simple stack with no build tools.

## Build/Dev Commands

```bash
# Start local dev server on port 3000
npx serve -l 3000

# Open http://localhost:3000 in browser
```

- No build step required - serve static files directly
- No lint/typecheck commands configured
- No test suite - manual browser testing required
- After changes, restart the dev server to see updates

## Stack

- **HTML**: Semantic markup, accessible elements
- **Tailwind CSS**: Loaded via CDN (`https://cdn.tailwindcss.com`)
- **htmx**: Dynamic content loading (`htmx.min.js`)
- **JavaScript**: Vanilla JS, no frameworks
- **Fonts**: Nunito Sans via Google Fonts

## Project Structure

```
/
├── index.html        # Main page layout and content
├── chat.js           # Chat functionality (localStorage-based)
├── htmx.min.js       # htmx library (vendored)
├── partials/         # HTML snippets loaded by htmx
│   ├── chat.html     # Chat modal content
│   ├── fixtures.html # Match fixtures data
│   └── news.html     # Club news items
├── assets/           # Images and static files
├── AI_INSTRUCTIONS.md # Styling guidelines and color palette
└── README.md         # Project documentation
```

## Code Style

### HTML

- Use 4-space indentation
- Semantic HTML elements (`<main>`, `<section>`, `<article>`, `<nav>`)
- Include `aria-label` on nav elements
- Add `aria-live="polite"` on dynamic content containers
- Use `type="button"` on all `<button>` elements
- Include `alt` text on images with `width` and `height` attributes
- Self-close void elements (`<img />`, `<br />`)

### Tailwind CSS

- Prefer Tailwind utility classes over custom CSS
- Use project's custom color tokens: `sea`, `sea-dark`, `sun`
- Border radius: `rounded-[22px]` for major sections, `rounded-2xl` for cards
- Use `motion-safe:animate-rise` for entrance animations with `animation-delay`
- Apply focus states: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4`
- Use `transition` class for hover effects

### Color Palette (from AI_INSTRUCTIONS.md)

```
Background:    #0a0a0a
Primary blue:  #1C3F93 (sea)
Dark blue:     #102a63 (sea-dark)
Gold:          #a29063 (sun)
Gold hover:    #8b7a55
White:         #FFFFFF
Grey primary:  #9ca3af
Grey secondary: #d1d5db
Cyan accent:   #0ea5e9
```

Theme-specific:
- Home games: Blue gradient background, gold accents
- Away games: Gold gradient background, blue accents

### JavaScript

- Wrap code in IIFE: `(function () { ... })()`
- Use `const` for constants, `let` for mutable variables
- Arrow functions for callbacks
- Template literals for string interpolation
- `async/await` for async operations
- `try/catch` for error handling, especially with `fetch` and `localStorage`
- `document.querySelector()` and `document.getElementById()` for DOM access
- `addEventListener()` for event binding
- `dataset` attribute for data attributes on elements
- Escape user input before rendering (see `escapeHtml` in chat.js)
- No comments in production code

### htmx Patterns

- Use `hx-get` for loading partials
- `hx-trigger="load"` for immediate loading
- `hx-trigger="once"` for single load
- `hx-swap="innerHTML"` for content replacement
- Listen for `htmx:afterSwap` to initialize JavaScript after content loads

## Error Handling

- Wrap `localStorage` access in `try/catch` blocks
- Return sensible defaults on parse failures
- Use `console.error()` for logging fetch failures
- Provide fallback content when data fails to load

## Accessibility

- Ensure color contrast meets WCAG guidelines
- Add `aria-live` regions for dynamic content updates
- Include visible focus indicators
- Use semantic heading hierarchy (h1, h2, h3)
- Provide descriptive link text

## Data Attributes

Fixtures use data attributes for structured data:
```html
<div
  data-fixture
  data-date="2026-03-15"
  data-display-date="Sun 15 Mar"
  data-time="9:00 AM"
  data-venue="Venue Name"
  data-home="Home Team"
  data-away="Away Team"
  data-round="Round 2"
>
```

## Making Changes

1. Edit HTML/JS files directly
2. Restart dev server to see changes
3. Test in browser at localhost:3000
4. Test on mobile viewport (responsive design)
5. Verify htmx-loaded content works correctly

## Files to Reference

- `AI_INSTRUCTIONS.md`: Detailed styling guide and color palette
- `README.md`: Project overview and structure
- `partials/fixtures.html`: Example of data attribute usage
- `chat.js`: Example of JavaScript patterns
