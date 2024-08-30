import { Customer } from "infra/typeorm/entities/Customer";
import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "./ICustomerRepository";

@injectable()
class ListFilteredCustomerUseCase {

    constructor(
        @inject("CustomerRepository")
        private customerssRepository: ICustomerRepository
    ) { }

    async execute(name: string): Promise<Customer[]> {

        const customers = await this.customerssRepository.listByCustomerName(name);

        return customers;
    }
}

export { ListFilteredCustomerUseCase };