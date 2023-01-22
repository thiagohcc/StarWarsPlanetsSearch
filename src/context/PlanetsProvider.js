import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const { makeFetch, loading, error, headers } = useFetch();
  const [planetsList, setPlanetsList] = useState([]);

  const returnFetch = async () => {
    setPlanetsList(await makeFetch());
  };

  useEffect(() => {
    returnFetch();
  }, []);

  return (
    <PlanetsContext.Provider value={ { loading, error, planetsList, headers } }>
      { console.log(planetsList) }
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
