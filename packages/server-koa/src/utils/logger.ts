/**
 * 日志模块，每天为一个单位
 * 使用方法： const logger = require('../../utils/logger')
 * logger.error(`auth middleware 错误, ${token}, ${err}`)
 */

 const log4js = require('log4js')
 const config = require('config')

 const noConsole = config.logger.noConsole
 const appenders = noConsole ? [] : [ 'console' ]

 log4js.configure({
   appenders: {
     everything: {
       type: 'dateFile',
       filename: './logs/all-the-logs.log',
       pattern: '.yyyy-MM-dd',
       maxLogSize: 10485760,
       backups: 60
     },
     console: {
       type: 'console',
       category: 'console'
     }
   },
   categories: {
     default: {
       appenders: [ 'everything' ].concat(appenders),
       level: 'debug'
     }
   },
   replaceConsole: true
 })

 let logger = log4js.getLogger()

 module.exports = logger
