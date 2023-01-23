import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';

export default function ColumnDropDown(props) {
  const { handleChange } = props;
  const { columnsFilterOptions } = useContext(PlanetsContext);

  return (
    <div>
      <div>Coluna:</div>
      <select
        name="columnFilter"
        data-testid="column-filter"
        onChange={ handleChange }
      >
        {
          columnsFilterOptions
            .filter((option) => option.active === true)
            .map((option) => (
              <option
                key={ option.name }
                name={ option.name }
                value={ option.name }
              >
                { option.name }
              </option>
            ))
        }
      </select>
    </div>
  );
}

ColumnDropDown.propTypes = {
  handleChange: PropTypes.func,
  handleTextFilter: PropTypes.func,
  columnsFilterOptions: PropTypes.array,
}.isRequired;
