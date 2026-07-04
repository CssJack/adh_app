// src/context/AppContext.jsx
import { createContext, useContext, useReducer, useState, useEffect } from 'react';
import i18n from '../i18n';

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(i => i.id === action.item.id);
      if (existing) {
        return state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case 'REMOVE_ITEM':  return state.filter(i => i.id !== action.id);
    case 'INCREMENT':    return state.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i);
    case 'DECREMENT':    return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i).filter(i => i.qty > 0);
    case 'CLEAR':        return [];
    default:             return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('adh_user')); }
    catch { return null; }
  });

  const [favourites, setFavourites] = useState([]);
  const [lang, setLang] = useState(localStorage.getItem('adh_lang') || 'en');

  // Persist user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('adh_user', JSON.stringify(user));
    else localStorage.removeItem('adh_user');
  }, [user]);

  // Cart helpers
  const addToCart  = (item)  => dispatch({ type: 'ADD_ITEM', item });
  const removeItem = (id)    => dispatch({ type: 'REMOVE_ITEM', id });
  const increment  = (id)    => dispatch({ type: 'INCREMENT', id });
  const decrement  = (id)    => dispatch({ type: 'DECREMENT', id });
  const clearCart  = ()      => dispatch({ type: 'CLEAR' });

  const cartCount    = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal    = cart.reduce((s, i) => s + parseFloat(i.price) * i.qty, 0);
  const cartDiscount = cart.reduce((s, i) => s + (parseFloat(i.discount) || 0) * i.qty, 0);

  // Favourites
  const toggleFav = (id) =>
    setFavourites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  // Language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('adh_lang', lng);
    setLang(lng);
  };

  // Auth — store token separately
  const login = (userData, token) => {
    setUser(userData);
    if (token) localStorage.setItem('adh_token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adh_token');
    dispatch({ type: 'CLEAR' });
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeItem, increment, decrement, clearCart,
      cartCount, cartTotal, cartDiscount,
      user, login, logout,
      favourites, toggleFav,
      lang, changeLanguage,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
