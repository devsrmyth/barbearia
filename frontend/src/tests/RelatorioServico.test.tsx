import { render, screen, waitFor } from '@testing-library/react';
import { RelatorioServico } from '../RelatorioServico';
import { vi } from 'vitest';
import dayjs from 'dayjs';

describe('RelatorioServico Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays "Nenhum serviço encontrado." when no services are returned', async () => {
        global.fetch = vi.fn().mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: async () => [],
            })
        );

        render(<RelatorioServico />);

        await waitFor(() => {
            expect(screen.getByText('Nenhum serviço encontrado.')).toBeInTheDocument();
        });
    });

    it('fetches the conversion rate and calculates the total in USD correctly', async () => {
        // Mock the fetch for conversion rate and services
        global.fetch = vi
            .fn()
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: async () => ({ rates: { BRL: 5 } }), // 1 USD = 5 BRL
                })
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: async () => [
                        {
                            id: '1',
                            customer: { name: 'John Doe' },
                            value: 500,
                            type: ['Type1'],
                            payment: ['Credit Card'],
                            date: new Date().toISOString(),
                        },
                    ],
                })
            );

        render(<RelatorioServico />);

        await waitFor(() => {
            expect(screen.getByText('em dólar: $100.00')).toBeInTheDocument(); // 500 BRL / 5 = 100 USD
        });
    });
});
