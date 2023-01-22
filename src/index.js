import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetsContext from './context/PlanetsContext';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsContext.Provider>
      <App />
    </PlanetsContext.Provider>,
  );
