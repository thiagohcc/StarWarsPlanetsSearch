import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import planetsMock from './mock/planetsMock';
import { act } from 'react-dom/test-utils';

describe('Test the App', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsMock)
    })
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Checks if the elements are on the screen', async () => {
    await act(() => render(<App />));
  
    const inputQuery = screen.getByRole('textbox');
    const columns = screen.getByTestId('column-filter');
    const operators = screen.getByTestId('comparison-filter');
    const values = screen.getByRole('spinbutton');
    const filterBtn = screen.getByRole('button', { name: /filtra/i});
    const clearFiltersBtn = screen.getByRole('button', { name: /limpar filtros/i});
    const table = screen.getByRole('table');
    const rowsTable = screen.getAllByRole('row');
  
    expect(inputQuery).toBeInTheDocument();
    expect(columns).toBeInTheDocument();
    expect(operators).toBeInTheDocument();
    expect(values).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
    expect(clearFiltersBtn).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  
    expect(rowsTable.length).toEqual(11);
  
    userEvent.type(inputQuery, 'Tatooine');
    expect(inputQuery).toHaveValue('Tatooine');
    expect(screen.getByRole('cell', { name: /tatooine/i }))
  
  
  
  });

})

