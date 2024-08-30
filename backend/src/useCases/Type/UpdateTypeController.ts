import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateTypeUseCase } from "./UpdateTypeUseCase";

class UpdateTypeController {

    async handle(request: Request, response: Response): Promise<Response> {

        const data = request.body;

        const updateTypeUseCase = container.resolve(UpdateTypeUseCase);

        await updateTypeUseCase.execute(data.id, data);

        return response.status(200).json();

    }
}

export { UpdateTypeController };