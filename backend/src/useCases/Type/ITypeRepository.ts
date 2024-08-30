import { Type } from "infra/typeorm/entities/Type";
import { ITypeDTO } from "useCases/dtos/ITypeDTO";

interface ITypeRepository {
    create(data: ITypeDTO): Promise<Type>;
    findTypeByName(name: string): Promise<Type>;
    list(): Promise<Type[]>;
    listByTypeName(name: string): Promise<Type[]>;
    find(id: string): Promise<Type>;
    updateType(id: string, data: ITypeDTO): Promise<void>;
    delete(id: string): Promise<void>;
}

export { ITypeRepository };