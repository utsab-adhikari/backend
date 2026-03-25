import http from "http";
import dotenv from "dotenv";
import { router } from "./router.js";
import "./routes/users.routes.js";
import "./routes/docs.routes.js";
import "./routes/requests.routes.js";
import "./routes/errors.routes.js";
import "./routes/metrics.routes.js";
import { requestMonitor } from "./middleware/requestMonitor.js";
import { handleError } from "./errors/HandleError.js";
import { metrics } from "./metrics.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const bootStart = performance.now();

const server = http.createServer((req, res) => {
  const start = performance.now();

  metrics.totalRequests++;

  router.handle(req, res)
    .catch((err) => {
      metrics.totalErrors++;

      return handleError({
        err,
        req,
        res,
      });
    })
    .finally(async () => {
      const latency = performance.now() - start;
      metrics.totalLatencyMs += latency;

      try {
        await requestMonitor(req, res, latency);
      } catch (e) {
        console.error("Monitor error:", e);
      }
    });
});

server.listen(PORT, () => {
  const bootEnd = performance.now();
  metrics.bootTimeMs = bootEnd - bootStart;

  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Boot time: ${metrics.bootTimeMs.toFixed(2)} ms`);
});