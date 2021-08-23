// 在此引入所有的询问试配置

const TAR = require("../packages/template-apart-radar/scripts/start");

const server = require("../packages/server-koa/scripts/start");

module.exports = {
  "template-apart-radar": TAR,
  server,
};
