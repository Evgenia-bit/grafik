const nconf = require('nconf'); //подключаем модуль для работы с бд на json
const path = require('path');

module.exports = function () { //экспортируем бд
  return nconf
    .argv()
    .env()
    .file({file: path.join(__dirname, 'data.json')});
}