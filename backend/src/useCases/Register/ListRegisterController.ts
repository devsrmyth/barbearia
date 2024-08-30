import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListRegisterUseCase } from "./ListRegisterUseCase";

class ListRegisterController {

    async handle(request: Request, response: Response): Promise<Response> {

        const listRegisterUseCase = container.resolve(ListRegisterUseCase);

        const registers = await listRegisterUseCase.execute();

        return response.status(200).json(registers);

    }
}

export { ListRegisterController };