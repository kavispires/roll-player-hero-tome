import React from 'react';
import Container from '@material-ui/core/Container';

import Form from './Form';
import Header from './Header';
import FormDataGatherer from './FormDataGatherer';
import CodeDialog from './CodeDialog';
import PrintDialog from './PrintDialog';
import SaveDialog from './SaveDialog';

export default function App() {
  return (
    <Container maxWidth="lg" className="app-container">
      <Header />
      <Form />
      <FormDataGatherer />
      <CodeDialog />
      <PrintDialog />
      <SaveDialog />
    </Container>
  );
}
