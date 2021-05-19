# 如何获取数据

1. chrome 先下载油猴插件
2. 下载[油猴脚本](https://gist.github.com/HelloWorld20/de359967c791730f1ed9ae9fcd51df2f)，然后在油猴里新建并运行。
3. 找到链家具体房源链接（暂不支持已售房源）如：https://gz.lianjia.com/ershoufang/108402250911.html
4. F12。在 console 里找到`////////////爬取到的数据：`，复制到粘贴板
5. 此文件夹中新建文件名，复制其他模板的代码。
6. 粘贴，把基础数据覆盖旧数据
7. index.ts 里 require 新建的文件夹即可
