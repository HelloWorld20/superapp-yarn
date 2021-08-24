import * as Koa from "koa";
import router from "./router";
import * as Router from "@koa/router";
import errorMiddleware from './middleware/error';
import notFoundMiddleware from './middleware/404'

const PORT = 4000;

const app = new Koa();

const rootRouter = new Router({
  prefix: '/api/demo'
});

///////// 错误处理中间件
app.use(errorMiddleware);
////////// 错误处理中间件 end

///////// 公共处理

app.use(async (ctx, next) => {
  ctx.set("X-Powered-By", "292701515@qq.com");
  await next();
});

///////// 公共处理  end

///////// 装载路由
for (let [key, controller] of Object.entries(router)) {
  rootRouter.use(key, controller.routes());
}

app.use(rootRouter.routes());
///////// 装载路由 end

///////// 404中间件
app.use(notFoundMiddleware);
///////// 404中间件 end

app.listen(PORT, () => {
  console.log(`server-koa 启动于:${PORT}`);
});
