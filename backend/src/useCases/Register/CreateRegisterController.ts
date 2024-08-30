import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateRegisterUseCase } from "./CreateRegisterUseCase";

class CreateRegisterController {

    async handle(request: Request, response: Response): Promise<Response> {

        const data = request.body;

        const createRegisterUseCase = container.resolve(CreateRegisterUseCase);

        const Service = await createRegisterUseCase.execute(data);

        return response.status(201).json(Service);

    }
}

export { CreateRegisterController };