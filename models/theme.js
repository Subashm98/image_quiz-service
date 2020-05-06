'use strict';

const db = require('../db.js');

function getAllThemes(){
    return db.getAllThemes();
}


/////////////// ADMIN //////////

function saveTheme(theme){
    return db.saveTheme(theme);

}



module.exports = { getAllThemes, saveTheme }

