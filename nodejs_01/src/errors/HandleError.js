import { Response } from "../middleware/Response.js";

export const handleError = async ({
  err,
  message = "Internal Server Error",
  status = 500,
  type = "INTERNAL_ERROR",
  logToDB = false,
  req = null,
  res = null,
}) => {
  const isRealError = err instanceof Error;

  const error = {
    message: isRealError ? err.message : message,
    status: err?.status || status,
    type: err?.type || type,
    logToDB: err?.logToDB ?? logToDB,
    stack: isRealError ? err.stack : undefined,
  };

  // 🗄️ Log
  if (error.logToDB && req) {
    try {
      await prisma.errorLog.create({
        data: {
          message: error.message,
          type: error.type,
          stack: error.stack,
          path: req.url,
          method: req.method,
        },
      });
    } catch (e) {
      console.error("Logging failed:", e);
    }
  }

  return Response.json({
    res,
    status: error.status,
    success: false, 
    message: error.message,
  });
};
