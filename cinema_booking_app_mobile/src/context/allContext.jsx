import { createContext, useState, useContext } from "react";

// Create context
const AllContext = createContext();

// Create provider component
export const AllContextProvider = ({ children }) => {
  const [selectedMovieToView, setSelectedMovieToView] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisibleToast, setIsVisibleToast] = useState(false);

  return (
    <AllContext.Provider
      value={{
        selectedMovieToView,
        setSelectedMovieToView,
        errorMessage,
        setErrorMessage,
        isVisibleToast,
        setIsVisibleToast,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export const useAllContext = () => useContext(AllContext);
