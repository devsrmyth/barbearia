import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindTypeUseCase } from "./FindTypeUseCase";

class FindTypeController {

    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.params.id;

        const findCustomerUseCase = container.resolve(FindTypeUseCase);

        const customer = await findCustomerUseCase.execute(id);

        return response.status(200).json(customer);

    }
}

export { FindTypeController };