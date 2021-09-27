const knex = require('./index.js');

async function insertImgDataToDB(data) {
  knex('images').insert(data);
}