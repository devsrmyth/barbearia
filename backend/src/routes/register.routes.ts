import { Router } from 'express';
import { CreateRegisterController } from 'useCases/Register/CreateRegisterController';
import { DeleteRegisterController } from 'useCases/Register/DeleteRegisterController';
import { FindRegisterByIdController } from 'useCases/Register/FindRegisterByIdController';
import { ListFilteredByDateController } from 'useCases/Register/ListFilteredByDateController';
import { ListFilteredByDescriptionController } from 'useCases/Register/ListFilteredByDescriptionController';
import { ListRegisterController } from 'useCases/Register/ListRegisterController';
import { UpdateRegisterController } from 'useCases/Register/UpdateRegisterController';

const registerRoutes = Router();

const createRegisterController = new CreateRegisterController();
const listRegisterController = new ListRegisterController();
const listFilteredByDescriptionController = new ListFilteredByDescriptionController();
const updateRegisterController = new UpdateRegisterController();
const findRegisterByIdController = new FindRegisterByIdController();
const listFilteredByDateController = new ListFilteredByDateController();
const deleteRegisterController = new DeleteRegisterController();

registerRoutes.post(
    "/register",
    createRegisterController.handle
);

registerRoutes.get(
    "/register",
    listRegisterController.handle
)

registerRoutes.get(
    "/register/delete/:id",
    deleteRegisterController.handle
);

registerRoutes.get(
    "/register/id/:id",
    findRegisterByIdController.handle
)

registerRoutes.get(
    "/register/:dataInicio/:dataFim",
    listFilteredByDateController.handle
)

registerRoutes.get(
    "/register/:description",
    listFilteredByDescriptionController.handle
)

registerRoutes.put(
    "/register",
    updateRegisterController.handle
)





export { registerRoutes };