var express = require('express');
var router = express.Router();

const db = require('../models/db')();
const data = db.stores.file.store;

var current = db.get("Текущее значение");



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Дневные котировки на акции Cбербанка с 1 сентября 2011 по 1 сентября 2021' });
});
router.post('/getData', function(req, res, next) {
  let step = req.body;
  
  db.set("Текущее значение", Number(current) + Number(step) );
  db.save();
  current = db.get("Текущее значение");


  return res.json(
    {
      msg:'Данные успешно загружены!',
      date: data['Дата'][current],
      close: data['Цена'][current], 
      open: data['Откр.'][current],
      max: data['Макс.'][current],
      min: data['Мин.'][current],
      end: (current == 0) ? true : false,
      start: (current == data['Дата'].length-1)? true : false
    });
});

module.exports = router;
