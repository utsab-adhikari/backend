import { prisma } from "../db/prisma.js";
import { handleError } from "../errors/HandleError.js";

export const requestMonitor = async (req, res, latency) => {
  try {
    await prisma.requestLog.create({
      data: {
        method: req.method || "UNKNOWN",
        path: req.url || "UNKNOWN",
        status: res.statusCode,
        latencyMs: latency,
        ip: req.socket.remoteAddress || "UNKNOWN",
      },
    });
  } catch (err) {
    handleError({
      err,
      message: "Failed to log request",
      status: 500,
      type: "REQUEST_LOGGING_ERROR",
      logToDB: true,
    });
  }
};
