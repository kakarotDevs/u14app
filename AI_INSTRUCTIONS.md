# Project AI Instructions

Use this document before every action in this repo.

## Stack
- Static site: HTML + Tailwind (CDN)
- Use htmx wherever possible for interactions
- No heavy frameworks or build tools

## Styling
- Keep layout simple and mobile-friendly
- Use a clean palette and consistent spacing
- Prefer Tailwind utility classes; avoid custom CSS unless required
- Ensure color combinations meet accessibility contrast guidelines
- Prefer readable typography and clear hierarchy

### Color Palette

#### Core Colors
- **Background (page):** `#0a0a0a` (black)
- **Primary blue:** `#1C3F93` (sections, borders, brand)
- **Blue gradient (home theme):** `from-[#1c3f93] via-[#2563eb] to-[#1e40af]`
- **Gold:** `#a29063` (headings, labels, accents)
- **Gold gradient (away theme):** `from-[#a29063] via-[#b5a073] to-[#8a7a53]`
- **Gold hover:** `#8b7a55`
- **White:** `#FFFFFF` (primary text on dark/blue)
- **Grey (secondary):** `#9ca3af` (secondary text)
- **Grey (tertiary):** `#d1d5db` (muted text)
- **Border radius:** `22px` for sections (`rounded-[22px]`)

#### Theme-Specific Colors
- **Dark blue (text on gold):** `#102a63`
- **Cyan accent:** `#0ea5e9` (chat header gradient, buttons)

#### Chat Component Colors
- **Success green:** `#059669`
- **Error red:** `#dc2626`
- **Muted chat text:** `#64748b`
- **Footer text:** `#a1a1aa`
- **Chat input border:** `#e1e7f4`, `#bae6fd`
- **Chat card backgrounds:** `#f0f9ff`, `#e0f2fe`, `#f8fafc`, `#f1f5f9`
- **Delete button bg:** `#fef2f2`, `#fee2e2`
- **New room button:** `#fef3c7`, `#fde68a`
- **Dark amber text:** `#92400e`

#### Avatar Gradient Colors
- Blue: `from-[#1c3f93] to-[#2563eb]`
- Cyan: `from-[#0ea5e9] to-[#06b6d4]`
- Gold: `from-[#a29063] to-[#f59e0b]`
- Green: `from-[#10b981] to-[#059669]`
- Purple: `from-[#8b5cf6] to-[#7c3aed]`

### Typography
- Primary font: "Nunito Sans" (Google Fonts)

## Dev server
- After any changes, stop and restart the app
- Run the app on localhost:3000

## Response style
- Keep responses short and precise
- Use bullet points only
- Avoid fluff and unnecessary explanations
