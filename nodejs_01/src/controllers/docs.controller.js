import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { handleError } from "../errors/HandleError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const homeDocController = async (req, res) => {
  try {
    const filePath = join(__dirname, "../docs", "home.html");
    const htmlContent = await readFile(filePath, "utf-8");

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlContent);
  } catch (err) {
    handleError({
      err,
      message: "Failed to load documentation",
      status: 500,
      type: "DOCS_LOAD_ERROR",
      logToDB: true,
      req,
      res,
    });
  }
};
