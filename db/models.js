const knex = require('./index.js');
const fs = require('fs');
const stream = require('stream');

function insertMetaData(data) {
  knex('images').insert(data)
  .then(() => console.log('img data inserted into table'))
  .catch(() => console.log('failed to insert data into table'));
};

function getFilenames() {
  return knex('images').select('img_path');
}

module.exports = { insertMetaData, getFilenames };