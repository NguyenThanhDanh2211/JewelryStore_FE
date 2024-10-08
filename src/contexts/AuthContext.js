// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     const storeUser = localStorage.getItem('authToken');
//     if (storeUser) {
//       setAuthenticated(true);
//     }
//   }, []);

//   const login = () => {
//     setAuthenticated(true);
//     localStorage.setItem('authToken');
//   };

//   const logout = () => {
//     setAuthenticated(false);
//     localStorage.removeItem('authToken');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// import { createContext, useState, useEffect, useCallback } from 'react';
// import { me } from '~/services/userService';
// import { getAllCart } from '~/services/cartService';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [userName, setUserName] = useState(null);
//   const [cart, setCart] = useState({ items: [], totalQuantity: 0 });

//   const fetchUserDetails = useCallback(async () => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       try {
//         const response = await me(token);
//         setUserName(response.name);
//       } catch (error) {
//         console.error('Failed to fetch user details:', error);
//       }
//     }
//   }, []);

//   const fetchCart = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       if (token) {
//         const response = await getAllCart(token);
//         setCart({ ...response });
//       }
//     } catch (error) {
//       console.log('Failed to fetch cart: ', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUserDetails();
//     fetchCart();
//   }, [fetchUserDetails, fetchCart]);

//   const logout = () => {
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ userName, cart, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect, useCallback } from 'react';
import { me } from '~/services/userService';
import { getAllCart } from '~/services/cartService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [cart, setCart] = useState({ items: [], totalQuantity: 0 });

  const fetchUserDetails = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await me(token);
        setUserName(response.name); // Update user name
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    }
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const response = await getAllCart(token);
        setCart({ ...response }); // Update cart
      }
    } catch (error) {
      console.log('Failed to fetch cart: ', error);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
    fetchCart();
  }, [fetchUserDetails, fetchCart]);

  const login = async (token) => {
    localStorage.setItem('authToken', token);
    await fetchUserDetails();
    await fetchCart();
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUserName(null);
    setCart({ items: [], totalQuantity: 0 });
  };

  return (
    <AuthContext.Provider value={{ userName, cart, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
