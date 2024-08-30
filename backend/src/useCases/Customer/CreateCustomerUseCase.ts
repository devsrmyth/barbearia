import { inject, injectable } from "tsyringe";

import { ICustomerRepository } from "./ICustomerRepository";
import { Customer } from "infra/typeorm/entities/Customer";
import { AppError } from "errors/AppError";
import { ICustomerDTO } from "useCases/dtos/ICustomerDTO";

@injectable()
class CreateCustomerUseCase {

    constructor(
        @inject("CustomerRepository")
        private customersRepository: ICustomerRepository
    ) { }

    async execute(data: ICustomerDTO): Promise<Customer> {

        if (!data.name)
            throw new AppError("Costumer needs a name!", 400);

        const costumerAlreadyExists = await this.customersRepository.findCustomerByName(data.name);

        if (costumerAlreadyExists)
            throw new AppError("Costumer already exists!", 400);

        const costumer = await this.customersRepository.create(data);

        return costumer;
    }
}

export { CreateCustomerUseCase };