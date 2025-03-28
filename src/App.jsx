import React from 'react';
import { BrowserRouter } from 'react-router';
import Routers from './routes/Routers';

const App = () => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

export default App;