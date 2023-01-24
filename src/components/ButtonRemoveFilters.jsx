import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonRemoveFilters(props) {
  const { removeAllFilters } = props;
  return (
    <button
      type="button"
      data-testid="button-remove-filters"
      onClick={ removeAllFilters }
    >
      Limpar filtros
    </button>
  );
}

ButtonRemoveFilters.propTypes = {
  removeAllFilters: PropTypes.func,
}.isRequired;
