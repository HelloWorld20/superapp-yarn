const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const COS = require('cos-nodejs-sdk-v5');

class Uploader {
    constructor(folderPath, config) {
        this.folderPath = folderPath;
        // this.configPath = configPath;
        console.log('上传配置：', config)
        // const config = this.loadJSON(configPath);
        this.config = config;

        this.cos = new COS({
            SecretId: config.SecretId,
            SecretKey: config.SecretKey,
        });
    }

    uploadFile(filePath, fileName) {
        if (!filePath || !fileName) return;

        return new Promise((resolve, reject) => {
            this.cos.sliceUploadFile({
                Bucket: this.config.Bucket, // Bucket 格式：test-1250000000
                Region: this.config.Region,
                Key: `/app/${fileName}`,
                FilePath: filePath
            }, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    console.log(chalk.red(`上传成功：${data.Location}`))
                    resolve(data.Location);
                }
            });
        })
    }

    loadJSON(filename) {
        try {
            const content = fs.readFileSync(filename, "utf8");
            return JSON.parse(content);
        } catch (error) {
            console.warn('Error', error);
            return {};
        }
    }

    uploadFolder() {
        fs.readdir(this.folderPath, (err, files) => {
            if (err) {
                console.warn(err)
            } else {
                //遍历读取到的文件列表
                files.forEach(filename => {
                    //获取当前文件的绝对路径
                    var filedir = path.join(this.folderPath, filename);
                    //根据文件路径获取文件信息，返回一个fs.Stats对象
                    fs.stat(filedir, (eror, stats) => {
                        if (eror) {
                            console.warn('获取文件stats失败');
                        } else {
                            var isFile = stats.isFile();//是文件
                            var isDir = stats.isDirectory();//是文件夹
                            if (isFile) {
                                this.uploadFile(filedir, `${this.config.name}/${filename}`)
                            }
                            if (isDir) {
                                this.uploadFolder(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                            }
                        }
                    })
                });

            }
        });
    }

}


module.exports = Uploader;
