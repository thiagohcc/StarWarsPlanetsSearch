import { useState } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState([]);

  const makeFetch = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const planetsList = data.results;
      if (!data.results) {
        const errorResult = new Error('Fatal error!');
        throw errorResult;
      }
      planetsList.forEach((item) => delete item.residents);
      const getHeaders = Object.keys(planetsList[0]);
      setHeaders(getHeaders);
      return planetsList;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  return { makeFetch, loading, error, headers };
};

export default useFetch;
