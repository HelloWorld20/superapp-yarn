const fs = require("fs");
const inquirer = require("inquirer");
const shelljs = require("shelljs");
const chalk = require("chalk");
const scripts = require("./scripts");

async function getProject() {
  let answer = await inquirer.prompt([
    {
      name: "project",
      message: "您要运行哪个项目",
      type: "checkbox",
      choices: [
        {
          name: "template-apart-radar: 看房对比dashboard",
          value: "template-apart-radar",
          checked: true,
        },
        {
          name: "server：统一server端",
          value: "server",
        },
        // {
        //   name: "utils：全局公共方法",
        //   value: "utils",
        // },
      ],
    },
  ]);

  console.log(answer.project)

  // if (answer.length === 0) {
  //   console.warn("请选择至少一个项目");
  //   return "";
  // }
  // 没接入concurrent时，仅启动第一个项目
  return answer.project[0];
}

async function init() {
  const projects = await getProject();

  const project = projects;

  const script = scripts[project];

  const answer = await script.getAnswer();

  const shellStr = script.getShellStr(answer);


  console.log(chalk.redBright("最终运行脚本："));
  console.log(chalk.greenBright(shellStr));

  shelljs.exec(shellStr);
}

init();
