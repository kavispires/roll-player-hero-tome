import React, { useCallback, useEffect, forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import useGlobalState, { getCompleteGlobalState } from '../useGlobalState';
import { DIALOGS } from '../utils/constants';
import {
  determineCharacterCompletion,
  getCharacterJsonApi,
  getCharacterTextString,
} from '../utils';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CodeDialog() {
  const [activeDialog, setActiveDialog] = useGlobalState('activeDialog');
  const [characterObject, setCharacterObject] = useGlobalState('characterObject');
  const [isCharacterComplete, setIsCharacterComplete] = useGlobalState('isCharacterComplete');
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
    // eslint-disable-next-line
  }, []);

  const handleCloseDialog = () => {
    setActiveDialog(null);
  };

  const saveTextFile = useCallback(() => {
    const referenceObj = getCompleteGlobalState();
    const a = document.createElement('a');
    const file = new Blob([getCharacterTextString(referenceObj)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    const characterName = referenceObj.characterName?.toLowerCase() ?? 'untitled';
    a.download = `${characterName}-hero-totem.txt`;
    a.click();
  }, []);

  return (
    <Dialog
      open={activeDialog === DIALOGS.CODE}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
    >
      <DialogTitle>Character Sheet JSON</DialogTitle>
      <DialogContent>
        <pre>{JSON.stringify(characterObject, null, 4)}</pre>
      </DialogContent>
      <DialogActions>
        {!isCharacterComplete && (
          <span className="dialog-alert">This character sheet is incomplete</span>
        )}
        <Button onClick={saveTextFile} color="primary" disabled={!isCharacterComplete}>
          <CloudDownloadIcon /> Download
        </Button>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
