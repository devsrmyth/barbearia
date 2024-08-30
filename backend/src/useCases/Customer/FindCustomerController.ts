import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindCustomerUseCase } from "./FindCustomerUseCase";

class FindCustomerController {

    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.params.id;

        const findCustomerUseCase = container.resolve(FindCustomerUseCase);

        const customer = await findCustomerUseCase.execute(id);

        return response.status(200).json(customer);

    }
}

export { FindCustomerController };