const inquirer = require('inquirer');

module.exports = async () => {
  let res;
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'node_env',
      message: '运行环境（process.env.NODE_ENV）',
      choices: [
        {
          name: 'development',
          value: 'development'
        },
        {
          name: 'production',
          value: 'production'
        }
      ]
    }
  ])
  res = { ...answer };
  if (answer.node_env === 'production') {
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'analasy',
        message: '是否用boundleAnalasyPlugin分析代码',
        default: false
      },
      {
        type: 'confirm',
        name: 'upload',
        message: '是否上传到cdn',
        default: false
      }
    ])
    res = { ...res, ...answer };
  }

  return res;
}