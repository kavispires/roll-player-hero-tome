import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import { API_FUNCTIONS } from '../firebase';

import useGlobalState, { getCompleteGlobalState } from '../useGlobalState';
import { DIALOGS } from '../utils/constants';
import { determineCharacterCompletion, deserializeCharacter } from '../utils';

const API = {
  saveCharacter: API_FUNCTIONS.httpsCallable('postRollPlayerCharacter'),
  updateCharacter: API_FUNCTIONS.httpsCallable('putRollPlayerCharacter'),
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SaveDialog() {
  const [activeDialog, setActiveDialog] = useGlobalState('activeDialog');
  const [characterId, setCharacterId] = useGlobalState('characterId');
  const [deserializedCharacter, setDeserializedCharacter] = useGlobalState('deserializedCharacter');
  const [isCharacterComplete, setIsCharacterComplete] = useGlobalState('isCharacterComplete');
  const [, setIsCharacterGenerated] = useGlobalState('isCharacterGenerated');
  const [, setToaster] = useGlobalState('toaster');
  // Local States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pw, setPW] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const referenceObj = getCompleteGlobalState();
      setIsCharacterComplete(determineCharacterCompletion(referenceObj));
      setDeserializedCharacter(deserializeCharacter(referenceObj));
      setIsCharacterGenerated(true);
    } catch (err) {
      setIsCharacterGenerated(false);
      console.error(err);
      setToaster({ severity: 'error', message: 'Failed to get character' });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (pw && email) {
      setIsLoggedIn(true);
    }
  }, [pw, email, setIsLoggedIn]);

  const handleCloseDialog = () => {
    setActiveDialog(null);
  };

  const handleSave = useCallback(async () => {
    try {
      setIsLoading(true);
      if (isCharacterComplete) {
        let response;
        if (characterId) {
          response = await API.updateCharacter({
            id: characterId,
            ...deserializedCharacter,
          });
        } else {
          response = await API.saveCharacter(deserializedCharacter);
        }

        setCharacterId(response.id);
        setActiveDialog(null);
      } else {
        throw Error('Character is not complete');
      }
      setToaster({ severity: 'success', message: 'Failed to save character' });
    } catch (err) {
      console.error(err);
      setToaster({ severity: 'error', message: `Failed to save character: ${err}` });
    } finally {
      setIsLoading(false);
    }
  }, [
    characterId,
    deserializedCharacter,
    isCharacterComplete,
    setActiveDialog,
    setCharacterId,
    setToaster,
  ]);

  return (
    <Dialog
      open={activeDialog === DIALOGS.SAVE}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      className=""
    >
      <DialogTitle>Save Character</DialogTitle>
      <DialogContent>
        {isLoading && (
          <div className="import-list__loading">
            <CircularProgress />
          </div>
        )}
        {!isLoggedIn && (
          <FormControl className="save-login-form">
            <h3>Login</h3>
            <TextField
              id="email"
              label="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <TextField
              id="password"
              label="Password"
              onChange={(e) => setPW(e.target.value)}
              type="password"
            />
            <Button onClick={handleCloseDialog} variant="contained" color="primary">
              Login
            </Button>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        {!isCharacterComplete && (
          <span className="dialog-alert">This character sheet is incomplete</span>
        )}
        <Button onClick={handleCloseDialog} color="secondary" disabled={isLoading}>
          Close
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          disabled={!isLoggedIn || !isCharacterComplete || isLoading}
        >
          <SaveIcon /> {characterId ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
