const inquirer = require('inquirer');
const shelljs = require('shelljs');
const chalk = require('chalk');
const askForStatic = require('./ask.static');

async function getAnswer() {
  let answer = await inquirer.prompt([
    {
      name: 'project',
      message: '您要运行哪个项目',
      type: 'list',
      choices: [
        {
          name: 'template-apart-radar: 看房对比dashboard',
          value: 'template-apart-radar'
        },
        {
          name: 'server：统一server端',
          value: 'server'
        }
      ]
    }
  ])

  if (answer.project === 'template-apart-radar') {
    const res = await askForStatic();
    answer = { ...answer, ...res };
  }

  console.table(answer)

  return answer;
}

function getShellStr(conf) {
  let res = `cd packages/${conf.project} && cross-env NODE_ENV=${conf.node_env}`

  if (conf.analasy) {
    res += ` ANALASY=1 `
  }

  if (conf.node_env === 'development') {
    res += ` webpack-dev-server --config webpack.config.js`
  } else if (conf.node_env === 'production') {
    res += ` webpack --config webpack.config.js`
  }

  if (conf.upload) {
    res += ' && node ./upload.js'
  }

  return res;
}

async function init() {
  const answer = await getAnswer();

  const shellStr = getShellStr(answer);

  console.log(chalk.redBright('最终运行脚本：'))
  console.log(chalk.greenBright(shellStr))

  shelljs.exec(shellStr);
}


init();