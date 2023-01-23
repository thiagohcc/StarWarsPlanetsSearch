import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonFilter(props) {
  const { handleValuesFilter } = props;
  return (
    <div>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleValuesFilter }
      >
        FILTRAR
      </button>
    </div>
  );
}

ButtonFilter.propTypes = {
  handleValuesFilter: PropTypes.func,
}.isRequired;
