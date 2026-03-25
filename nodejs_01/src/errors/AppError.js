class AppError extends Error {
  constructor(message, status = 500, type = "INTERNAL_ERROR", logToDB = false) {
    super(message);
    this.status = status;
    this.type = type;
    this.logToDB = logToDB;

    Error.captureStackTrace(this, this.constructor);
  }
}