# RESTRICTED: Project Restructuring & Clean Code Plan

Goal: Clean the root directory and apply clean code principles throughout the codebase.

## 🛠 Proposed Changes

### 📁 Root Directory Cleanup
- **[DELETE]** `styles/` (empty root directory)
- **[MOVE]** `scripts/` → `src/scripts/`
- **[MOVE]** `templates/` → `src/templates/`
- **[UPDATE]** All script paths in `package.json` and logic if they reference root.

### 🧩 Source Code Organization (`src/`)
- **[ORGANIZED]** Move `data/` and `lib/` into logical subfolders within `src/` if they grow too large. (Currently `src/data` and `src/lib` exist and are fine).
- **[MOVE]** Root `index.css` → `src/index.css` (Already there).

### ✨ Clean Code Refactoring
- **[FIX]** Hardcoded strings in `App.tsx` and `pages/`.
- **[DRY]** Extract repetitive UI logic in `BookCard` or lists.
- **[TYPING]** Improve TypeScript interfaces for books/users.

## ✅ Verification Plan

### Automated
1. `npm run build`
2. `npm run lint`
3. `python .agent/scripts/verify_all.py .`

### Manual
1. Verify CMS functionality (saving books) works after move.
2. Verify visual appearance remains consistent.
