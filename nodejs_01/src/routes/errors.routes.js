import {
  clearErrorLogsController,
  errorLogController,
} from "../controllers/errors.controller.js";
import { router } from "../router.js";

router.register("GET", "/errors", errorLogController);
router.register("DELETE", "/errors/clear", clearErrorLogsController);

export default router;
