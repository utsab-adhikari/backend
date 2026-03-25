import { homeDocController } from "../controllers/docs.controller.js";
import { router } from "../router.js";

router.register("GET", "/", homeDocController);

export default router;