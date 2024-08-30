import { Register } from "infra/typeorm/entities/Register";
import { IRegisterDTO } from "useCases/dtos/IRegisterDTO";

interface IRegisterRepository {
    create(data: IRegisterDTO): Promise<Register>;
    list(): Promise<Register[]>;
    listByDescription(description: string): Promise<Register[]>;
    listByDate(dataInicio: string, dataFim: string): Promise<Register[]>;
    find(id: string): Promise<Register>;
    update(id: string, data: IRegisterDTO): Promise<void>;
    delete(id: string): Promise<void>;
}

export { IRegisterRepository };