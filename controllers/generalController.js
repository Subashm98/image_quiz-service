'use strict'

const theme = require('../models/theme.js');
const question = require('../models/question.js');
const image = require('../models/image.js');

function getAllThemes(request, response) {
  // DEBUG
  console.log('/contents');

  theme.getAllThemes()
    .then(x => response.json(x))
    .catch(e => response.status(500).send('The catagory could not be retrieved.'));
}

function getImageIds(request, response) {
  let contentId = Number(request.params.contentId);
  image.getImageIds(contentId)
    .then(x => response.json(x.map(y => y.id)))
    .catch(e => response.status(404).send('No images were found for the content.'));
}

function getOptions(request, response) {
  let contentId = Number(request.params.contentId);
  question.getOptions(contentId)
    .then(x => response.json(x.map(y => y.option)))
    .catch(e => response.status(404).send('No options were found for the content.'));
}
function getAnswers(request, response) {
  let contentId = Number(request.params.contentId);
  question.getAnswers(contentId)
    .then(x => {console.log(x);response.json(x)})
    .catch(e => response.status(404).send('No options were found for the content.'));
}

function getImageData(request, response) {
  let themeid = Number(request.params.imageId);
  image.getImageData(themeid)
    .then(data => {
      // DEBUG
      console.log('sending data ...');
      
      response.contentType('image/png');
      response.send(data);
    })
    .catch(e => response.status(404).send('No image were found.'));

}

module.exports = { getAllThemes,getImageData, getImageIds, getOptions, getAnswers };