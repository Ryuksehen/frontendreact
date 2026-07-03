import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  
  addToCart: (product) => {
    const { cart } = get();
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      set({
        cart: cart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },
  
  removeFromCart: (productId) => {
    set({ cart: get().cart.filter(item => item.id !== productId) });
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) return get().removeFromCart(productId);
    
    set({
      cart: get().cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    });
  },
  
  clearCart: () => set({ cart: [] }),
  
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  }
}));
