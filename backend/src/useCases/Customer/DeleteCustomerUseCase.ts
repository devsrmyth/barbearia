import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "./ICustomerRepository";

@injectable()
class DeleteCustomerUseCase {

    constructor(
        @inject("CustomerRepository")
        private customersRepository: ICustomerRepository
    ) { }

    async execute(id: string): Promise<void> {

        await this.customersRepository.delete(id);

    }
}

export { DeleteCustomerUseCase };