import { handleError } from "./errors/HandleError.js";

class Router {
  routes = {};

  register(method, path, handler) {
    const key = method.toUpperCase() + ":" + path;
    this.routes[key] = handler;
  }

  async handle(req, res) {
    try {
      const url = new URL(req.url || "/", "http://localhost");
      const key = req.method.toUpperCase() + ":" + url.pathname;

      const handler = this.routes[key];

      if (!handler) {
        throw {
          message: "Route not found",
          status: 404,
          type: "NOT_FOUND",
          logToDB: false,
        };
      }

      await handler(req, res);
    } catch (err) {
      try {
        await handleError({ err, req, res });
      } catch (fatal) {
        // 🚨 absolute fallback (never crash server)
        console.error("Fatal error:", fatal);

        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    }
  }
}

export const router = new Router();
