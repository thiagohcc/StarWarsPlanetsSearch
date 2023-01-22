import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';

import Table from './components/Table';

import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <h1>STAR WARS</h1>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
