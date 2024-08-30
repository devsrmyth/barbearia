import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CadastroRegistro } from '../CadastroRegistro';
import { vi } from 'vitest';

const mockFetch = vi.fn();

global.fetch = mockFetch;

describe('CadastroRegistro Component', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    it('renders the form correctly', async () => {
        render(<CadastroRegistro />);
        await waitFor(() => {
            expect(screen.getByText('Cadastro de Registro')).toBeInTheDocument();
            expect(screen.getByText('Entrada')).toBeInTheDocument();
            expect(screen.getByText('Saída')).toBeInTheDocument();
            expect(screen.getByText('Descrição do Registro')).toBeInTheDocument();
            expect(screen.getByText('Valor do Registro (R$)')).toBeInTheDocument();
        });
    });

});
