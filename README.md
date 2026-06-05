# Product Listing

A modern product listing application built with **Next.js**, **Material UI (MUI)**, **Zustand**, and **React Query**. The application provides a seamless shopping experience with URL-driven search and filters, sorting, quick product view, theme switching, wishlist management, and recently viewed products.

---

## Tech Stack

### Frontend

- Next.js
- React
- Material UI (MUI)

### State Management

- Zustand

### Data Fetching

- React Query (TanStack Query)

### Testing & Code Quality

- Jest
- ESLint

---

## Architecture Overview

The application follows a feature-based architecture with clear separation of concerns:

```text
src/
├── components/      # Reusable UI components
├── pages/           # Next.js routes
├── hooks/           # Custom hooks ( React Query )
├── store/           # Zustand stores
└── types/           # types
```

### State Management Strategy

| State Type       | Solution                |
| ---------------- | ----------------------- |
| Server State     | React Query             |
| UI State         | Zustand                 |
| Search & Filters | URL Parameters          |
| Theme Preference | Zustand + Local Storage |
| Wishlist         | Zustand + Local Storage |
| Recently Viewed  | Zustand + Local Storage |

### Data Flow

```text
User Action
    ↓
URL Parameters / UI State
    ↓
React Components
    ↓
React Query
    ↓
API / Data Source
    ↓
Cached Response
    ↓
UI Update
```

---

## Features

- Product listing page
- URL-driven search
- URL-synced filters
- URL-synced sorting
- Product quick view
- Wishlist management
- Recently viewed products
- Light/Dark theme switching
- Responsive design
- Persistent user preferences

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Run production build
npm run lint     # Run ESLint
npx jest         # Run test suite
```

---

## Tradeoffs & Assumptions

### Zustand for Global State

Zustand was chosen over Redux to keep state management simple and lightweight.

**Pros**

- Minimal boilerplate
- Easy to learn and maintain
- Good performance

**Tradeoff**

- Smaller ecosystem compared to Redux

### URL-Based Search & Filters

Search, sorting, and filtering state are stored in URL query parameters.

**Benefits**

- Shareable URLs
- Browser back/forward support
- State persistence on refresh

**Tradeoff**

- Additional synchronization logic between UI state and URL state

### Local Storage Persistence

The following data is stored locally:

- Theme preference
- Wishlist items
- Recently viewed products

**Assumption**

- User-specific preferences do not require backend persistence.

---

## Performance Considerations

- React Query caching minimizes unnecessary network requests.
- Zustand reduces component re-renders through selective subscriptions.
- URL-driven state prevents duplicate state management.
- Next.js provides automatic code splitting and route optimization.
- Local storage improves user experience by preserving preferences across sessions.
- Reusable components help maintain a scalable and performant UI.

---

## Notes

- Search, sort order, and filters are synchronized with the URL.
- Theme preference, wishlist items, recent searches, and recently viewed products are stored locally.
- The application is designed to be scalable, maintainable, and easy to extend.
