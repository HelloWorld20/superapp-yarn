import { Middleware } from "koa";
import { ServiceError, ERROR_STATUS } from "../utils/service-error";

const notFoundMiddleware: Middleware = async (ctx, next) => {
  if (ctx._matchedRoute) {
    await next();
  } else {
    throw new ServiceError(ERROR_STATUS["not found"], "未找到页面");
  }
};
export default notFoundMiddleware;
