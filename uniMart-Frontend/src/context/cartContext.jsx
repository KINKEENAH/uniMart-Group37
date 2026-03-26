import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, action) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, quantity: action === "increase" ? i.quantity + 1 : Math.max(1, i.quantity - 1) }
          : i
      )
    );
  };

  const removeItem = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
