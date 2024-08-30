import { Service } from "infra/typeorm/entities/Service";
import { inject, injectable } from "tsyringe";
import { IServiceRepository } from "./IServiceRepository";

@injectable()
class ListFilteredByCustomerUseCase {

    constructor(
        @inject("ServiceRepository")
        private servicesRepository: IServiceRepository
    ) { }

    async execute(customerName: string): Promise<Service[]> {

        let services = null;

        services = await this.servicesRepository.listByCustomerName(customerName);

        return services;
    }
}

export { ListFilteredByCustomerUseCase };