import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateServiceUseCase } from "./CreateServiceUseCase";

class CreateServiceController {

    async handle(request: Request, response: Response): Promise<Response> {

        const data = request.body;

        const createServiceUseCase = container.resolve(CreateServiceUseCase);

        const Service = await createServiceUseCase.execute(data);

        return response.status(201).json(Service);

    }
}

export { CreateServiceController };