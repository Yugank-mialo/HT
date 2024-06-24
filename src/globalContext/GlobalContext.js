import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context
const StoreContext = createContext();

// Create a provider component
export const StoreProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState(1);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Fetch token from localStorage on component mount
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const clearSelectedStore = () => {
    setSelectedStore(null);
  };

  return (
    <StoreContext.Provider value={{ selectedStore, setSelectedStore, clearSelectedStore, token }}>
      {children}
    </StoreContext.Provider>
  );
};


StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useStore = () => useContext(StoreContext);
