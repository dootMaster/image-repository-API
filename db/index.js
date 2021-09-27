const connectionString = 'postgres://postgres:1234@localhost:5432/images';

// const { Client } = require('pg');
// const client = new Client({
//   connectionString: connectionString,
// })

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '1234',
    database: 'images',
  }
});

module.exports = knex;