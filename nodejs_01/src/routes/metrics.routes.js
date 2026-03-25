import { metricsController } from "../controllers/metrics.controller.js";
import { router } from "../router.js";

router.register("GET", "/metrics", metricsController);

export default router;
