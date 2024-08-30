import { Service } from "infra/typeorm/entities/Service";
import { inject, injectable } from "tsyringe";
import { IServiceRepository } from "./IServiceRepository";

@injectable()
class FindServiceByIdUseCase {

    constructor(
        @inject("ServiceRepository")
        private servicesRepository: IServiceRepository
    ) { }

    async execute(id: string): Promise<Service> {

        const service = await this.servicesRepository.find(id);

        return service;
    }
}

export { FindServiceByIdUseCase };