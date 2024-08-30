import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteTypeUseCase } from "./DeleteTypeUseCase";

class DeletePatientController {

    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.params.id;

        const deleteTypeUseCase = container.resolve(DeleteTypeUseCase);

        await deleteTypeUseCase.execute(id);

        return response.status(201).json();

    }
}

export { DeletePatientController };