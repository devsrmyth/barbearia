import { Router } from 'express';
import { CreateTypeController } from 'useCases/Type/CreateTypeController';
import { FindTypeController } from 'useCases/Type/FindTypeController';
import { ListFilteredTypeController } from 'useCases/Type/ListFilteredTypeController';
import { ListTypeController } from 'useCases/Type/ListTypeController';
import { UpdateTypeController } from 'useCases/Type/UpdateTypeController';

const typeRoutes = Router();

const createTypeController = new CreateTypeController();
const listTypeController = new ListTypeController();
const findTypeController = new FindTypeController();
const updateTypeController = new UpdateTypeController();
const listFilteredTypeController = new ListFilteredTypeController();

typeRoutes.post(
    "/type",
    createTypeController.handle
);

typeRoutes.get(
    "/type",
    listTypeController.handle
);

typeRoutes.get(
    "/type/:name",
    listFilteredTypeController.handle
);

typeRoutes.get(
    "/type/id/:id",
    findTypeController.handle
);

typeRoutes.put(
    "/type",
    updateTypeController.handle
);

export { typeRoutes };