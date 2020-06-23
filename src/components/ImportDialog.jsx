import React, { forwardRef, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import Slide from '@material-ui/core/Slide';

import { getHashData } from '../database';
import { API_FUNCTIONS } from '../firebase';
import useGlobalState, { setCompleteGlobalState, initialState } from '../useGlobalState';
import { loadCharacterFromDatabase } from '../utils';
import { DIALOGS, TYPES, SCREENS, REFRESH_TIMER } from '../utils/constants';

const API = {
  getCharacters: API_FUNCTIONS.httpsCallable('getRollPlayerCharacters'),
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImportDialog() {
  // Global States
  const [activeDialog, setActiveDialog] = useGlobalState('activeDialog');
  const [, setScreen] = useGlobalState('screen');
  // Local states
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
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

  const handleLoadCharacter = () => {
    setActiveDialog(null);
    setScreen(SCREENS.REFRESH);

    setTimeout(() => {
      setCompleteGlobalState(
        loadCharacterFromDatabase(characters, selectedCharacterId, initialState)
      );
      setScreen(SCREENS.FORM);
    }, REFRESH_TIMER);
  };

  const handleSelectCharacter = (event) => {
    setSelectedCharacterId(event.target.id);
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
          <div className="import-list__loading">
            <CircularProgress />
          </div>
        ) : (
          <ul className="import-list">
            {characters.map((character) => {
              const selectedClass =
                character.id === selectedCharacterId ? 'import-list__character--active' : '';
              return (
                <li key={character.id} className={`import-list__character ${selectedClass}`}>
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
          onClick={handleLoadCharacter}
          color="primary"
          disabled={isLoading || !Boolean(selectedCharacterId)}
        >
          <OpenInBrowserIcon /> Load Character
        </Button>
      </DialogActions>
    </Dialog>
  );
}
