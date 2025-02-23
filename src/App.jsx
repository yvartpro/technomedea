import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import CustomBlock from "./components/CustomBlock";
import BubbleMenu from "./components/BubbleMenu";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";
import Cart from './components/Cart';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import AddItem from './components/AddItem';       // Import the sub-components
import AddCategory from './components/AddCategory';
import ProductList from './components/ProductList';
import Orders from './components/Orders';


const App = () => {
  // useEffect(() => {
  //   document.title = "Page d'acceuil"
  // }, []) // Empty dependency array: run only on mount

  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart')
      return storedCart ? JSON.parse(storedCart) : []
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
      return []
    }
  })

  const addToCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId)
      let newCartItems
      if (existingItem) {
        newCartItems = prevItems.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        newCartItems = [...prevItems, { id: productId, quantity: 1, name: "Product Teste", imageUrl: '../backend/img/tools/steto.jpg', price: 49.99 }]
      }
      localStorage.setItem('cart', JSON.stringify(newCartItems))

      return newCartItems
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
    console.log("Cart has been updated:", cartItems)
  }, [cartItems])

  //open, update and delete from cart
  const [isCartOpen, setIsCartOpen] = useState(false)
  const openCart = () => {
    setIsCartOpen(true)
  }
  const closeCart = () => {
    setIsCartOpen(false)
  }

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const newCartItems = prevItems.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(newCartItems))
      return newCartItems
    })
  }, [setCartItems])

  const updateQuantity = useCallback((productId, newQuantity) => {
    setCartItems(prevItems => {
      let newCartItems
      if (newQuantity <= 0) {
        newCartItems = prevItems.filter(item => item.id !== productId)

      } else {
        newCartItems = prevItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      }
      localStorage.setItem('cart', JSON.stringify(newCartItems))
      return newCartItems
    })
  }, [setCartItems])

  //get categories
  const [categories, setCategories] = useState([])
  async function getCategories (){
      try {
      const resp = await fetch('https://technomedea.com/backend/fetch/categories.php')
      if (!resp.ok) throw new Error(resp.statusText)
      const res = await resp.json()
      if (!res.success) throw new Error(res.error)
      setCategories(res.data)
    } catch (err) {
      console.error("Error fetching categories:", err.message)
    }
  }
  getCategories()


  return (
    <BrowserRouter>
      <Header cartItems={cartItems} categories={categories} onCartOpen={openCart} />
      <Routes>
        <Route path="/" element={<>
            <Banner />
            <CustomBlock />
            <BubbleMenu />
            <ProductGrid addToCart={addToCart} />
          </>
        } />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add" element={<AddItem />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
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