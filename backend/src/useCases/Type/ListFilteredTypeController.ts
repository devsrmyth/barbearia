import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListFilteredTypeUseCase } from "./ListFilteredTypeUseCase";

class ListFilteredTypeController {

    async handle(request: Request, response: Response): Promise<Response> {

        const customerName = request.params.name;

        const listFilteredCustomerUseCase = container.resolve(ListFilteredTypeUseCase);

        const customers = await listFilteredCustomerUseCase.execute(customerName);

        return response.status(200).json(customers);

    }
}

export { ListFilteredTypeController };