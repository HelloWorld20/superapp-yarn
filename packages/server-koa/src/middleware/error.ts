import { Middleware } from "koa";

const errorMiddleware: Middleware = async function (ctx, next) {
  try {
    await next();
  } catch (e) {
    // console.log("service error", e.code, e.status, e.message);
    // console.log("response", ctx.response.status);
    ctx.throw(e.status, {
      code: e.code,
      status: e.status,
      message: e.message,
    });
  }
};

export default errorMiddleware;
