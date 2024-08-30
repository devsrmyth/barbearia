import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteServiceUseCase } from "./DeleteServiceUseCase";

class DeleteServiceController {

    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.params.id;

        const deleteCustomerUseCase = container.resolve(DeleteServiceUseCase);

        await deleteCustomerUseCase.execute(id);

        return response.status(200).json();

    }
}

export { DeleteServiceController };