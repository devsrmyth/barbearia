import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListServiceUseCase } from "./ListServiceUseCase";

class ListServiceController {

    async handle(request: Request, response: Response): Promise<Response> {

        const listServiceUseCase = container.resolve(ListServiceUseCase);

        const services = await listServiceUseCase.execute();

        return response.status(200).json(services);

    }
}

export { ListServiceController };