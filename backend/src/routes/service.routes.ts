import { Router } from 'express';
import { CreateServiceController } from 'useCases/Service/CreateServiceController';
import { DeleteServiceController } from 'useCases/Service/DeleteServiceController';
import { FindServiceByIdController } from 'useCases/Service/FindServiceByIdController';
import { ListFilteredByCustomerController } from 'useCases/Service/ListFilteredByCustomerController';
import { ListFilteredByNameDateController } from 'useCases/Service/ListFilteredByNameDateController';
import { ListServiceController } from 'useCases/Service/ListServiceController';
import { UpdateServiceController } from 'useCases/Service/UpdateServiceController';

const serviceRoutes = Router();

const createServiceController = new CreateServiceController();
const listFilteredByCustomerController = new ListFilteredByCustomerController();
const listFilteredByNameDateController = new ListFilteredByNameDateController();
const deleteServiceController = new DeleteServiceController();
const listServiceController = new ListServiceController();
const findServiceByIdController = new FindServiceByIdController();
const updateServiceController = new UpdateServiceController();

serviceRoutes.get(
    "/service/id/:id",
    findServiceByIdController.handle
);

serviceRoutes.post(
    "/service",
    createServiceController.handle
);

serviceRoutes.get(
    "/service/delete/:id",
    deleteServiceController.handle
);

serviceRoutes.get(
    "/service/:name",
    listFilteredByCustomerController.handle
);

serviceRoutes.get(
    "/service/:dataInicio/:dataFim",
    listFilteredByNameDateController.handle
);

serviceRoutes.get(
    "/service",
    listServiceController.handle
);

serviceRoutes.put(
    "/service",
    updateServiceController.handle
);

export { serviceRoutes };