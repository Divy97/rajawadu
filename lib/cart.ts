import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  variant?: string;
  options?: Record<string, string>;
};

// Unique identifier for cart items with variants
function getItemKey(item: Omit<CartItem, "quantity">): string {
  // Create a unique key based on id and variants
  return `${item.id}-${item.size || ""}-${item.variant || ""}-${JSON.stringify(
    item.options || {}
  )}`;
}

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, size?: string, variant?: string) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    size?: string,
    variant?: string
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  syncCart: () => void; // For cross-tab synchronization
  getItemCount: (id: string, size?: string, variant?: string) => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const currentItems = get().items;
        const itemKey = getItemKey(item);
        const existingItemIndex = currentItems.findIndex(
          (i) => getItemKey(i) === itemKey
        );

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const updatedItems = [...currentItems];
          const existingItem = updatedItems[existingItemIndex];
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + (item.quantity || 1),
          };

          set({ items: updatedItems });
        } else {
          // Add new item
          set({
            items: [
              ...currentItems,
              {
                ...item,
                quantity: item.quantity || 1,
              },
            ],
          });
        }
      },

      removeItem: (id, size, variant) => {
        const currentItems = get().items;
        const updatedItems = currentItems.filter((item) => {
          // If size and variant are specified, filter precisely
          if (size !== undefined || variant !== undefined) {
            return !(
              item.id === id &&
              item.size === size &&
              item.variant === variant
            );
          }
          // Otherwise just filter by id
          return item.id !== id;
        });

        set({ items: updatedItems });
      },

      updateQuantity: (id, quantity, size, variant) => {
        const currentItems = get().items;
        const updatedItems = currentItems.map((item) => {
          // If size and variant are specified, update precisely
          if (size !== undefined || variant !== undefined) {
            if (
              item.id === id &&
              item.size === size &&
              item.variant === variant
            ) {
              return { ...item, quantity: Math.max(1, quantity) };
            }
          } else if (item.id === id) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        });

        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      totalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      },

      syncCart: () => {
        // This function can be called to force a sync between tabs
        // The persist middleware will rehydrate from storage
        // Just getting the current state will trigger rehydration
        const currentItems = get().items;
        return currentItems;
      },

      getItemCount: (id, size, variant) => {
        const currentItems = get().items;

        // If size and variant are specified, count precisely
        if (size !== undefined || variant !== undefined) {
          const item = currentItems.find(
            (item) =>
              item.id === id && item.size === size && item.variant === variant
          );
          return item ? item.quantity : 0;
        }

        // Otherwise count all items with the same id
        return currentItems
          .filter((item) => item.id === id)
          .reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "rajawadu-cart", // Updated to match branding
      // Optional: Add storage event listener for cross-tab synchronization
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            // Add storage event listener for cross-tab sync
            if (typeof window !== "undefined") {
              window.addEventListener("storage", (e) => {
                if (e.key === "rajawadu-cart") {
                  // Force a sync from storage on storage events
                  state.syncCart();
                }
              });
            }
          }
        };
      },
    }
  )
);
