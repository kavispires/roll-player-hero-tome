import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import useGlobalState from '../useGlobalState';
import { DIALOGS } from '../utils/constants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SaveDialog() {
  const [activeDialog, setActiveDialog] = useGlobalState('activeDialog');
  const [characterObject] = useGlobalState('characterObject');
  const [isCharacterComplete] = useGlobalState('isCharacterComplete');

  const handleCloseDialog = () => {
    setActiveDialog(null);
  };

  const handleSaveLocally = () => {
    window.localStorage.setItem('roll-player-sheet', JSON.stringify(characterObject));
    setActiveDialog(null);
  };

  return (
    <Dialog
      open={activeDialog === DIALOGS.SAVE}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
    >
      <DialogTitle>Save Character</DialogTitle>
      <DialogContent>
        <DialogContentText>Here does something</DialogContentText>
        <DialogContentText>2 Here does something</DialogContentText>
      </DialogContent>
      <DialogActions>
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
