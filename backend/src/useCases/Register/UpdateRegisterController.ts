import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateRegisterUseCase } from "./UpdateRegisterUseCase";

class UpdateRegisterController {

    async handle(request: Request, response: Response): Promise<Response> {

        const data = request.body;

        const updateServiceUseCase = container.resolve(UpdateRegisterUseCase);

        await updateServiceUseCase.execute(data.id, data);

        return response.status(200).json();

    }
}

export { UpdateRegisterController };