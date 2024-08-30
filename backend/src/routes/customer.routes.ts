import { Router } from 'express';
import { CreateCustomerController } from 'useCases/Customer/CreateCustomerController';
import { DeleteCostumerController } from 'useCases/Customer/DeleteCostumerController';
import { FindCustomerController } from 'useCases/Customer/FindCustomerController';
import { ListCustomerController } from 'useCases/Customer/ListCustomerController';
import { ListFilteredCustomerController } from 'useCases/Customer/ListFilteredCustomerController';
import { UpdateCustomerController } from 'useCases/Customer/UpdateCustomerController';

const costumerRoutes = Router();

const createCostumerController = new CreateCustomerController();
const listCostumerController = new ListCustomerController();
const listFilteredCustomerController = new ListFilteredCustomerController();
const deleteCostumerController = new DeleteCostumerController();
const findCustomerController = new FindCustomerController();
const updateCustomerController = new UpdateCustomerController();

costumerRoutes.post(
    "/customer",
    createCostumerController.handle
);

costumerRoutes.put(
    "/customer",
    updateCustomerController.handle
);

costumerRoutes.get(
    "/customer",
    listCostumerController.handle
);

costumerRoutes.get(
    "/customer/:name",
    listFilteredCustomerController.handle
);

costumerRoutes.get(
    "/customer/id/:id",
    findCustomerController.handle
);

costumerRoutes.get(
    "/customer/delete/:id",
    deleteCostumerController.handle
);

export { costumerRoutes };