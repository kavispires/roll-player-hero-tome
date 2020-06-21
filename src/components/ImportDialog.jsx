import React, { forwardRef, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import CircularProgress from '@material-ui/core/CircularProgress';

import { API_FUNCTIONS } from '../firebase';

import useGlobalState, { getCompleteGlobalState } from '../useGlobalState';
import { DIALOGS, TYPES } from '../utils/constants';

import { determineCharacterCompletion, getCharacterJsonApi } from '../utils';
import { getHashData } from '../database';

const API = {
  getCharacters: API_FUNCTIONS.httpsCallable('getRollPlayerCharacters'),
  getCharacter: API_FUNCTIONS.httpsCallable('getRollPlayerCharacter'),
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImportDialog() {
  const [activeDialog, setActiveDialog] = useGlobalState('activeDialog');
  const [characterObject, setCharacterObject] = useGlobalState('characterObject');
  const [isCharacterComplete, setIsCharacterComplete] = useGlobalState('isCharacterComplete');
  const [, setIsCharacterGenerated] = useGlobalState('isCharacterGenerated');

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    try {
      setIsLoading(true);
      async function getCharacters() {
        const response = await API.getCharacters();
        setCharacters(response.data);
      }
      getCharacters();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCloseDialog = () => {
    setActiveDialog(null);
  };

  const handlePrint = () => {
    window.localStorage.setItem('roll-player-sheet', JSON.stringify(characterObject));
    setActiveDialog(null);
  };

  const handleSelectCharacter = (evt) => {
    console.log(evt);
    // setSelectedCharacter()
  };

  return (
    <Dialog
      open={activeDialog === DIALOGS.IMPORT}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
    >
      <DialogTitle>Load Character</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <div className="import-list--loading">
            <CircularProgress />
          </div>
        ) : (
          <ul className="import-list">
            {characters.map((character) => {
              return (
                <li key={character.id} className="import-list__character">
                  <button onClick={handleSelectCharacter} id={character.id}>
                    <b>{character.name}</b>, a{' '}
                    {getHashData(TYPES.RACE)[character.race].name ?? 'character'} created by{' '}
                    {character.player}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handlePrint}
          color="primary"
          disabled={!isLoading || !Boolean(selectedCharacter)}
        >
          <OpenInBrowserIcon /> Load Character
        </Button>
      </DialogActions>
    </Dialog>
  );
}
