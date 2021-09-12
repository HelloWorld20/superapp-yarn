import * as Router from "@koa/router";
import RES from '../utils/service-error'

const router = new Router();

router.get("/error", async (ctx, next) => {
  throw RES.GENERAL.SERVER_ERROR;
});

router.get("/error/ctx", async (ctx, next) => {
  ctx.throw(400, "name require");
});

router.get("/test", async (ctx, next) => {
  ctx.body = "hello world: test";
  await next();
});

export default router;
