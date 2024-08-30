import { Customer } from "infra/typeorm/entities/Customer";
import { Type } from "infra/typeorm/entities/Type";
import { inject, injectable } from "tsyringe";
import { ITypeRepository } from "./ITypeRepository";

@injectable()
class ListTypeUseCase {

    constructor(
        @inject("TypeRepository")
        private typeRepository: ITypeRepository
    ) { }

    async execute(): Promise<Type[]> {

        const types = await this.typeRepository.list();

        return types;
    }
}

export { ListTypeUseCase };