'use strict';

const express = require('express');

const controller = require('../controllers/generalController.js');

const router = express.Router();

router.get('/contents', controller.getAllThemes);
  
router.get('/imageids/:contentId', controller.getImageIds);
router.get('/options/:contentId', controller.getOptions);
router.get('/answers/:contentId', controller.getAnswers);  
router.get('/image/:imageId', controller.getImageData);
  
// router.get('/words/:contentId/:imageId/:objectX/:objectY', controller.getLabel);

module.exports = router;