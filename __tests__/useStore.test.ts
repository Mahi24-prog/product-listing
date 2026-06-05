import { act, renderHook } from "@testing-library/react";
import { useStore } from "@/store/useStore";

describe("useStore", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useStore());
    act(() => {
      result.current.clearRecentSearches();
    });
  });

  it("should toggle theme", () => {
    const { result } = renderHook(() => useStore());
    const initialTheme = result.current.themeMode;

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.themeMode).not.toBe(initialTheme);
  });

  it("should set view mode", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setViewMode("list");
    });

    expect(result.current.viewMode).toBe("list");
  });

  it("should toggle wishlist", () => {
    const { result } = renderHook(() => useStore());
    const productId = "test-id";

    act(() => {
      result.current.toggleWishlist(productId);
    });

    expect(result.current.wishlist).toContain(productId);

    act(() => {
      result.current.toggleWishlist(productId);
    });

    expect(result.current.wishlist).not.toContain(productId);
  });
});
