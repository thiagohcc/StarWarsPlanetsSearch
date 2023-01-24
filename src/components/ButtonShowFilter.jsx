import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';

export default function ButtonShowFilter(props) {
  const { removeUniqueFilter } = props;
  const { filters } = useContext(PlanetsContext);

  const keys = Object.keys(filters);
  keys.shift();
  keys.reverse();

  const values = Object.keys(filters).map((key) => filters[key].active);
  values.shift();
  values.reverse();

  const keysAndValues = [];

  for (let index = 0; index <= keys.length; index += 1) {
    if (values[index] === true) {
      keysAndValues.push({ [keys[index]]: values[index] });
    }
  }

  console.log(keysAndValues);

  return (
    <div>
      {
        keysAndValues.map((item, index) => (
          <div key={ index } data-testid="filter">
            <button
              type="button"
              name={ Object.keys(item) }
              onClick={ removeUniqueFilter }
            >
              { Object.keys(item) }
            </button>
          </div>))
      }
    </div>

  );
}

ButtonShowFilter.propTypes = {
  column: PropTypes.string,
  removeUniqueFilter: PropTypes.func,
}.isRequired;
