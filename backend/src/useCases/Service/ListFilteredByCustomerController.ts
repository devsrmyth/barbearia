import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListFilteredByCustomerUseCase } from "./ListFilteredByCustomerUseCase";

class ListFilteredByCustomerController {

    async handle(request: Request, response: Response): Promise<Response> {

        const customerName = request.params.name;

        const listFilteredByCustomerUseCase = container.resolve(ListFilteredByCustomerUseCase);

        const services = await listFilteredByCustomerUseCase.execute(customerName);

        return response.status(200).json(services);

    }
}

export { ListFilteredByCustomerController };