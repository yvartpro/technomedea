import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import CustomBlock from "./components/CustomBlock";
import BubbleMenu from "./components/BubbleMenu";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";
import Cart from './components/Cart'; // Assuming this is your cart component

const App = () => {
  useEffect(() => {
    document.title = "Page d'acceuil";
  }, []); // Empty dependency array: run only on mount

  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  const addToCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      let newCartItems;
      if (existingItem) {
        newCartItems = prevItems.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCartItems = [...prevItems, { id: productId, quantity: 1, name: "Product Teste", imageUrl: '/img/tools/steto.jpg', price: 49.99 }];
      }
      localStorage.setItem('cart', JSON.stringify(newCartItems));

      return newCartItems;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log("Cart has been updated:", cartItems);
  }, [cartItems]);

  //open, update and delete from cart
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => {
    setIsCartOpen(true);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const newCartItems = prevItems.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(newCartItems));
      return newCartItems;
    });
  }, [setCartItems]);

  const updateQuantity = useCallback((productId, newQuantity) => {
    setCartItems(prevItems => {
      let newCartItems;
      if (newQuantity <= 0) {
        newCartItems = prevItems.filter(item => item.id !== productId);

      } else {
        newCartItems = prevItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
      }
      localStorage.setItem('cart', JSON.stringify(newCartItems));
      return newCartItems;
    });
  }, [setCartItems]);

  return (
    <BrowserRouter>
      <Header cartItems={cartItems} onCartOpen={openCart} />
      <Banner />
      <CustomBlock />
      <BubbleMenu />
      <ProductGrid addToCart={addToCart} />
      <Cart
        cartItems={cartItems}
        onClose={closeCart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        open={isCartOpen}
      />
    </BrowserRouter>
  );
}

export default App;