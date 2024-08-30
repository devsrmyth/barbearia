import { Register } from "infra/typeorm/entities/Register";
import { inject, injectable } from "tsyringe";
import { IRegisterRepository } from "./IRegisterRepository";

@injectable()
class ListFilteredByDateUseCase {

    constructor(
        @inject("RegisterRepository")
        private registersRepository: IRegisterRepository
    ) { }

    async execute(dataInicio: string, dataFim: string): Promise<Register[]> {

        const registers = await this.registersRepository.listByDate(dataInicio, dataFim);

        console.log(registers)

        return registers;
    }
}

export { ListFilteredByDateUseCase };