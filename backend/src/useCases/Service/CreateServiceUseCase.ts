import { inject, injectable } from "tsyringe";
import { IServiceRepository } from "./IServiceRepository";
import { Service } from "infra/typeorm/entities/Service";
import { IServiceDTO } from "useCases/dtos/IServiceDTO";
import { AppError } from "errors/AppError";
import { ITypeRepository } from "useCases/Type/ITypeRepository";
import { ITypeDTO } from "useCases/dtos/ITypeDTO";

@injectable()
class CreateServiceUseCase {

    constructor(
        @inject("ServiceRepository")
        private servicesRepository: IServiceRepository,
        @inject("TypeRepository")
        private typesRepository: ITypeRepository
    ) { }

    async execute(data: IServiceDTO): Promise<Service> {

        if (!data.customer)
            throw new AppError("Service needs a Customer!", 400);

        const types = await this.typesRepository.list();
        const checked_types = [];
        types.forEach((t: ITypeDTO, i) => {
            if (data.type[i])
                checked_types.push(t.title)
        });

        const payments_string = [];
        const pay_string = ["Cartão de Crédito", "Cartão de Débito", "Dinheiro", "Pix"];
        pay_string.forEach((p, j) => {
            if (data.payment[j])
                payments_string.push(p);
        });

        const new_service = Object.assign(data, {
            ...data,
            payment: payments_string,
            type: checked_types
        });

        const service = await this.servicesRepository.create(new_service);

        return service;
    }
}

export { CreateServiceUseCase };