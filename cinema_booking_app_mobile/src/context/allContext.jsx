import { createContext, useState, useContext } from "react";

// Create context
const AllContext = createContext();

// Create provider component
export const AllContextProvider = ({ children }) => {
  const [selectedMovieToView, setSelectedMovieToView] = useState(null);

  return (
    <AllContext.Provider
      value={{
        selectedMovieToView,
        setSelectedMovieToView,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export const useAllContext = () => useContext(AllContext);
