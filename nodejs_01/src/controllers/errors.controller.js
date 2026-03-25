import { prisma } from "../db/prisma.js";
import { handleError } from "../errors/HandleError.js";
import { Response } from "../middleware/Response.js";

export const errorLogController = async (req, res) => {
  try {
    const errors = await prisma.errorLog.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (errors.length === 0) {
      return Response.json({
        res,
        status: 200,
        success: true,
        data: [],
        message: "No error logs found",
      });
    }

    return Response.json({
      res,
      status: 200,
      success: true,
      data: errors,
    });
  } catch (err) {
    handleError({
      err,
      message: "Failed to retrieve error logs",
      status: 500,
      type: "ERROR_LOG_RETRIEVAL_ERROR",
      logToDB: true,
      req,
      res,
    });
  }
};

export const clearErrorLogsController = async (req, res) => {
  try {
    await prisma.errorLog.deleteMany();
    return Response.json({
      res,
      status: 200,
      success: true,
      message: "All error logs cleared",
    });
  } catch (err) {
    handleError({
      err,
      message: "Failed to clear error logs",
      status: 500,
      type: "ERROR_LOG_CLEARING_ERROR",
      logToDB: true,
      req,
      res,
    });
  }
};
