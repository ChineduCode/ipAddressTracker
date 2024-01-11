const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Server running on port, ${PORT}`))