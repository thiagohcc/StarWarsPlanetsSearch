import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [columnsFilterOptions, setColumnsFilterOptions] = useState([
    { name: 'population', active: true },
    { name: 'orbital_period', active: true },
    { name: 'diameter', active: true },
    { name: 'rotation_period', active: true },
    { name: 'surface_water', active: true },
  ]);

  const { makeFetch, loading, error, headers } = useFetch();

  const [planetsList, setPlanetsList] = useState([]);

  const [searching, setSearching] = useState(
    { query: '',
      columnFilter: columnsFilterOptions.find((column) => (column.active === true)).name,
      comparisonFilter: 'maior que',
      valueFilter: 0 },
  );
  const [filters, setFilters] = useState(
    {
      query:
        { query: '', active: false },
      population:
        { maior_que: -Infinity, menor_que: Infinity, igual_a: 0, active: false },
      orbital_period:
        { maior_que: -Infinity, menor_que: Infinity, igual_a: 0, active: false },
      diameter:
        { maior_que: -Infinity, menor_que: Infinity, igual_a: 0, active: false },
      rotation:
        { maior_que: -Infinity, menor_que: Infinity, igual_a: 0, active: false },
      rotation_period:
        { maior_que: -Infinity, menor_que: Infinity, igual_a: 0, active: false },
      surface_water:
        { maior_que: -Infinity, menor_que: Infinity, igual_a: 0, active: false } },
  );

  const returnFetch = async () => {
    setPlanetsList(await makeFetch());
  };

  useEffect(() => {
    returnFetch();
  }, []);

  return (
    <PlanetsContext.Provider
      value={
        { loading,
          error,
          planetsList,
          headers,
          searching,
          setSearching,
          filters,
          setFilters,
          columnsFilterOptions,
          setColumnsFilterOptions }
      }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
