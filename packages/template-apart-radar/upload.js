const path = require('path');
const Uploader = require('ww-tools-upload-cdn');
const Config = require('ww-config').default;

const config = new Config(path.resolve(__dirname, './config.json'));

const uploader = new Uploader(path.resolve(__dirname, './dist'), config.get('cos'));

uploader.uploadFolder();
