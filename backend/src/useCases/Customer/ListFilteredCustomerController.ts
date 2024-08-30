import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListFilteredCustomerUseCase } from "./ListFilteredCustomerUseCase";

class ListFilteredCustomerController {

    async handle(request: Request, response: Response): Promise<Response> {

        const customerName = request.params.name;

        const listFilteredCustomerUseCase = container.resolve(ListFilteredCustomerUseCase);

        const customers = await listFilteredCustomerUseCase.execute(customerName);

        return response.status(200).json(customers);

    }
}

export { ListFilteredCustomerController };