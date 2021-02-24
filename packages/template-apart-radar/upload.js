const path = require('path');
const Uploader = require('ww-tools-upload-cdn');

const uploader = new Uploader(path.resolve(__dirname, './dist'), path.resolve(__dirname, './config.json'));

uploader.uploadFolder();
