import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateServiceUseCase } from "./UpdateServiceUseCase";

class UpdateServiceController {

    async handle(request: Request, response: Response): Promise<Response> {

        const data = request.body;

        console.log(data)

        const updateServiceUseCase = container.resolve(UpdateServiceUseCase);

        await updateServiceUseCase.execute(data.id, data);

        return response.status(200).json();

    }
}

export { UpdateServiceController };