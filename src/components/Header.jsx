import React, { Fragment, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import CodeIcon from '@material-ui/icons/Code';
import ListAltIcon from '@material-ui/icons/ListAlt';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import useGlobalState, { resetGlobalState } from '../useGlobalState';
import { DIALOGS } from '../utils/constants';

export default function Header() {
  const [, setActiveDialog] = useGlobalState('activeDialog');
  const [isSavingEnabled, setIsSavingEnabled] = useGlobalState('isSavingEnabled');
  const [color] = useGlobalState('color');
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
      <IconButton className="header-button" aria-label="reset" onClick={resetGlobalState}>
        <RotateLeftIcon style={{ color: iconColor }} />
      </IconButton>
      <h1 onClick={handleEditClick}>Roll Player: Hero Tome</h1>
      {isSavingEnabled && (
        <Fragment>
          <IconButton
            className="header-button"
            aria-label="import"
            onClick={handleOpenImportDialog}
          >
            <ListAltIcon style={{ color: iconColor }} />
          </IconButton>
          <IconButton className="header-button" aria-label="save" onClick={handleOpenSaveDialog}>
            <SaveIcon style={{ color: iconColor }} />
          </IconButton>
        </Fragment>
      )}
      <IconButton className="header-button" aria-label="print" onClick={handleOpenPrintDialog}>
        <PrintIcon style={{ color: iconColor }} />
      </IconButton>
      <IconButton className="header-button" aria-label="code" onClick={handleOpenCodeDialog}>
        <CodeIcon style={{ color: iconColor }} />
      </IconButton>
    </header>
  );
}
