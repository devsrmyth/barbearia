import { Service } from "infra/typeorm/entities/Service";
import { INewServiceDTO } from "useCases/dtos/INewServiceDTO";
import { IServiceDTO } from "useCases/dtos/IServiceDTO";

interface IServiceRepository {
    create(data: INewServiceDTO): Promise<Service>;
    list(): Promise<Service[]>;
    listByCustomerName(name: string): Promise<Service[]>;
    listByCustomerNameAndDate(name: string, dataInicio: string, dataFim: string): Promise<Service[]>
    find(id: string): Promise<Service>;
    updateService(id: string, data: IServiceDTO): Promise<void>;
    delete(id: string): Promise<void>;
}

export { IServiceRepository };