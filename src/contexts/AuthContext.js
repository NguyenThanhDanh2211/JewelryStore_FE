import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { me } from '~/services/userService';
import { login } from '~/services/userService';
import { CartContext } from './CartContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { cart, fetchCart } = useContext(CartContext);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await me(token);
        setUser(response);
        setIsAuthenticated(true);
      } catch (error) {
        console.log('Failed', error);
      }
    }
  }, []);

  const loginAu = async (credentials) => {
    try {
      const response = await login(credentials);
      if (response && response.token) {
        localStorage.setItem('authToken', response.token);
        await fetchUser();

        await fetchCart();
        return response;
      } else {
        throw new Error('Login response does not contain token');
      }
    } catch (error) {
      console.log('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    fetchUser();

    setCartQuantity(cart.totalQuantity);
  }, [fetchUser, cart]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        fetchUser,
        loginAu,
        logout,
        cartQuantity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
