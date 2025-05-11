import React, { createContext, useState, useEffect } from "react";
import { db, doc, setDoc, getDoc, updateDoc } from "../../Firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);



  // Inside your component:
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  
    return () => unsubscribe(); // clean up listener
  }, []);
 



  
  
  useEffect(() => {
    if (!userId) return;
  
    const fetchCart = async () => {
      const docRef = doc(db, "carts", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCart(docSnap.data().items || []);
      } else {
        setCart([]);
      }
    };
  
    fetchCart();
  }, [userId]);
  

  // Save the cart data to Firebase
  const saveCartToFirebase = async (newCart) => {
    if (!userId) return;
    const docRef = doc(db, "carts", userId);
    await setDoc(docRef, { items: newCart }, { merge: true });
  };

  const addToCart = (item) => {
    const price = Number(item.price); // force it to number
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
    let newCart;
  
    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      newCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: newQuantity,
              totalPrice: newQuantity * price,
            }
          : cartItem
      );
    } else {
      newCart = [
        ...cart,
        {
          ...item,
          quantity: 1,
          price: price, // ensure it's a number
          totalPrice: price,
        }
      ];
    }
  
    setCart(newCart);
    saveCartToFirebase(newCart);
  };
  

  const removeFromCart = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    setCart(newCart);
    saveCartToFirebase(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
