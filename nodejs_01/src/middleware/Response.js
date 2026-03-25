export const Response = {
  json({ res, status = 200, success = true, data = null, meta = null, message = null }) {
    if (!res) throw new Error("Response object is required");
    if (res.headersSent) return;

    if (status == 204) {
      res.statusCode = 204;
      return res.end();
    }

    res.statusCode = status;
    const response = {
      success: success,
    };

    if (message) response.message = message;
    if (data != null) response.data = data;

    if (meta) response.meta = meta;

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
  },
  html({ res, status = 200, htmlContent }) {
    if (!res) throw new Error("Response object is required");
    if (res.headersSent) return;

    res.statusCode = status;
    res.setHeader("Content-Type", "text/html");
    res.end(htmlContent);
  },

  redirect({ res, status = 302, location }) {
    if (!res) throw new Error("Response object is required");
    if (res.headersSent) return;

    res.statusCode = status;
    res.setHeader("Location", location);
    res.end();
  },
};
