import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import CodeIcon from '@material-ui/icons/Code';

import CodeDialog from './CodeDialog';
import FormDataGatherer from './FormDataGatherer';

import useGlobalState from '../useGlobalState';

export default function Header() {
  const [isGenerated] = useGlobalState('isCharacterGenerated');
  const [, setIsCodeDialogActice] = useGlobalState('isCodeDialogActice');

  const handleOpenCodeDialog = () => {
    setIsCodeDialogActice(true);
  };

  return (
    <header className="header">
      <h1>Roll Player Character Sheet</h1>
      <IconButton className="header-button" aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton className="header-button" aria-label="print" disabled>
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
      <IconButton className="header-button" aria-label="save" disabled>
        <SaveIcon />
      </IconButton>
      <FormDataGatherer />
      <CodeDialog />
    </header>
  );
}
