import { Type } from "infra/typeorm/entities/Type";
import { inject, injectable } from "tsyringe";
import { ITypeRepository } from "./ITypeRepository";

@injectable()
class FindTypeUseCase {

    constructor(
        @inject("TypeRepository")
        private typessRepository: ITypeRepository
    ) { }

    async execute(id: string): Promise<Type> {

        const types = await this.typessRepository.find(id);

        return types;
    }
}

export { FindTypeUseCase };