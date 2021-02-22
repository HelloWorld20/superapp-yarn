基于yarn workspace的superapp



packages项目划分

* utils-server：基于node的工具函数
* utils-web：基于web的工具函数
* config：配置中心
* server：web基础服务
* middleware: node中间件
* types: 所有ts声明
* store：web端store服务
* theme：公共的css、less模板、图片、icon等
* components-react：基于react的常用components（antd化）
* build: webpack打包（看看能否抽离）
* template-air-tickets-crawler: 机票爬虫
* template-apart-radar: 看房总结dashboard
