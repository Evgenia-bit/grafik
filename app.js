const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')


const app = express()


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.text())

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))

app.use(function (req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {message: err.message, error: err})
})


app.listen(3000, () => console.log('Server started on port 3000'))
