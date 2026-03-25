export const parseBody = (req, maxSize = 1 * 1024 * 1024) => {
  return new Promise((resolve, reject) => {
    let chunks = [];
    let size = 0;

    const contentType = req.headers["content-type"] || "";

    req.on("data", (chunk) => {
      size += chunk.length;

      if (size > maxSize) {
        reject(new Error("Request body too large"));
        req.destroy();
        return;
      }

      chunks.push(chunk);
    });

    req.on("end", () => {
      try {
        const rawBody = Buffer.concat(chunks).toString();

        if (!rawBody || rawBody.trim() === "") {
          return resolve({});
        }

        // 🧠 Content-Type based parsing

        if (contentType.includes("application/json")) {
          return resolve(JSON.parse(rawBody));
        }

        if (contentType.includes("application/x-www-form-urlencoded")) {
          const params = new URLSearchParams(rawBody);
          const obj = {};

          for (const [key, value] of params.entries()) {
            obj[key] = value;
          }

          return resolve(obj);
        }

        if (contentType.includes("text/plain")) {
          return resolve({ text: rawBody });
        }

        // 🔥 fallback (unknown content-type)
        return resolve({ raw: rawBody });

      } catch (err) {
        reject(new Error("Invalid request body format"));
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
};