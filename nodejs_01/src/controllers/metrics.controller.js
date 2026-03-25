import { Response } from "../middleware/Response.js";
import { metrics } from "../metrics.js";

export const metricsController = async (req, res) => {
  return Response.json({
    res,
    message: "Metrics data",
    data: {
      uptime_ms: metrics.upTimeMS,
      boot_time_ms: metrics.bootTimeMs,

      total_requests: metrics.totalRequests,
      total_errors: metrics.totalErrors,
      avg_latency_ms: metrics.avgLatency,

      memory_usage: metrics.memory,
      system_memory: metrics.systemMemory,

      cpu_usage: metrics.cpu,

      start_time: new Date(metrics.startTime).toISOString(),
      now: new Date().toISOString(),
    },
  });
};
