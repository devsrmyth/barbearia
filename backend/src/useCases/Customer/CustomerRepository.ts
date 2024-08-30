import { Customer } from "infra/typeorm/entities/Customer";
import { getRepository, ILike, Repository } from "typeorm";
import { ICustomerRepository } from "./ICustomerRepository";

class CustomerRepository implements ICustomerRepository {

    private repository: Repository<Customer>;

    constructor() {
        this.repository = getRepository(Customer);
    }
    
    async findCustomerByName(name: string): Promise<Customer> {
        return this.repository.findOne({ name });
    }

    async listByCustomerName(name: string): Promise<Customer[]> {
        return this.repository.find({
            name: ILike(`%${name}%`)
        })
    }

    async updateCustomer(id: string, data: Customer): Promise<void> {
        let customer = await this.repository.findOne({ id });

        Object.assign(customer, {
            ...data
        });

        await this.repository.save(customer);
    }

    async create(data: Customer): Promise<Customer> {
        const full_customer = new Customer();

        Object.assign(full_customer, {
            ...data
        });

        const customer = this.repository.create(full_customer);

        await this.repository.save(customer);

        return customer;
    }

    async find(id: string): Promise<Customer> {
        return this.repository.findOne({ id });
    }

    async list(): Promise<Customer[]> {
        const customers = await this.repository.find({
            order: {
                name: "ASC"
            }
        });

        return customers;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id });
    }

}

export { CustomerRepository };