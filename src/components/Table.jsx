import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';
import ButtonFilter from './ButtonFilter';
import ColumnDropDown from './ColumnDropDown';
import NumberInput from './NumberInput';
import OperatorDropDown from './OperatorDropDown';
import QueryInput from './QueryInput';

const DEFAULT_COMPARISON_SURFACE_WATER = -1;

export default function Table() {
  const { loading, planetsList, headers, searching, setSearching, filters, setFilters,
    columnsFilterOptions, setColumnsFilterOptions,
  } = useContext(PlanetsContext);

  const handleChange = ({ target }) => {
    setSearching({
      ...searching,
      [target.name]: target.value,
    });
  };
  const handleTextFilter = (event) => {
    if (event.key === 'Enter') {
      setFilters({
        ...filters,
        [event.target.name]: event.target.value,
      });
      setSearching({
        query: '',
      });
    }
  };
  const handleValuesFilter = () => {
    setFilters((prevState) => ({
      ...filters,
      [searching.columnFilter]:
        {
          ...prevState[searching.columnFilter],
          [searching.comparisonFilter.replace(' ', '_')]:
            parseInt(searching.valueFilter, 10) },
    }));

    const newColumns = columnsFilterOptions.map((objeto) => {
      if (objeto.name === searching.columnFilter) {
        objeto.active = false;
      }
      return objeto;
    });
    setSearching({
      ...searching,
      columnFilter: columnsFilterOptions.find((column) => (column.active === true)).name,
    });
    setColumnsFilterOptions(newColumns);
  };

  return (
    <div>
      {
        loading ? 'loading...' : (
          <div>
            <section>
              <section>
                <QueryInput
                  handleChange={ handleChange }
                  handleTextFilter={ handleTextFilter }
                />
                <ColumnDropDown handleChange={ handleChange } />
                <OperatorDropDown handleChange={ handleChange } />
                <NumberInput handleChange={ handleChange } />
                <ButtonFilter handleValuesFilter={ handleValuesFilter } />
              </section>
              <section>
                {
                  Object.keys(filters).map((key, value, index) => (
                    <div key={ index }>{ key }</div>
                  ))
                }
              </section>
            </section>
            <section>
              <table>
                <tr>
                  {
                    headers.map((header, index) => (
                      <th key={ index }>{ header.replace('_', ' ').toUpperCase() }</th>
                    ))
                  }
                </tr>
                {
                  planetsList
                    .filter((planet) => planet.name.includes(searching.query))
                    .filter((planet) => planet.name.includes(filters.query))
                    .filter((planet) => (
                      filters.population.maior_que >= 0
                        ? planet.population > filters.population.maior_que
                        : planet.population > filters.population.maior_que
                          || planet.population === 'unknown'))
                    .filter((planet) => (
                      filters.population.menor_que !== Infinity
                        ? planet.population < filters.population.menor_que
                        : planet.population < filters.population.menor_que
                        || planet.population === 'unknown'))
                    .filter((planet) => (
                      filters.population.igual_a > 0
                        ? parseInt(planet.population, 10) === filters.population.igual_a
                        : planet.population > 0 || planet.population === 'unknown'))
                    .filter((planet) => (
                      filters.orbital_period.maior_que >= 0
                        ? planet.orbital_period > filters.orbital_period.maior_que
                        : planet.orbital_period > filters.orbital_period.maior_que
                          || planet.orbital_period === 'unknown'))
                    .filter((planet) => (
                      filters.orbital_period.menor_que !== Infinity
                        ? planet.orbital_period < filters.orbital_period.menor_que
                        : planet.orbital_period < filters.orbital_period.menor_que
                        || planet.orbital_period === 'unknown'))
                    .filter((planet) => (
                      filters.orbital_period.igual_a > 0
                        ? parseInt(planet.orbital_period, 10)
                          === filters.orbital_period.igual_a
                        : planet.orbital_period > 0 || planet.orbital_period === 'unknown'
                    ))
                    .filter((planet) => (
                      filters.diameter.maior_que >= 0
                        ? planet.diameter > filters.diameter.maior_que
                        : planet.diameter > filters.diameter.maior_que
                          || planet.diameter === 'unknown'))
                    .filter((planet) => (
                      filters.diameter.menor_que !== Infinity
                        ? planet.diameter < filters.diameter.menor_que
                        : planet.diameter < filters.diameter.menor_que
                        || planet.diameter === 'unknown'))
                    .filter((planet) => (
                      filters.diameter.igual_a > 0
                        ? parseInt(planet.diameter, 10)
                          === filters.diameter.igual_a
                        : planet.diameter > 0 || planet.diameter === 'unknown'
                    ))
                    .filter((planet) => (
                      filters.rotation_period.maior_que >= 0
                        ? planet.rotation_period > filters.rotation_period.maior_que
                        : planet.rotation_period > filters.rotation_period.maior_que
                          || planet.rotation_period === 'unknown'))
                    .filter((planet) => (
                      filters.rotation_period.menor_que !== Infinity
                        ? planet.rotation_period < filters.rotation_period.menor_que
                        : planet.rotation_period < filters.rotation_period.menor_que
                        || planet.rotation_period === 'unknown'))
                    .filter((planet) => (
                      filters.rotation_period.igual_a > 0
                        ? parseInt(planet.rotation_period, 10)
                          === filters.rotation_period.igual_a
                        : planet.rotation_period > 0
                          || planet.rotation_period === 'unknown'
                    ))
                    .filter((planet) => (
                      filters.surface_water.maior_que >= 0
                        ? planet.surface_water > filters.surface_water.maior_que
                        : planet.surface_water > filters.surface_water.maior_que
                          || planet.surface_water === 'unknown'))
                    .filter((planet) => (
                      filters.surface_water.menor_que !== Infinity
                        ? planet.surface_water < filters.surface_water.menor_que
                        : planet.surface_water < filters.surface_water.menor_que
                        || planet.surface_water === 'unknown'))
                    .filter((planet) => (
                      filters.surface_water.igual_a === DEFAULT_COMPARISON_SURFACE_WATER
                        ? parseInt(planet.surface_water, 10)
                          === filters.surface_water.igual_a
                        : planet.surface_water >= 0 || planet.surface_water === 'unknown'
                    ))
                    .map((planet) => (
                      <tr key={ planet.name }>
                        <td id="name">{ planet.name }</td>
                        <td id="rotation_period">{ planet.rotation_period }</td>
                        <td id="orbital_period">{ planet.orbital_period }</td>
                        <td id="diameter">{ planet.diameter }</td>
                        <td id="climate">{ planet.climate }</td>
                        <td id="gravity">{ planet.gravity }</td>
                        <td id="terrain">{ planet.terrain }</td>
                        <td id="surface_water">{ planet.surface_water }</td>
                        <td id="population">{ planet.population }</td>
                        <td id="films">{ planet.films }</td>
                        <td id="created">{ planet.created }</td>
                        <td id="edited">{ planet.edited }</td>
                        <td id="url">{ planet.url }</td>
                      </tr>
                    ))
                }
              </table>
            </section>
          </div>
        )
      }
    </div>
  );
}
