import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

class CreateCustomerController {

    async handle(request: Request, response: Response): Promise<Response> {

        const data = request.body;

        const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

        const customer = await createCustomerUseCase.execute(data);

        return response.status(201).json(customer);

    }
}

export { CreateCustomerController };