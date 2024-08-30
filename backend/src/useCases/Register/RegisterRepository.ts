import { Register } from "infra/typeorm/entities/Register";
import { Between, getRepository, ILike, Repository } from "typeorm";
import { IRegisterDTO } from "useCases/dtos/IRegisterDTO";
import { IRegisterRepository } from "./IRegisterRepository";

class RegisterRepository implements IRegisterRepository {

    private repository: Repository<Register>;

    constructor() {
        this.repository = getRepository(Register);
    }

    async update(id: string, data: IRegisterDTO): Promise<void> {
        let patient = await this.repository.findOne({ id });

        Object.assign(patient, {
            ...data
        });

        await this.repository.save(patient);
    }

    async listByDescription(description: string): Promise<Register[]> {
        return this.repository.find({
            description: ILike(`%${description}%`)
        })
    }

    async create(data: IRegisterDTO): Promise<Register> {
        const full_register = new Register();

        Object.assign(full_register, {
            ...data
        });

        const register = this.repository.create(full_register);

        await this.repository.save(register);

        return register;
    }

    async find(id: string): Promise<Register> {
        return this.repository.findOne({ id });
    }

    async list(): Promise<Register[]> {
        const registers = await this.repository.find({
            order: {
                id: "DESC"
            }
        });

        return registers;
    }

    async listByDate(dataInicio: string, dataFim: string): Promise<Register[]> {
        const registers = await this.repository.find({
            where: {
                date: Between(
                    dataInicio,
                    dataFim
                ),
            }
        });

        return registers;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id });
    }

}

export { RegisterRepository };