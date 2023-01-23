import React from 'react';
import PropTypes from 'prop-types';

const OPERATOR_OPTIONS = ['maior que', 'menor que', 'igual a'];

export default function OperatorDropDown(props) {
  const { handleChange } = props;
  return (
    <div>
      <div>Operador:</div>
      <select
        name="comparisonFilter"
        data-testid="comparison-filter"
        onChange={ handleChange }
      >
        {
          OPERATOR_OPTIONS.map((operator, index) => (
            <option
              key={ index }
              name={ operator }
              value={ operator }
            >
              { operator }
            </option>
          ))
        }
      </select>
    </div>
  );
}

OperatorDropDown.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;
