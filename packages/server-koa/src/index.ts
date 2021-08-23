// import * as path from "path";
import * as Koa from "koa";
import router from './router'
// import * as Router from 'koa-router'

const PORT = 4000;

const app = new Koa();
// const routers = new Router();

for(let [key, controller] of Object.entries(router)) {
  console.log('key', 'controller', key, controller);
  // routers.use(key, controller);
}

// router.get('/assets', require("koa-static")(path.resolve(__dirname, "./assets")))

// app.use(require("koa-static")(path.resolve(__dirname, "./assets")));

app.listen(PORT, () => {
  console.log(`server-koa 启动于:${PORT}`);
});
