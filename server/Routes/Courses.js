const express = require('express')
const router = express.Router()

const courseControler = require('../Controller/Courses/') 

router.get('/course', courseControler.GET)
      .post('/course', courseControler.POST)    
      .delete('/course/:id', courseControler.DELETE)  

module.exports = router;
