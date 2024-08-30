import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListFilteredByNameDateUseCase } from "./ListFilteredByNameDateUseCase";

class ListFilteredByNameDateController {

    async handle(request: Request, response: Response): Promise<Response> {

        const customerName = String(request.query.name);
        const dataInicio = request.params.dataInicio;
        const dataFim = request.params.dataFim;

        const listFilteredByNameDateUseCase = container.resolve(ListFilteredByNameDateUseCase);

        const services = await listFilteredByNameDateUseCase.execute(customerName, dataInicio, dataFim);

        return response.status(200).json(services);

    }
}

export { ListFilteredByNameDateController };