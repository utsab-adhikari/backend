import { clearRequestLogsController, requestLogController, requestLogsByPathController } from "../controllers/requestLog.controller.js";
import { router } from "../router.js";


router.register("GET", "/requests", requestLogController);
router.register("DELETE", "/requests/clear", clearRequestLogsController);
router.register("GET", "/requests/path", requestLogsByPathController);

export default router;