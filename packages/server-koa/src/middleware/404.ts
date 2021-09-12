import { Middleware } from "koa";
import * as Boom from "boom";

const notFoundMiddleware: Middleware = async (ctx, next) => {
  if (ctx._matchedRoute) {
    await next();
  } else {
    throw Boom.notFound("未找到页面");
  }
};
export default notFoundMiddleware;
