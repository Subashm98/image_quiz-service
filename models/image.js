'use strict';

const db = require('../db.js');

function getImageIds(contentId){
    return db.getImageIds(contentId);
}

function getImageData(photoId){
    return db.getImageData(photoId);
}

function saveImage(themeid, data){
    return db.saveImage(themeid, data);
}


module.exports = {saveImage, getImageData, getImageIds};  //{ getImageIds, getImageData, saveImageData, saveImageMetaData, }