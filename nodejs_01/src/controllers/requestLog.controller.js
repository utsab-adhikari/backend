import { prisma } from "../db/prisma.js";
import { Response } from "../middleware/Response.js";
import { parseBody } from "../utils/parseBody.js";
import { handleError } from "../utils/errorHandler.js";

export const requestLogController = async (req, res) => {
  try {
    const logs = await prisma.requestLog.findMany();
    if (logs.length === 0) {
      return Response.json({
        res,
        status: 200,
        success: true,
        data: [],
        message: "No request logs found",
      });
    }

    return Response.json({
      res,
      status: 200,
      success: true,
      data: logs,
    });
  } catch (err) {
    handleError({
      err,
      message: "Failed to retrieve request logs",
      status: 500,
      type: "REQUEST_LOG_RETRIEVAL_ERROR",
      logToDB: true,
      req,
      res,
    });
  }
};

export const clearRequestLogsController = async (req, res) => {
  try {
    await prisma.requestLog.deleteMany();
    return Response.json({
      res,
      status: 200,
      success: true,
      message: "All request logs cleared",
    });
  } catch (err) {
    handleError({
      err,
      message: "Failed to clear request logs",
      status: 500,
      type: "REQUEST_LOG_CLEAR_ERROR",
      logToDB: true,
      req,
      res,
    });
  }
};

export const requestLogsByPathController = async (req, res) => {
  try {
    const body = await parseBody(req);
    const { path } = body;

    let logs;

    if (!path || path === "all") {
      logs = await prisma.requestLog.findMany();
    } else {
      logs = await prisma.requestLog.findMany({
        where: { path },
      });
    }
    
    if (!logs || logs.length === 0) {
      return Response.json({
        res,
        status: 200,
        success: true,
        data: [],
        message: `No request logs found${path ? ` for path: ${path}` : ""}`,
      });
    }

    const totalLatency = logs.reduce((sum, log) => sum + (log.latencyMs || 0), 0);

    const averageLatency = totalLatency / logs.length;
    const totalRequests = logs.length;

    return Response.json({
      res,
      status: 200,
      success: true,
      data: {
        path: path || "all",
        averageLatency,
        totalRequests,
        logs,
      },
    });
  } catch (err) {
    return handleError({
      err,
      message: "Failed to retrieve request logs for the specified path",
      status: 500,
      type: "REQUEST_LOG_PATH_RETRIEVAL_ERROR",
      logToDB: true,
      req,
      res,
    });
  }
};
