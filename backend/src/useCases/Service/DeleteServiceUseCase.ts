import { inject, injectable } from "tsyringe";
import { IServiceRepository } from "./IServiceRepository";

@injectable()
class DeleteServiceUseCase {

    constructor(
        @inject("ServiceRepository")
        private servicesRepository: IServiceRepository
    ) { }

    async execute(id: string): Promise<void> {

        await this.servicesRepository.delete(id);

    }
}

export { DeleteServiceUseCase };