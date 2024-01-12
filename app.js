const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

//view engine
app.set('view engine', 'ejs')

//body parser
app.use(express.urlencoded({extended: false}))

//css
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Server running on port, ${PORT}`))