import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';

export default function NumberInput(props) {
  const { handleChange } = props;
  const { searching } = useContext(PlanetsContext);
  return (
    <div>
      <input
        type="number"
        name="valueFilter"
        data-testid="value-filter"
        onChange={ handleChange }
        value={ searching.valueFilter }
      />
    </div>
  );
}

NumberInput.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;
