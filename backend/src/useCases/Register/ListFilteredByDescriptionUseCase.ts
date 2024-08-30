import { Register } from "infra/typeorm/entities/Register";
import { inject, injectable } from "tsyringe";
import { IRegisterRepository } from "./IRegisterRepository";

@injectable()
class ListFilteredByDescriptionUseCase {

    constructor(
        @inject("RegisterRepository")
        private registersRepository: IRegisterRepository
    ) { }

    async execute(description: string): Promise<Register[]> {

        const registers = await this.registersRepository.listByDescription(description);

        console.log(registers)

        return registers;
    }
}

export { ListFilteredByDescriptionUseCase };