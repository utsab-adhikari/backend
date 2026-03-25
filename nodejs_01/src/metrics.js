import os from "os";
import { start } from "repl";

export const metrics = {
  startTime: Date.now(),
  bootTimeMs: 0,

  totalRequests: 0,
  totalErrors: 0,
  totalLatencyMs: 0,

  get upTimeMS() {
    return Date.now() - this.startTime;
  },

  get avgLatency() {
    if (this.totalRequests === 0) return 0;
    return this.totalLatencyMs / this.totalRequests;
  },

  get memory() {
    const mem = process.memoryUsage();
    return {
      rss: mem.rss,
      heapTotal: mem.heapTotal,
      heapUsed: mem.heapUsed,
      external: mem.external,
    };
  },

  get systemMemory() {
    return {
      total: os.totalmem(),
      free: os.freemem(),
    };
  },

  get cpu() {
    return process.cpuUsage();
  },
};
