import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { EditarService } from '../EditarService';
import { vi } from 'vitest';
import fs from 'fs';

describe('EditarService Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn((url, options) => {
      if (url.endsWith('/type')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve([{ id: '1', title: 'Type 1', description: 'Description 1' }]),
        } as Response);
      }

      if (url.endsWith('/customer')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve([
            { id: '1', name: 'Customer 1', phone: '1234567890', birth: new Date() },
            { id: '2', name: 'Customer 2', phone: '0987654321', birth: new Date() },
          ]),
        } as Response);
      }

      if (url.endsWith('/service') && options?.method === 'PUT') {
        // Mock response for the Gravar button fetch call
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ success: true }),
        } as Response);
      }

      return Promise.reject(new Error('Unknown URL in fetch mock'));
    });
  });

  it('renders types and customers correctly', async () => {
    render(<EditarService />);

    await waitFor(() => {
      // Checando se os Tipos estão na tela
      expect(screen.getByText('Type 1')).toBeInTheDocument();

      // Checando se Clientes estão na tela
      expect(screen.getByText('Customer 1')).toBeInTheDocument();
      expect(screen.getByText('Customer 2')).toBeInTheDocument();
    });
  });

});
