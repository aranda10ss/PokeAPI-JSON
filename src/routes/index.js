const express = require('express')
const pokemonRoutes = require('./api/index')

const router = express.Router()

router.use('/api', pokemonRoutes)

module.exports = router
