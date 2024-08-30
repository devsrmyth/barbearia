
import { getRepository, ILike, Repository } from "typeorm";
import { ITypeDTO } from "useCases/dtos/ITypeDTO";
import { Type } from "infra/typeorm/entities/Type";
import { ITypeRepository } from "./ITypeRepository";

class TypeRepository implements ITypeRepository {

    private repository: Repository<Type>;

    constructor() {
        this.repository = getRepository(Type);
    }
    
    async findTypeByName(title: string): Promise<Type> {
        return this.repository.findOne({ title });
    }

    async listByTypeName(title: string): Promise<Type[]> {
        return this.repository.find({
            title: ILike(`%${title}%`)
        })
    }

    async updateType(id: string, data: Type): Promise<void> {
        let patient = await this.repository.findOne({ id });

        Object.assign(patient, {
            ...data
        });

        await this.repository.save(patient);
    }

    async create(data: ITypeDTO): Promise<Type> {
        const full_Type = new Type();

        Object.assign(full_Type, {
            ...data
        });

        const type = this.repository.create(full_Type);

        await this.repository.save(type);

        return type;
    }

    async find(id: string): Promise<Type> {
        return this.repository.findOne({ id });
    }

    async list(): Promise<Type[]> {
        const Types = await this.repository.find({
            order: {
                title: "ASC"
            }
        });

        return Types;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id });
    }

}

export { TypeRepository };