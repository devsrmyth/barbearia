import { inject, injectable } from "tsyringe";
import { ITypeRepository } from "./ITypeRepository";
import { Type } from "infra/typeorm/entities/Type";
import { ITypeDTO } from "useCases/dtos/ITypeDTO";
import { AppError } from "errors/AppError";

@injectable()
class CreateTypeUseCase {

    constructor(
        @inject("TypeRepository")
        private typeRepository: ITypeRepository
    ) { }

    async execute(data: ITypeDTO): Promise<Type> {

        if (!data.title)
            throw new AppError("Type needs a title!", 400);

        const type = await this.typeRepository.create(data);

        return type;
    }
}

export { CreateTypeUseCase };