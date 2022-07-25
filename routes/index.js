const express = require('express')

const db = require('../models/db')()


const data = db.stores.file.store

const router = express.Router()


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Дневные котировки акций Cбербанка с 1 сентября 2011 по 1 сентября 2021' });
})

router.post('/getData', function(req, res, next) {
  let step = req.body
  let current = db.get("Текущее значение")
  
  db.set("Текущее значение", Number(current) + Number(step) )
  db.save()

  current = db.get("Текущее значение")

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
    })
})


module.exports = router
