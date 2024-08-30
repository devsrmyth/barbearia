import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListTypeUseCase } from "./ListTypeUseCase";

class ListTypeController {

    async handle(request: Request, response: Response): Promise<Response> {


        const listTypeUseCase = container.resolve(ListTypeUseCase);

        const types = await listTypeUseCase.execute();

        return response.status(201).json(types);

    }
}

export { ListTypeController };