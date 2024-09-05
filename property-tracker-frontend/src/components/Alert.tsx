import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {Dispatch, SetStateAction} from 'react';
import {Grow} from '@mui/material';
import {useGlobalContext} from '../contexts/GlobalContext';

export interface AlertState {
  open: boolean;
  severity: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface AlertProps {
  alert: AlertState;
  setAlert: Dispatch<SetStateAction<AlertState>>;
}

const Alert = () => {
  const {alert, setAlert} = useGlobalContext();
  const handleClose = () => {
    setAlert({...alert, open: false, message: '', severity: 'info'});
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={alert.open}
        onClose={handleClose}
        autoHideDuration={5000}
        TransitionComponent={Grow}
        key={'snackbar'}
      >
        <MuiAlert
          onClose={handleClose}
          severity={alert.severity}
          variant='standard'
          sx={{width: '100%'}}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Alert;
