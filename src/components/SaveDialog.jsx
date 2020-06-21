import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import useGlobalState from '../useGlobalState';
import { DIALOGS } from '../utils/constants';

import { API_FUNCTIONS } from '../firebase';

const API = {
  saveCharacter: API_FUNCTIONS.httpsCallable('postRollPlayerCharacter'),
  updateCharacter: API_FUNCTIONS.httpsCallable('putRollPlayerCharacter'),
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SaveDialog() {
  const [activeDialog, setActiveDialog] = useGlobalState('activeDialog');
  const [characterId, setCharacterId] = useGlobalState('characterId');
  const [deserializedCharacter] = useGlobalState('deserializedCharacter');
  const [isCharacterComplete] = useGlobalState('isCharacterComplete');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pw, setPW] = useState(null);
  const [email, setEmail] = useState(null);

  const handleCloseDialog = () => {
    setActiveDialog(null);
  };

  useEffect(() => {
    if (pw && email) {
      setIsLoggedIn(true);
    }
  }, [pw, email, setIsLoggedIn]);

  const handleSave = async () => {
    try {
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
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  console.log({ characterId });

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
        <h3>Login</h3>
        {!isLoggedIn && (
          <FormControl className="save-login-form">
            <TextField
              id="email"
              label="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <TextField
              id="email"
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
        <Button onClick={handleCloseDialog} color="secondary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary" disabled={!isLoggedIn}>
          <SaveIcon /> {characterId ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
