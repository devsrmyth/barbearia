import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ListagemRegistro } from '../ListagemRegistro';
import { vi } from 'vitest';

describe('ListagemRegistro Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn((url, options) => {
      if (url.includes('/register/')) {
        if (url.includes('/delete/')) {
          return Promise.resolve({ ok: true, status: 200 } as Response);
        }
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve([
            { id: '1', isIncoming: true, description: 'Salary Desc', value: 5000, date: new Date('2023-08-01') },
            { id: '2', isIncoming: false, description: 'Rent Desc', value: 1500, date: new Date('2023-08-05') }
          ]),
        } as Response);
      }
      return Promise.reject(new Error('Unknown URL in fetch mock'));
    });
  });

  it('renders registers correctly', async () => {
    render(<ListagemRegistro />);
    await waitFor(() => {
      expect(screen.getByText('Salary Desc')).toBeInTheDocument();
      expect(screen.getByText('Rent Desc')).toBeInTheDocument();
    });
  });

});
