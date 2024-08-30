import { container } from 'tsyringe';
import { CustomerRepository } from 'useCases/Customer/CustomerRepository';
import { ICustomerRepository } from 'useCases/Customer/ICustomerRepository';
import { IRegisterRepository } from 'useCases/Register/IRegisterRepository';
import { RegisterRepository } from 'useCases/Register/RegisterRepository';
import { IServiceRepository } from 'useCases/Service/IServiceRepository';
import { ServiceRepository } from 'useCases/Service/ServiceRepository';
import { ITypeRepository } from 'useCases/Type/ITypeRepository';
import { TypeRepository } from 'useCases/Type/TypeRepository';

container.registerSingleton<ICustomerRepository>(
    "CustomerRepository",
    CustomerRepository
);

container.registerSingleton<ITypeRepository>(
    "TypeRepository",
    TypeRepository
);

container.registerSingleton<IServiceRepository>(
    "ServiceRepository",
    ServiceRepository
);

container.registerSingleton<IRegisterRepository>(
    "RegisterRepository",
    RegisterRepository
);