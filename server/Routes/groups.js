const express = require('express')
const router = express.Router()

const groupControler = require('../Controller/Groups/') 

router.get('/groups', groupControler.GET)
      .post('/groups', groupControler.POST)

module.exports = router;
