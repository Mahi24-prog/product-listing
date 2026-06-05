import { Product } from "@/types/global.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ViewMode = "grid" | "list";
type ThemeMode = "light" | "dark";

interface StoreState {
  viewMode: ViewMode;
  themeMode: ThemeMode;
  isFilterDrawerOpen: boolean;
  wishlist: string[];
  recentSearches: string[];
  recentlyViewed: Product[];

  setViewMode: (mode: ViewMode) => void;
  toggleTheme: () => void;
  setFilterDrawerOpen: (isOpen: boolean) => void;
  toggleWishlist: (productId: string) => void;
  addRecentSearch: (query: string) => void;
  addRecentlyViewed: (product: Product) => void;
  clearRecentSearches: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      viewMode: "grid",
      themeMode: "light",
      isFilterDrawerOpen: false,
      wishlist: [],
      recentSearches: [],
      recentlyViewed: [],

      setViewMode: (mode) => set({ viewMode: mode }),
      toggleTheme: () =>
        set((state) => ({
          themeMode: state.themeMode === "light" ? "dark" : "light",
        })),
      setFilterDrawerOpen: (isOpen) => set({ isFilterDrawerOpen: isOpen }),

      toggleWishlist: (productId) =>
        set((state) => {
          const isFaved = state.wishlist.includes(productId);
          return {
            wishlist: isFaved
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId],
          };
        }),

      addRecentSearch: (query) =>
        set((state) => {
          if (!query.trim()) return state;
          const filtered = state.recentSearches.filter(
            (q) => q.toLowerCase() !== query.toLowerCase(),
          );
          return { recentSearches: [query, ...filtered].slice(0, 5) };
        }),

      addRecentlyViewed: (product) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter(
            (p) => p.id !== product.id,
          );
          return { recentlyViewed: [product, ...filtered].slice(0, 5) };
        }),

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "plp-storage",
      partialize: (state) => ({
        // Persist only user preferences and history, not transient UI state.
        viewMode: state.viewMode,
        wishlist: state.wishlist,
        recentSearches: state.recentSearches,
        recentlyViewed: state.recentlyViewed,
      }),
    },
  ),
);
