import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";

class UpdateCustomerController {

    async handle(request: Request, response: Response): Promise<Response> {

        const data = request.body;

        const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase);

        await updateCustomerUseCase.execute(data.id, data);

        return response.status(200).json();

    }
}

export { UpdateCustomerController };