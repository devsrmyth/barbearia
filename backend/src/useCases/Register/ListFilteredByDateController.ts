import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListFilteredByDateUseCase } from "./ListFilteredByDateUseCase";

class ListFilteredByDateController {

    async handle(request: Request, response: Response): Promise<Response> {

        const dataInicio = request.params.dataInicio;
        const dataFim = request.params.dataFim;

        const listFilteredByDateUseCase = container.resolve(ListFilteredByDateUseCase);

        const registers = await listFilteredByDateUseCase.execute(dataInicio, dataFim);

        return response.status(200).json(registers);

    }
}

export { ListFilteredByDateController };