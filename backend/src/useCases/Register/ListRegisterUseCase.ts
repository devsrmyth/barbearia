import { Register } from "infra/typeorm/entities/Register";
import { Service } from "infra/typeorm/entities/Service";
import { inject, injectable } from "tsyringe";
import { IRegisterRepository } from "./IRegisterRepository";

@injectable()
class ListRegisterUseCase {

    constructor(
        @inject("RegisterRepository")
        private registersRepository: IRegisterRepository
    ) { }

    async execute(): Promise<Register[]> {

        const registers = await this.registersRepository.list();

        return registers;
    }
}

export { ListRegisterUseCase };