import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./authContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { token, isLoggedIn } = useAuth();
  const [wishlistIds, setWishlistIds] = useState(new Set());

  const fetchWishlist = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/wishlists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setWishlistIds(new Set(data.wishlists.map((w) => w.product_id)));
      }
    } catch {}
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) fetchWishlist();
    else setWishlistIds(new Set());
  }, [isLoggedIn, fetchWishlist]);

  const toggle = async (productId) => {
    if (!token) return false;
    const isLiked = wishlistIds.has(productId);
    // Optimistic update
    setWishlistIds((prev) => {
      const next = new Set(prev);
      isLiked ? next.delete(productId) : next.add(productId);
      return next;
    });
    try {
      await fetch(`/api/wishlists/${productId}`, {
        method: isLiked ? "DELETE" : "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Revert on error
      setWishlistIds((prev) => {
        const next = new Set(prev);
        isLiked ? next.add(productId) : next.delete(productId);
        return next;
      });
    }
    return !isLiked;
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggle }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
