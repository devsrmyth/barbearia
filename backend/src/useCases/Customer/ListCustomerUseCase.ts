import { Customer } from "infra/typeorm/entities/Customer";
import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "./ICustomerRepository";

@injectable()
class ListCustomerUseCase {

    constructor(
        @inject("CustomerRepository")
        private customersRepository: ICustomerRepository
    ) { }

    async execute(): Promise<Customer[]> {

        const customers = await this.customersRepository.list();

        return customers;
    }
}

export { ListCustomerUseCase };