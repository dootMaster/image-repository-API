const knex = require('./index.js');
const fs = require('fs');
const stream = require('stream');

async function insertMetaData(data) {
  await knex('images').insert(data)
  .then(() => console.log('img data inserted into table'))
  .catch(() => console.log('failed to insert data into table'));
};

async function getFilenames() {
  return await knex('images').select('id', 'title', 'img_path');
}

async function getKeywords(req, res) {
  return await knex('keywords').select('keyword').where({
    title: req.params.image
  });
}

async function addKeyword(req, res) {
  return await knex('keywords').insert({
    title: req.params.image,
    keyword: req.params.word,
  });
}

module.exports = { insertMetaData, getFilenames, getKeywords, addKeyword };