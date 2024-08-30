import { inject, injectable } from "tsyringe";
import { IRegisterRepository } from "./IRegisterRepository";

@injectable()
class DeleteRegisterUseCase {

    constructor(
        @inject("RegisterRepository")
        private registersRepository: IRegisterRepository
    ) { }

    async execute(id: string): Promise<void> {

        await this.registersRepository.delete(id);

    }
}

export { DeleteRegisterUseCase };