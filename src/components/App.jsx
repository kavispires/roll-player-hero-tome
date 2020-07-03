import React from 'react';
import Container from '@material-ui/core/Container';

import Header from './Header';
import Toaster from './Toaster';

import Form from './Form';
import Refreshing from './Refreshing';

import CodeDialog from './CodeDialog';
import ImportDialog from './ImportDialog';
import PrintDialog from './PrintDialog';
import SaveDialog from './SaveDialog';

import { DIALOGS, SCREENS } from '../utils/constants';
import useGlobalState from '../useGlobalState';

const activeComponent = {
  [SCREENS.FORM]: <Form />,
  [SCREENS.REFRESH]: <Refreshing />,
};

const activeDialogComponent = {
  [DIALOGS.CODE]: <CodeDialog />,
  [DIALOGS.IMPORT]: <ImportDialog />,
  [DIALOGS.PRINT]: <PrintDialog />,
  [DIALOGS.SAVE]: <SaveDialog />,
};

export default function App() {
  const [screen] = useGlobalState('screen');
  const [activeDialog] = useGlobalState('activeDialog');

  return (
    <Container maxWidth="lg" className="app-container">
      <Header />
      {activeComponent[screen]}
      {activeDialogComponent[activeDialog]}
      <Toaster />
    </Container>
  );
}
