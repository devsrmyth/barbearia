import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteCustomerUseCase } from "./DeleteCustomerUseCase";

class DeleteCostumerController {

    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.params.id;

        const deleteCustomerUseCase = container.resolve(DeleteCustomerUseCase);

        await deleteCustomerUseCase.execute(id);

        return response.status(200).json();

    }
}

export { DeleteCostumerController };