import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  flavour: string;
  billing: string;
  billingLabel: string;
  qty: number;
  unitPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
