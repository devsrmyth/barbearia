import { inject, injectable } from "tsyringe";
import { AppError } from "errors/AppError";
import { Register } from "infra/typeorm/entities/Register";
import { IRegisterRepository } from "./IRegisterRepository";
import { IRegisterDTO } from "useCases/dtos/IRegisterDTO";

@injectable()
class CreateRegisterUseCase {

    constructor(
        @inject("RegisterRepository")
        private registersRepository: IRegisterRepository
    ) { }

    async execute(data: IRegisterDTO): Promise<Register> {

        if (!data)
            throw new AppError("Register needs information!", 400);



        const register = await this.registersRepository.create(data);

        return register;
    }
}

export { CreateRegisterUseCase };