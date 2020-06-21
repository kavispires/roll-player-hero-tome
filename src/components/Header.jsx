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

  return (
    <header className="header">
      <IconButton className="header-button" aria-label="reset" onClick={resetGlobalState}>
        <RotateLeftIcon />
      </IconButton>
      <h1 onClick={handleEditClick}>Roll Player Character Sheet</h1>
      {isSavingEnabled && (
        <Fragment>
          <IconButton
            className="header-button"
            aria-label="import"
            onClick={handleOpenImportDialog}
          >
            <ListAltIcon />
          </IconButton>
          <IconButton className="header-button" aria-label="save" onClick={handleOpenSaveDialog}>
            <SaveIcon />
          </IconButton>
        </Fragment>
      )}
      <IconButton className="header-button" aria-label="print" onClick={handleOpenPrintDialog}>
        <PrintIcon />
      </IconButton>
      <IconButton className="header-button" aria-label="code" onClick={handleOpenCodeDialog}>
        <CodeIcon />
      </IconButton>
    </header>
  );
}
