// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
//   color: string;
//   size: string;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string, color: string, size: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       try {
//         setCartItems(JSON.parse(storedCart));
//       } catch (error) {
//         console.error('Failed to parse cart from localStorage:', error);
//       }
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (item: CartItem) => {
//     setCartItems((prevItems) => {
//       // Check if item already exists in cart
//       const existingItemIndex = prevItems.findIndex(
//         (cartItem) => cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size
//       );

//       if (existingItemIndex !== -1) {
//         // Update quantity if item exists
//         const updatedItems = [...prevItems];
//         updatedItems[existingItemIndex].quantity += item.quantity;
//         return updatedItems;
//       } else {
//         // Add new item if it doesn't exist
//         return [...prevItems, item];
//       }
//     });
//   };

//   const removeFromCart = (id: string, color: string, size: string) => {
//     setCartItems((prevItems) => 
//       prevItems.filter((item) => 
//         !(item.id === id && item.color === color && item.size === size)
//       )
//     );
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };