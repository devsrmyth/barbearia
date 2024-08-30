import { Service } from "infra/typeorm/entities/Service";
import { getRepository, ILike, Repository } from "typeorm";
import { INewServiceDTO } from "useCases/dtos/INewServiceDTO";
import { IServiceDTO } from "useCases/dtos/IServiceDTO";
import { IServiceRepository } from "./IServiceRepository";

class ServiceRepository implements IServiceRepository {

    private repository: Repository<Service>;

    constructor() {
        this.repository = getRepository(Service);
    }

    async listByCustomerName(name: string): Promise<Service[]> {
        const services = await this.repository
            .createQueryBuilder("service")
            .leftJoinAndSelect("service.customer", "c")
            .where("c.name ILIKE :name", { name: `%${name}%` })
            .getMany();

        return services;
    }

    async listByCustomerNameAndDate(name: string, dataInicio: string, dataFim: string): Promise<Service[]> {
        const services = await this.repository
            .createQueryBuilder("service")
            .leftJoinAndSelect("service.customer", "c")
            .where("c.name ILIKE :name", { name: `%${name}%` })
            .andWhere("service.date BETWEEN :dataInicio AND :dataFim", { dataInicio: `${dataInicio}`, dataFim: `${dataFim}` })
            .getMany();

        return services;
    }

    async updateService(id: string, data: IServiceDTO): Promise<void> {
        let patient = await this.repository.findOne({ id });

        Object.assign(patient, {
            ...data
        });

        await this.repository.save(patient);
    }

    async create(data: INewServiceDTO): Promise<Service> {
        const full_Service = new Service();

        Object.assign(full_Service, {
            ...data
        });

        const service = this.repository.create(full_Service);

        await this.repository.save(service);

        return service;
    }

    async find(id: string): Promise<Service> {
        const service = await this.repository
            .createQueryBuilder("service")
            .leftJoinAndSelect("service.customer", "c")
            .where("service.id = :id")
            .setParameters({ id: id })
            .getOne();

        return service;
    }

    async list(): Promise<Service[]> {
        const Services = await this.repository.find({
            order: {
                id: "DESC"
            },
            relations: ['customer']
        });

        return Services;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id });
    }

}

export { ServiceRepository };