'use strict';

require('dotenv').config();
const { Pool } = require('pg');





// check whether this api is runing on production server or not
const isProduction =process.env.IS_PRODUCTION !== 'false';
//console.log(process.env.IS_PRODUCTION);
console.log(`Is this the production environment? ${isProduction ? 'yes' : 'no'}`);


//postgresql://USER:PASSWORD@HOST:PORT/DATABASE
// postgresql://picture_dictionary_user:@localhost:5433/picture_dictionary
const postgreConnectionString =
 `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

console.log(postgreConnectionString);

const postgrePool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : postgreConnectionString,
  ssl: true,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


function getAllThemes() {
  return postgrePool.query('select * from theme')
  .then(result => result.rows)
  .catch(e => console.log(e));
}


function saveTheme(name) {
   return postgrePool.query('insert into theme(name) values($1) returning themeid', [name])
   .then(result => result.rows[0].themeid);
}

function saveImage(themeId, data) {
  let maxId = (new Date()).getTime().toString(36);
  //getLastImageId(themeId).then(x => {if(x[0].maxId) maxId += x[0].maxId;});
  let imageName = maxId + ".png";
   return postgrePool.query('insert into image(name, themeid, data) values($1, $2, $3) returning *', [imageName, themeId, data])
   .then(result => {console.log(result.rows[0]); return result.rows[0]});
}

function saveQuestion(answer, themeid, imageId){
  return postgrePool.query('insert into question(answer, themeid, imageid) values($1, $2, $3) returning *', [answer, themeid, imageId])
   .then(result => result.rows[0]);
}

function saveOption(themeId, option){
  return postgrePool.query('insert into option(themeid, option) values($1, $2) returning *', [themeId, option])
   .then(result => result.rows[0]);
}

function getImageData(imageId){
  return postgrePool.query('select data from image where id=$1',[imageId])
  .then(result =>{
    if(result.rows[0]){
      console.log(result);
      return result.rows[0].data;
    }else{
      throw Error('The image with the given id was not found'); 
    }
  });
}

function getImageIds(themeId) {
  return postgrePool.query('select * from image where themeid = $1', [themeId])
  .then(result => result.rows);
}

function getOptions(themeId) {
  return postgrePool.query('select * from option where themeid = $1', [themeId])
  .then(result => result.rows);
}

function getAnswers(themeId) {
  return postgrePool.query('select * from question where themeid = $1', [themeId])
  .then(result => result.rows);
}

module.exports = {getAllThemes, saveTheme, saveImage, saveQuestion, saveOption, getImageData, getImageIds, getOptions, getAnswers};