import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindServiceByIdUseCase } from "./FindServiceByIdUseCase";

class FindServiceByIdController {

    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.params.id;

        const findServiceByIdUseCase = container.resolve(FindServiceByIdUseCase);

        const service = await findServiceByIdUseCase.execute(id);


        return response.status(200).json(service);

    }
}

export { FindServiceByIdController };