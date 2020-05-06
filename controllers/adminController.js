'use strict';


const theme = require('../models/theme.js');
const question = require('../models/question.js');
const image = require('../models/image.js');


function saveTheme(request, response) {

  // DEBUG
  console.log( " - new theme - " + request.body.theme);

  theme.saveTheme(request.body.theme)
    .then(id => response.status(200).json(id))
    .catch(e => response.status(500).send('The theme could not be added.'));

}

function saveImage(request, response) {

  //DEBUG
  console.log(`/image/${request.params.contentId} received.`);
  //console.log(request.files);
  let imageFile = request.files.image; 

    return image.saveImage(request.params.contentId, imageFile.data)
              .then(x => response.json(x))
              .catch(e => {
                console.log(e);
                response.status(500).send('The image could not be saved.');
              });
}


function saveQuestion(request, response){
  console.log(`/question/${request.body.answer}/${request.body.themeId}/${request.body.imageId} received.`);
  return question.saveQuestion(request.body.answer, request.body.themeId, request.body.imageId)
    .catch(e => {
      console.log(e);
      response.status(500).send('The question could not be saved.');
    });
}

function saveOption(request, response){
  console.log(`/option/${request.body.themeId}/${request.body.option}} received.`);
  return question.saveOption(request.body.themeId, request.body.option)
      .catch(e => {
        console.log(e);
        response.status(500).send('The question could not be saved.');
      });
}

// function updateImage(request, response) {
//   // DEBUG
//   console.log(`/image/${request.params.imageId} received.`);

//   let imageFile = request.files.image;

//   image.saveImageData(request.params.imageId, imageFile.data)
//     .then(() => response.status(200).json({ message: 'The image updated.' }))
//     .catch(e => {
//       console.log(e);
//       response.status(500).send('The image could not be saved.');
//     });
// }

// function saveLabel(request, response) {
  
//   // DEBUG
//   console.log(" - new word - " + request.body.name
//     + "-" + request.body.x
//     + "-" + request.body.y
//     + "-" + request.body.number
//     + "-" + request.body.imageId);


//   label.saveLabel(request.body.name,
//                   request.body.x,
//                   request.body.y, 
//                   request.body.number, 
//                   request.body.imageId )
//     .then(x => { console.log("id: " + x); response.json(x) })
//     .catch(e => {
//       console.log(e);
//       response.status(500).send('label could not be saved.');
//     });
// }

// function updateLabel(request, response) {
  
//   // DEBUG
//   console.log(" - new word - " + request.body.name
//     + "-" + request.body.id
//   );
  
//   label.updateLabel(request.body.name, request.body.id)
//     .then(id => response.json(id))
//     .catch(e => {
//       console.log(e);
//       response.status(500).send('label could not be updated.');
//     });

// }

module.exports = { saveTheme , saveImage, saveQuestion, saveOption} //, saveImage, updateImage, saveLabel, updateLabel }