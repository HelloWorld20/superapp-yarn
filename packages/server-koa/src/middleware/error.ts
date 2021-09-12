import { Middleware } from "koa";
import * as Boom from "boom";

const errorMiddleware: Middleware = async function (ctx, next) {
  try {
    await next();
  } catch (err) {
    let wrappedErr: any = err;
    if (!Boom.isBoom(wrappedErr)) {
      // Unexpected error
      // logger.error("[error-handler]: ", wrappedErr);
      wrappedErr = Boom.badImplementation("服务器错误", {
        code: "2",
      });
    }
    ctx.status = wrappedErr.output.statusCode;
    ctx.body = Object.assign(
      {
        msg: wrappedErr.output.payload.message,
      },
      wrappedErr.data
    );
  }
};

export default errorMiddleware;
