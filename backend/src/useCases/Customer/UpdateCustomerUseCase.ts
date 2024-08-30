import { inject, injectable } from "tsyringe";
import { ICustomerDTO } from "useCases/dtos/ICustomerDTO";
import { ICustomerRepository } from "./ICustomerRepository";

@injectable()
class UpdateCustomerUseCase {

    constructor(
        @inject("CustomerRepository")
        private customersRepository: ICustomerRepository
    ) { }

    async execute(id: string, data: ICustomerDTO): Promise<void> {

        await this.customersRepository.updateCustomer(id, data);

    }
}

export { UpdateCustomerUseCase };