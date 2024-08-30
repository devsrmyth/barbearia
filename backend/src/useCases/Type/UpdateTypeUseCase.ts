import { inject, injectable } from "tsyringe";
import { ITypeDTO } from "useCases/dtos/ITypeDTO";
import { ITypeRepository } from "./ITypeRepository";

@injectable()
class UpdateTypeUseCase {

    constructor(
        @inject("TypeRepository")
        private typeRepository: ITypeRepository
    ) { }

    async execute(id: string, data: ITypeDTO): Promise<void> {

        await this.typeRepository.updateType(id, data);

    }
}

export { UpdateTypeUseCase };