const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
app.use(express.urlencoded({extended: false}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Server running on port, ${PORT}`))