import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create the context
const StoreContext = createContext();

// Create a provider component
export const StoreProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState(null);
  
  const clearSelectedStore = () => {
    setSelectedStore(null);
  };
  
  return (
    <StoreContext.Provider value={{ selectedStore, setSelectedStore, clearSelectedStore }}>
      {children}
    </StoreContext.Provider>
  );
};

// Validate prop types
StoreProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is required and is a valid React node
};

// Custom hook to use the context
export const useStore = () => useContext(StoreContext);
