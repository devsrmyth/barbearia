import { inject, injectable } from "tsyringe";
import { ITypeRepository } from "./ITypeRepository";

@injectable()
class DeleteTypeUseCase {

    constructor(
        @inject("TypeRepository")
        private typeRepository: ITypeRepository
    ) { }

    async execute(id: string): Promise<void> {

        await this.typeRepository.delete(id);

    }
}

export { DeleteTypeUseCase };