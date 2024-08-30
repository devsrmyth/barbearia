import { Service } from "infra/typeorm/entities/Service";
import { inject, injectable } from "tsyringe";
import { IServiceRepository } from "./IServiceRepository";

@injectable()
class ListServiceUseCase {

    constructor(
        @inject("ServiceRepository")
        private servicesRepository: IServiceRepository
    ) { }

    async execute(): Promise<Service[]> {

        const services = await this.servicesRepository.list();

        return services;
    }
}

export { ListServiceUseCase };