import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import Loader from '../components/Loader';

interface GlobalContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType>({
  loading: false,
  setLoading: () => {},
});

const GlobalContextProvider = ({children}: {children: React.ReactNode}) => {
  const [loading, setLoading] = useState(false);
  const contextValue = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading, setLoading]
  );
  return (
    <GlobalContext.Provider value={contextValue}>
      {loading && <Loader />}
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
