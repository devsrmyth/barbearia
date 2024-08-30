import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindRegisterByIdUseCase } from "./FindRegisterByIdUseCase";

class FindRegisterByIdController {

    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.params.id;

        const findRegisterByIdUseCase = container.resolve(FindRegisterByIdUseCase);

        const register = await findRegisterByIdUseCase.execute(id);

        return response.status(200).json(register);

    }
}

export { FindRegisterByIdController };