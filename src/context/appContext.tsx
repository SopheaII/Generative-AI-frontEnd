import React, { createContext, useContext, useState, ReactNode } from "react";
interface AppContextType {
  isMenuOpen: boolean | null;
  setIsMenuOpen: (isMenuOpen: boolean | null) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(false);

  const values = {
    isMenuOpen,
    setIsMenuOpen
  }

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};