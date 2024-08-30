import { Customer } from "infra/typeorm/entities/Customer";
import { ICustomerDTO } from "useCases/dtos/ICustomerDTO";

interface ICustomerRepository {
    create(data: ICustomerDTO): Promise<Customer>;
    findCustomerByName(name: string): Promise<Customer>;
    list(): Promise<Customer[]>;
    listByCustomerName(name: string): Promise<Customer[]>;
    find(id: string): Promise<Customer>;
    updateCustomer(id: string, data: ICustomerDTO): Promise<void>;
    delete(id: string): Promise<void>;
}

export { ICustomerRepository };