import { Service } from "infra/typeorm/entities/Service";
import { inject, injectable } from "tsyringe";
import { IServiceRepository } from "./IServiceRepository";

@injectable()
class ListFilteredByNameDateUseCase {

    constructor(
        @inject("ServiceRepository")
        private servicesRepository: IServiceRepository
    ) { }

    async execute(customerName: string, dataInicio: string, dataFim: string): Promise<Service[]> {

        let services = null;

        services = await this.servicesRepository.listByCustomerNameAndDate(customerName, dataInicio, dataFim);

        return services;
    }
}

export { ListFilteredByNameDateUseCase };