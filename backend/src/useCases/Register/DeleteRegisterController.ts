import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteRegisterUseCase } from "./DeleteRegisterUseCase";

class DeleteRegisterController {

    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.params.id;

        const deleteRegisterUseCase = container.resolve(DeleteRegisterUseCase);

        await deleteRegisterUseCase.execute(id);

        return response.status(200).json();

    }
}

export { DeleteRegisterController };