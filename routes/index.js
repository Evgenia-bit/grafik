var express = require('express');
var router = express.Router();

const db = require('../models/db')()
const data = db.stores.file.store;

var current = db.get("Текущее значение");
var date =  data['Дата'][current];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'График' });
});
router.post('/getData', function(req, res, next) {
  let step = req.body;
  
  db.set("Текущее значение", Number(current) + Number(step) );
  db.save();
  current = db.get("Текущее значение");
  return res.json(
    {
      msg:'Данные успешно получены!',
      date: data['Дата'][current],
      close: data['Цена'][current], 
      open: data['Откр.'][current],
      max: data['Макс.'][current],
      min: data['Мин.'][current],
      
    });
});

module.exports = router;
