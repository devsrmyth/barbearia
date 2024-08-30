import { AppError } from "errors/AppError";
import { inject, injectable } from "tsyringe";
import { IRegisterDTO } from "useCases/dtos/IRegisterDTO";
import { IRegisterRepository } from "./IRegisterRepository";

@injectable()
class UpdateRegisterUseCase {

    constructor(
        @inject("RegisterRepository")
        private registersRepository: IRegisterRepository
    ) { }

    async execute(id: string, data: IRegisterDTO): Promise<void> {

        if (!id)
            throw new AppError("Id is needed!", 400);

            console.log('dentro ' + JSON.stringify(data))


        await this.registersRepository.update(id, data);

    }
}

export { UpdateRegisterUseCase };