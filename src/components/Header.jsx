import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import CodeIcon from '@material-ui/icons/Code';

export default function Header() {
  return (
    <header className="header">
      <h1>Roll Player Character Sheet</h1>
      <IconButton className="header-button" aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton className="header-button" aria-label="print" disabled>
        <PrintIcon />
      </IconButton>
      <IconButton className="header-button" aria-label="code" disabled>
        <CodeIcon />
      </IconButton>
      <IconButton className="header-button" aria-label="save" disabled>
        <SaveIcon />
      </IconButton>
    </header>
  );
}
