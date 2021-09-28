const knex = require('./index.js');
const fs = require('fs');
const stream = require('stream');

async function insertMetaData(data) {
  await knex('images').insert(data)
  .then(() => console.log('img data inserted into table'))
  .catch(() => console.log('failed to insert data into table'));
};

async function getAllFilenames() {
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

async function searchByKeyword(req, res) {
  return await knex('images').join('keywords', 'images.title', '=', 'keywords.title').select('images.id', 'images.title', 'images.img_path')
    .where({
      keyword: req.params.keyword
    })
}

module.exports = { insertMetaData, getAllFilenames, getKeywords, addKeyword, searchByKeyword };