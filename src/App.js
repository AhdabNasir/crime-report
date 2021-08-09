import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Template } from 'govuk-react-jsx';
import Routes from './routes';

const App = () => (
  <Router>
    <Template
      header={{
        productName: 'Football Crime Lookup',
      }}
    >
      <Routes />
    </Template>
  </Router>
);

export default App;
