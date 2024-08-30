import { Register } from "infra/typeorm/entities/Register";
import { Service } from "infra/typeorm/entities/Service";
import { inject, injectable } from "tsyringe";
import { IRegisterRepository } from "./IRegisterRepository";

@injectable()
class FindRegisterByIdUseCase {

    constructor(
        @inject("RegisterRepository")
        private registersRepository: IRegisterRepository
    ) { }

    async execute(id: string): Promise<Register> {

        const register = await this.registersRepository.find(id);

        return register;
    }
}

export { FindRegisterByIdUseCase };