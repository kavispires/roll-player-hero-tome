import React from 'react';
import Container from '@material-ui/core/Container';

import Header from './Header';

import Form from './Form';
import Refreshing from './Refreshing';

import CodeDialog from './CodeDialog';
import PrintDialog from './PrintDialog';
import SaveDialog from './SaveDialog';

import { SCREENS } from '../utils/constants';
import useGlobalState from '../useGlobalState';

const activeComponent = {
  [SCREENS.FORM]: <Form />,
  [SCREENS.REFRESH]: <Refreshing />,
};

export default function App() {
  const [screen] = useGlobalState('screen');

  return (
    <Container maxWidth="lg" className="app-container">
      <Header />
      {activeComponent[screen]}
      <CodeDialog />
      <PrintDialog />
      <SaveDialog />
    </Container>
  );
}
