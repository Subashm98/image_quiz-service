'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController.js');

router.post('/theme', controller.saveTheme);
  
router.post('/image/:contentId', controller.saveImage);

router.post('/question', controller.saveQuestion);

router.post('/option', controller.saveOption)
  

module.exports = router;