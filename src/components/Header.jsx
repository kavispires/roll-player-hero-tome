import React, { Fragment, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import CodeIcon from '@material-ui/icons/Code';
import ListAltIcon from '@material-ui/icons/ListAlt';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ShuffleIcon from '@material-ui/icons/Shuffle';

import useGlobalState, {
  resetGlobalState,
  setCompleteGlobalState,
  initialState,
} from '../useGlobalState';
import { randomizeCharacter } from '../utils';
import { DIALOGS, SCREENS, REFRESH_TIMER } from '../utils/constants';

export default function Header() {
  const [, setActiveDialog] = useGlobalState('activeDialog');
  const [isSavingEnabled, setIsSavingEnabled] = useGlobalState('isSavingEnabled');
  const [color] = useGlobalState('color');
  const [, setScreen] = useGlobalState('screen');
  // Local state
  const [saveClickCount, setSaveClickCount] = useState(0);

  const handleEditClick = () => {
    if (!isSavingEnabled) {
      setSaveClickCount((v) => ++v);
      if (saveClickCount > 1) {
        setIsSavingEnabled(true);
      }
    }
  };

  const handleRandomizer = () => {
    setScreen(SCREENS.REFRESH);

    setTimeout(() => {
      setCompleteGlobalState(randomizeCharacter(initialState));
      setScreen(SCREENS.FORM);
    }, REFRESH_TIMER);
  };

  const handleOpenPrintDialog = () => {
    setActiveDialog(DIALOGS.PRINT);
  };

  const handleOpenCodeDialog = () => {
    setActiveDialog(DIALOGS.CODE);
  };

  const handleOpenImportDialog = () => {
    setActiveDialog(DIALOGS.IMPORT);
  };

  const handleOpenSaveDialog = () => {
    setActiveDialog(DIALOGS.SAVE);
  };

  const iconColor = color === 'white' || !color ? '#232c33' : '#ffffff';

  return (
    <header className={`header app-color--${color}`}>
      <IconButton
        className="header-button"
        aria-label="reset"
        title="Reset"
        onClick={resetGlobalState}
      >
        <RotateLeftIcon style={{ color: iconColor }} />
      </IconButton>
      <h1 onClick={handleEditClick}>Roll Player: Hero Tome</h1>
      {isSavingEnabled && (
        <Fragment>
          <IconButton
            className="header-button"
            aria-label="import"
            title="Import"
            onClick={handleOpenImportDialog}
          >
            <ListAltIcon style={{ color: iconColor }} />
          </IconButton>
          <IconButton
            className="header-button"
            aria-label="save"
            title="Save"
            onClick={handleOpenSaveDialog}
          >
            <SaveIcon style={{ color: iconColor }} />
          </IconButton>
        </Fragment>
      )}
      <IconButton
        className="header-button"
        aria-label="randomize"
        title="Randomizer"
        onClick={handleRandomizer}
      >
        <ShuffleIcon style={{ color: iconColor }} />
      </IconButton>
      <IconButton
        className="header-button"
        aria-label="print"
        title="Print"
        onClick={handleOpenPrintDialog}
      >
        <PrintIcon style={{ color: iconColor }} />
      </IconButton>
      <IconButton
        className="header-button"
        aria-label="code"
        title="Text"
        onClick={handleOpenCodeDialog}
      >
        <CodeIcon style={{ color: iconColor }} />
      </IconButton>
    </header>
  );
}
