import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import useGlobalState from '../useGlobalState';

export default function Toaster() {
  // Global State
  const [toaster, setToater] = useGlobalState('toaster');
  // Local state
  const [isActive, setIsActive] = useState(false);

  // Activate toast bar whenever toaster changes
  useEffect(() => {
    setIsActive(Boolean(toaster));
  }, [toaster]);

  const closeToaster = () => {
    setToater(null);
  };

  return (
    <Snackbar open={isActive} autoHideDuration={4000} onClose={closeToaster}>
      <Alert onClose={closeToaster} severity={toaster?.severity} elevation={6} variant="filled">
        {toaster?.message}
      </Alert>
    </Snackbar>
  );
}
