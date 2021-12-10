const express = require('express')
const router = express.Router()

const usersControler = require('../Controller/Users/')

router.get('/users', usersControler.GET)
      .post('/users', usersControler.POST)
      .put('/users', usersControler.UPDATE)
      .delete('/users', usersControler.DELETE)

module.exports = router
