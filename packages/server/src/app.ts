import routes from "./routes";
import * as config from "ww-config";
import { createApp } from "ww-middleware/src/app";
import middlewares from "./middlewares";
import errorHandler from "ww-middleware/src/error-handler";

function create() {
  const app = createApp({
    routes,
    middlewares,
    errorHandler,
    views: config.get("static.distDir") || ""
  });
  app.enable("trust proxy");
  return app;
}

export default { create };
