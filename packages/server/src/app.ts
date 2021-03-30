import routes from "./routes";
import { createApp } from 'ww-framework/lib/app';
import middlewares from "./middlewares";
import errorHandler from "./middlewares/error-handler";
import config from './config';

function create() {
  const app = createApp({
    routes,
    middlewares,
    errorHandler,
  });
  app.enable("trust proxy");
  return app;
}

export default { create };
