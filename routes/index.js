const router = require('express').Router()

router.get('/', (req, res) => res.send('welcome to ip address tracker'))

module.exports = router