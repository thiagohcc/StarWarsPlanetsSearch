import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';

export default function QueryInput(props) {
  const { handleChange, handleTextFilter } = props;
  const { searching } = useContext(PlanetsContext);
  return (
    <input
      type="text"
      name="query"
      data-testid="name-filter"
      onChange={ handleChange }
      onKeyDown={ handleTextFilter }
      value={ searching.query }
    />
  );
}

QueryInput.propTypes = {
  handleChange: PropTypes.func,
  handleTextFilter: PropTypes.func,
}.isRequired;
