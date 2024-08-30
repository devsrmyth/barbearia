import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListCustomerUseCase } from "./ListCustomerUseCase";

class ListCustomerController {

    async handle(request: Request, response: Response): Promise<Response> {

        const listCustomerUseCase = container.resolve(ListCustomerUseCase);

        const customers = await listCustomerUseCase.execute();

        return response.status(200).json(customers);

    }
}

export { ListCustomerController };