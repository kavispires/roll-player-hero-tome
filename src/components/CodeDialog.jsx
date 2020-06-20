import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import useGlobalState from '../useGlobalState';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Code() {
  const [isCodeDialogActice, setIsCodeDialogActice] = useGlobalState('isCodeDialogActice');
  const [characterObject] = useGlobalState('characterObject');
  const [isCharacterComplete] = useGlobalState('isCharacterComplete');

  const handleCloseDialog = () => {
    setIsCodeDialogActice(false);
  };

  const handleSaveLocally = () => {
    window.localStorage.setItem('roll-player-sheet', JSON.stringify(characterObject));
    setIsCodeDialogActice(false);
  };

  return (
    <Dialog
      open={isCodeDialogActice}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
    >
      <DialogTitle>Character Sheet JSON</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <pre>{JSON.stringify(characterObject, null, 4)}</pre>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!isCharacterComplete && (
          <span className="dialog-alert">This character sheet is incomplete</span>
        )}
        <Button onClick={handleSaveLocally} color="primary" disabled={!isCharacterComplete}>
          Save Locally
        </Button>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
