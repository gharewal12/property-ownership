import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import Loader from '../components/Loader';
import Alert, {AlertState} from '../components/Alert';

interface GlobalContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  alert: AlertState;
  setAlert: Dispatch<SetStateAction<AlertState>>;
}

const GlobalContext = createContext<GlobalContextType>({
  loading: false,
  setLoading: () => {},
  alert: {open: false, message: '', severity: 'info'},
  setAlert: () => {},
});

const GlobalContextProvider = ({children}: {children: React.ReactNode}) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const contextValue = useMemo(
    () => ({
      loading,
      setLoading,
      alert,
      setAlert,
    }),
    [loading, setLoading]
  );
  return (
    <GlobalContext.Provider value={contextValue}>
      {alert.open && <Alert />}
      {loading && <Loader />}
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
