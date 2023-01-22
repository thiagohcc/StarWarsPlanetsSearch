import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const COLUMN_FILTER_OPTIONS = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
const OPERATOR_OPTIONS = ['maior que', 'menor que', 'igual a'];
const DEFAULT_COMPARISON_SURFACE_WATER = -1;

export default function Table() {
  const { loading, planetsList, headers } = useContext(PlanetsContext);
  const [searching, setSearching] = useState(
    { query: '',
      columnFilter: 'population',
      comparisonFilter: 'maior que',
      valueFilter: 0 },
  );
  const [filters, setFilters] = useState(
    {
      query: '',
      population: { maior_que: -Infinity, menor_que: Infinity, igual_a: 0 },
      orbital_period: { maior_que: -Infinity, menor_que: Infinity, igual_a: 0 },
      diameter: { maior_que: -Infinity, menor_que: Infinity, igual_a: 0 },
      rotation: { maior_que: -Infinity, menor_que: Infinity, igual_a: 0 },
      rotation_period: { maior_que: -Infinity, menor_que: Infinity, igual_a: 0 },
      surface_water: { maior_que: -Infinity, menor_que: Infinity, igual_a: 0 } },
  );
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
  };

  return (
    <div>
      {
        loading ? 'loading...' : (
          <div>
            <section>
              <input
                type="text"
                name="query"
                data-testid="name-filter"
                onChange={ handleChange }
                onKeyDown={ handleTextFilter }
                value={ searching.query }
              />
              <div>
                <div>
                  <div>Coluna:</div>
                  <select
                    name="columnFilter"
                    data-testid="column-filter"
                    onChange={ handleChange }
                  >
                    {
                      COLUMN_FILTER_OPTIONS.map((option) => (
                        <option
                          key={ option }
                          name={ option }
                          value={ option }
                        >
                          { option }
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <div>Operador:</div>
                  <select
                    name="comparisonFilter"
                    data-testid="comparison-filter"
                    onChange={ handleChange }
                  >
                    {
                      OPERATOR_OPTIONS.map((operator) => (
                        <option
                          key={ operator }
                          name={ operator }
                          value={ operator }
                        >
                          { operator }
                        </option>
                      ))
                    }
                  </select>
                  <input
                    type="number"
                    name="valueFilter"
                    data-testid="value-filter"
                    onChange={ handleChange }
                    value={ searching.valueFilter }
                  />
                  <button
                    type="button"
                    data-testid="button-filter"
                    onClick={ handleValuesFilter }
                  >
                    FILTRAR
                  </button>
                </div>
              </div>
              <div>
                {
                  Object.keys(filters).map((key, value, index) => (
                    <div key={ index }>{ key }</div>
                  ))
                }
              </div>
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
