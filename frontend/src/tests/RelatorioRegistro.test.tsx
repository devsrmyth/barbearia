import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RelatorioRegistro } from '../RelatorioRegistro';
import { vi } from 'vitest';

const mockFetch = vi.fn();

global.fetch = mockFetch;

describe('RelatorioRegistro Component', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    it('renders the component correctly', () => {
        render(<RelatorioRegistro />);

        expect(screen.getByText('Busca por intervalo de Data')).toBeInTheDocument();
        expect(screen.getByLabelText('Data de início')).toBeInTheDocument();
        expect(screen.getByLabelText('Data de fim')).toBeInTheDocument();
        expect(screen.getByRole('table', { name: 'Relatório de registros financeiros' })).toBeInTheDocument();
    });

    it('displays data correctly when API call is successful', async () => {
        const mockData = [
            {
                id: '1',
                isIncoming: true,
                description: 'Pagamento recebido',
                value: 500,
                date: new Date(),
            },
            {
                id: '2',
                isIncoming: false,
                description: 'Compra de materiais',
                value: 300,
                date: new Date(),
            },
        ];

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        render(<RelatorioRegistro />);

        await waitFor(() => {
            expect(screen.getByText('Pagamento recebido')).toBeInTheDocument();
            expect(screen.getByText('Compra de materiais')).toBeInTheDocument();
            expect(screen.getByText('R$ 500,00')).toBeInTheDocument();
            expect(screen.getByText('R$ 300,00')).toBeInTheDocument();
        });
    });

    it('displays an error message when API call fails', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Erro ao buscar registros'));

        render(<RelatorioRegistro />);

        await waitFor(() => {
            expect(screen.getByText('Ocorreu um erro ao buscar os registros.')).toBeInTheDocument();
        });
    });

    it('updates the state when the date inputs are changed', async () => {
        render(<RelatorioRegistro />);

        const dataInicioInput = screen.getByLabelText('Data de início') as HTMLInputElement;
        const dataFimInput = screen.getByLabelText('Data de fim') as HTMLInputElement;

        fireEvent.change(dataInicioInput, { target: { value: '2023-08-01' } });
        fireEvent.change(dataFimInput, { target: { value: '2023-08-10' } });

        expect(dataInicioInput.value).toBe('2023-08-01');
        expect(dataFimInput.value).toBe('2023-08-10');
    });

    it('displays no records message when no data is returned', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        render(<RelatorioRegistro />);

        await waitFor(() => {
            expect(screen.getByText('Nenhum registro encontrado.')).toBeInTheDocument();
        });
    });
});
