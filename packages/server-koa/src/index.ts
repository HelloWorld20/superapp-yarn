import * as Koa from "koa";
import router from "./router";

import * as cors from "koa-cors";
import * as mongo from "koa-mongo";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "@koa/router";

import errorMiddleware from "./middleware/error";
import notFoundMiddleware from "./middleware/404";

const PORT = 4000;

const app = new Koa();

const rootRouter = new Router({
  prefix: "/api/demo",
});

app.use(logger());
app.use(bodyParser({ formLimit: "1mb" }));

/////////mongodb
const mongoConf = {
  host: "127.0.0.1",
  port: 27017,
  password: "abcd",
};
// mongoose.connect('mongodb://用户名:密码@127.0.0.1:27017/数据库名称')
const DB_URL = (function () {
  if (mongoConf.user && mongoConf.password) {
    return `mongodb://${mongoConf.user}:${mongoConf.password}@${mongoConf.host}:${mongoConf.port}/admin`;
  } else {
    return `mongodb://${mongoConf.host}:${mongoConf.port}/admin`;
  }
})();
console.log("DB_URL", DB_URL);

app.use(mongo({ uri: DB_URL }));

app.use(cors({ origin: "*" }));

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
