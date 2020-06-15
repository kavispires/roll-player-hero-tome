import React from 'react';
import Container from '@material-ui/core/Container';

import useGlobalState from '../useGlobalState';
import { SCREENS } from '../utils/constants';

import Form from './Form';
import Header from './Header';
import Print from './Print';
import Save from './Save';

const ScreenComponents = {
  [SCREENS.FORM]: <Form />,
  [SCREENS.Print]: <Print />,
  [SCREENS.Save]: <Save />,
};

export default function App() {
  // Global States
  const [screen] = useGlobalState('screen');

  return (
    <Container maxWidth="lg" className="app-container">
      <Header />
      {ScreenComponents[screen]}
    </Container>
  );
}
