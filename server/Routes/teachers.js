const express = require('express')
const router = express.Router()

const teachersController = require('../Controller/Teachers/')

router.get('/teachers', teachersController.GET)
      .post('/teachers', teachersController.POST)
      .delete('/teachers', teachersController.DELETE)

module.exports = router
