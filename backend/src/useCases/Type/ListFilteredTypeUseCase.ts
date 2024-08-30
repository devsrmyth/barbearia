import { Type } from "infra/typeorm/entities/Type";
import { inject, injectable } from "tsyringe";
import { ITypeRepository } from "./ITypeRepository";

@injectable()
class ListFilteredTypeUseCase {

    constructor(
        @inject("TypeRepository")
        private typesRepository: ITypeRepository
    ) { }

    async execute(name: string): Promise<Type[]> {

        const types = await this.typesRepository.listByTypeName(name);

        return types;
    }
}

export { ListFilteredTypeUseCase };