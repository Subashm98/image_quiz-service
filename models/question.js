'use strict';

const db = require('../db.js');


function saveQuestion(answer, themeid, imageId){
    return db.saveQuestion(answer, themeid, imageId);
}

function saveOption(themeid, option){
    return db.saveOption(themeid, option);
}

function getOptions(contentId){
    return db.getOptions(contentId);
}

function getAnswers(contentId){
    return db.getAnswers(contentId);
}



module.exports = {saveQuestion, saveOption, getOptions, getAnswers};  //{ getImageIds, getImageData, saveImageData, saveImageMetaData, }