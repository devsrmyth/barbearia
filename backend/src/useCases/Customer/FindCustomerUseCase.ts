import { Customer } from "infra/typeorm/entities/Customer";
import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "./ICustomerRepository";

@injectable()
class FindCustomerUseCase {

    constructor(
        @inject("CustomerRepository")
        private customersRepository: ICustomerRepository
    ) { }

    async execute(id: string): Promise<Customer> {

        const customer = await this.customersRepository.find(id);

        return customer;
    }
}

export { FindCustomerUseCase };