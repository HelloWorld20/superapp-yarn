const inquirer = require("inquirer");

async function getAnswer() {
  return "";
}

function getShellStr(conf) {
  return "cd packages/server-koa && npm run dev";
}

module.exports = {
  getAnswer,
  getShellStr,
};
