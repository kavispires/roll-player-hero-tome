import React, { forwardRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PrintIcon from '@material-ui/icons/Print';

import useGlobalState, { getCompleteGlobalState } from '../useGlobalState';
import { DIALOGS } from '../utils/constants';

import { determineCharacterCompletion, getCharacterJsonApi } from '../utils';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PrintDialog() {
  const [activeDialog, setActiveDialog] = useGlobalState('activeDialog');
  const [characterObject, setCharacterObject] = useGlobalState('characterObject');
  const [, setIsCharacterComplete] = useGlobalState('isCharacterComplete');
  const [, setIsCharacterGenerated] = useGlobalState('isCharacterGenerated');

  useEffect(() => {
    try {
      const referenceObj = getCompleteGlobalState();
      setIsCharacterComplete(determineCharacterCompletion(referenceObj));
      setCharacterObject(getCharacterJsonApi(referenceObj));
      setIsCharacterGenerated(true);
    } catch (err) {
      console.error(err);
      setIsCharacterGenerated(false);
    }
  }, []);

  const handleCloseDialog = () => {
    setActiveDialog(null);
  };

  const handlePrint = () => {
    window.localStorage.setItem('roll-player-sheet', JSON.stringify(characterObject));
    setActiveDialog(null);
  };

  return (
    <Dialog
      open={activeDialog === DIALOGS.PRINT}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
    >
      <DialogTitle>Print Character</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You may print the character sheet for Roll Player or for Roll Player Adventures
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
        <Button onClick={handlePrint} color="primary" disabled>
          <PrintIcon /> Print RPA
        </Button>
        <Button onClick={handlePrint} color="primary" disabled>
          <PrintIcon /> Print RP
        </Button>
      </DialogActions>
    </Dialog>
  );
}
