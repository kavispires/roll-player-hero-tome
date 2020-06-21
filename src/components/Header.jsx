import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import CodeIcon from '@material-ui/icons/Code';

import useGlobalState from '../useGlobalState';
import { DIALOGS } from '../utils/constants';

export default function Header() {
  const [, setActiveDialog] = useGlobalState('activeDialog');
  const [isGenerated] = useGlobalState('isCharacterGenerated');
  const [isComplete] = useGlobalState('isCharacterComplete');
  const [isSavingEnabled, setIsSavingEnabled] = useGlobalState('isSavingEnabled');
  // Local state
  const [saveClickCount, setSaveClickCount] = useState(0);

  const handleEditClick = () => {
    if (!isSavingEnabled) {
      setSaveClickCount((v) => ++v);
      if (saveClickCount > 5) {
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

  const handleOpenSaveDialog = () => {
    setActiveDialog(DIALOGS.SAVE);
  };

  return (
    <header className="header">
      <IconButton
        className="header-button"
        aria-label="edit"
        onClick={handleEditClick}
        disabled={isSavingEnabled}
      >
        <EditIcon />
      </IconButton>
      <h1>Roll Player Character Sheet</h1>
      <IconButton
        className="header-button"
        aria-label="print"
        disabled={!isGenerated}
        onClick={handleOpenPrintDialog}
      >
        <PrintIcon />
      </IconButton>
      <IconButton
        className="header-button"
        aria-label="code"
        disabled={!isGenerated}
        onClick={handleOpenCodeDialog}
      >
        <CodeIcon />
      </IconButton>
      <IconButton
        className="header-button"
        aria-label="save"
        disabled={!isGenerated}
        onClick={handleOpenSaveDialog}
      >
        <SaveIcon />
      </IconButton>
    </header>
  );
}
