import { AppError } from "errors/AppError";
import { inject, injectable } from "tsyringe";
import { IServiceDTO } from "useCases/dtos/IServiceDTO";
import { ITypeDTO } from "useCases/dtos/ITypeDTO";
import { ITypeRepository } from "useCases/Type/ITypeRepository";
import { IServiceRepository } from "./IServiceRepository";

@injectable()
class UpdateServiceUseCase {

    constructor(
        @inject("ServiceRepository")
        private servicesRepository: IServiceRepository,
        @inject("TypeRepository")
        private typesRepository: ITypeRepository
    ) { }

    async execute(id: string, data: IServiceDTO): Promise<void> {

        if (!data.customer)
            throw new AppError("Service needs a Customer!", 400);

        if (!id)
            throw new AppError("Id is needed!", 400);

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

        await this.servicesRepository.updateService(id, new_service);

    }
}

export { UpdateServiceUseCase };