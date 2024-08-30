import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateTypeUseCase } from "./CreateTypeUseCase";

class CreateTypeController {

    async handle(request: Request, response: Response): Promise<Response> {

        const data = request.body;

        const createTypeUseCase = container.resolve(CreateTypeUseCase);

        const type = await createTypeUseCase.execute(data);

        return response.status(201).json(type);

    }
}

export { CreateTypeController };