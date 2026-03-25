
import { createUserController, deleteAllUsersController, getUsersController } from "../controllers/user.controller.js";
import { router } from "../router.js";

router.register("POST", "/users", createUserController);
router.register("GET", "/users", getUsersController);
router.register("DELETE", "/users", deleteAllUsersController);

export default router;
