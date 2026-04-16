# Romantic Message Web App - Agent Instructions

## Project Overview

A romantic message sharing web application where users create personalized messages through a multi-step form and generate shareable links.

**Tech Stack:** Vanilla HTML, CSS (Glassmorphism), JavaScript (localStorage)
**Language:** Indonesian (UI content)

## Architecture

### Page Flow

1. **index.html** - Start page
   - Input: Names (from → "Nama Kamu", to → "Nama Dia")
   - Action: `savePage1()` → stores to localStorage, navigates to page2.html

2. **page2.html** - Step 2
   - Input: How they met ("Pertama ketemu di mana"), First impression ("Kesan pertama")
   - Action: `savePage2()` → stores to localStorage, navigates to page3.html

3. **page3.html** - Step 3
   - Input: Precious moment ("Momen berharga...")
   - Action: `generateLink()` → creates shareable URL with query parameters

4. **result.html** - Display page
   - Shows formatted message with all collected data
   - Accessed via URL parameters: `?from=...&to=...&meet=...&first=...&moment=...`

### Data Flow

- **Multi-page state:** Uses `localStorage` to persist form data between pages
- **Sharing mechanism:** Query parameters in URL encode the message data
- **URL structure:** `result.html?from=[name1]&to=[name2]&meet=[location]&first=[impression]&moment=[text]`

### Styling

- **Design pattern:** Glassmorphism (semi-transparent cards with backdrop blur)
- **Colors:** Pink gradient (`#ff758c` to `#ff7eb3`)
- **Font:** Poppins
- **Layout:** Centered cards with responsive design

## Key Files & Conventions

- `script.js`: All application logic (page navigation, data handling, link generation)
- `style.css`: Shared styles across all pages; uses `.wrapper`, `.card`, `.container` classes
- HTML pages are minimal and rely on `script.js` for functionality
- Function naming: `savePage{N}()` for form submissions, descriptive names for actions

## Development Guidelines

- **Adding new form fields:** Add input to HTML, handle in corresponding `savePage()` function in script.js, include in URL generation in `generateLink()`
- **Styling consistency:** Use existing CSS classes; maintain glassmorphism design language
- **localStorage keys:** Keep names short and descriptive (from, to, meet, first, moment)
- **URL encoding:** Always use `encodeURIComponent()` when generating links; `decodeURIComponent()` when reading
- **Language:** Keep Indonesian for user-facing content; use English for comments/code

## Git Setup

Project is already initialized with git. Remote to be configured: `https://github.com/asrabalex-wq/project.git`

