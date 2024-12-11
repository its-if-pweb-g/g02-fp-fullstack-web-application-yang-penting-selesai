// import { createContext, useContext, useState } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// interface CartContextType {
//   cart: Product[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   getTotalPrice: () => number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cart, setCart] = useState<Product[]>([]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingProduct = prevCart.find((item) => item.id === product.id);
//       if (existingProduct) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: number, quantity: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
//       )
//     );
//   };

//   const getTotalPrice = () =>
//     cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         getTotalPrice,
//       }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
