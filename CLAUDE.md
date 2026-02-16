# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jannah Points is a mobile-first React daily habit tracker for Islamic spiritual practices (Salat, Quran reading, Dua). It's designed to be converted into a CapacitorJS mobile app.

## Commands

```bash
bun dev              # Start development server
bun run build        # TypeScript compile + Vite build
bun run lint         # Run ESLint
bun run preview      # Preview production build

# Capacitor mobile app
bunx cap add ios     # Add iOS platform
bunx cap add android # Add Android platform
bunx cap sync        # Sync web assets to native platforms
bunx cap open ios    # Open in Xcode
bunx cap open android # Open in Android Studio
```

## Architecture

### State Management
- **AppContext** (`src/context/AppContext.tsx`) - Single React Context for all app state
- Uses `useReducer` with localStorage persistence
- Handles: user profile, daily tracking, groups, selected date

### Data Flow
- All data persisted to localStorage via `src/utils/storage.ts`
- Daily tracking creates habits on-demand when accessing a date
- Score calculation in `src/utils/stats.ts` (50% prayers, 25% quran, 25% dua)

### Key Types (`src/types/index.ts`)
- `Habit` - union type: prayer (5 daily), quran (page count), dua (count)
- `DailyTracking` - date + habits + score
- `Group` - members with invite codes for sharing
- `UserProfile` - user identity for groups

### Component Structure
- **Pages** (`src/pages/`) - DailyPage, WeeklyPage, GroupPage (tab-based navigation)
- **Components** (`src/components/`) - Reusable UI, modals use slide-up animation
- Bottom navigation via `Navigation.tsx` component

### Mobile Considerations
- Uses `touch-manipulation` CSS for better touch response
- Safe area insets for notched devices (`.pt-safe`, `.safe-area-bottom`)
- Capacitor config in `capacitor.config.ts` with splash screen settings

### Styling
- Tailwind CSS v3 with custom colors (primary/emerald, accent/purple)
- Custom utilities in `src/index.css` for animations (`.animate-slide-up`)
- Arabic font support via Google Fonts (Amiri)

## Important Patterns

- Type-only imports required: `import type { ... } from '../types'`
- All modals are bottom-sheet style on mobile
- Date handling uses date-fns with `yyyy-MM-dd` format for storage keys
- Group invite codes are 6-character uppercase strings
