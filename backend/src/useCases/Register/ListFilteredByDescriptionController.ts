import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListFilteredByDescriptionUseCase } from "./ListFilteredByDescriptionUseCase";

class ListFilteredByDescriptionController {

    async handle(request: Request, response: Response): Promise<Response> {

        const descriptionRegister = request.params.description;

        const listFilteredByDescriptionUseCase = container.resolve(ListFilteredByDescriptionUseCase);

        const registers = await listFilteredByDescriptionUseCase.execute(descriptionRegister);

        return response.status(200).json(registers);

    }
}

export { ListFilteredByDescriptionController };