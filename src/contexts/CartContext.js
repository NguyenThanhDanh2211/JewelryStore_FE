import { createContext, useState, useEffect, useCallback } from 'react';
import {
  addToCart,
  getAllCart,
  delProductInCart,
  updateCart,
} from '~/services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalQuantity: 0 });

  // Function to add a product to the cart
  const addProductToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('authToken');
      await addToCart(productId, quantity, token);
      await fetchCart();
    } catch (error) {
      console.log('Error adding to cart: ', error);
    }
  };

  // Function to delete a product from the cart
  const deleteProductFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('authToken');
      await delProductInCart(productId, token);
      await fetchCart();
    } catch (error) {
      console.log('Error deleting product from cart: ', error);
    }
  };

  // Function to update product quantity in the cart
  const updateProductInCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('authToken');
      await updateCart(productId, quantity, token);
      await fetchCart();
    } catch (error) {
      console.log('Error updating product quantity: ', error);
    }
  };

  const resetCart = () => {
    setCart({ items: [], totalQuantity: 0 });
  };

  // Fetch cart data when the component mounts
  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const response = await getAllCart(token);

        setCart({ ...response });
      }
    } catch (error) {
      console.log('Failed to fetch cart: ', error);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        deleteProductFromCart,
        updateProductInCart,
        resetCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
