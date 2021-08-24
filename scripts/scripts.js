// 在此引入所有的询问试配置

const TAR = require("../packages/template-apart-radar/scripts/start");

const server = require("../packages/server-koa/scripts/start");

module.exports = {
  "template-apart-radar": {
    desc: '看房对比dashboard',
    name: 'template-apart-radar',
    component: TAR
  },
  server: {
    desc: '统一server端',
    name: 'server',
    component: server
  },
};
