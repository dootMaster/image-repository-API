// express & middleware
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const multer = require('multer');
const helpers = require('./helpers');
const bodyParser = require('body-parser')

// postgres via knex
const models = require('../db/models.js');

app.use(express.static(path.join(__dirname, '../docs')));
app.use('/uploads', express.static('uploads'));
let jsonParser = bodyParser.json();

app.set('port', process.env.PORT || 3000);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },

  filename: function(req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});

app.get('/get', (req, res) => {
  models.getAllFilenames()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => console.log(err));
});

app.get('/keywords/:image', (req, res) => {
  models.getKeywords(req, res)
    .then(response => {
      res.status(200).send(JSON.stringify(response));
    })
    .catch(err => console.log(err));
});

app.get('/search/:keyword', (req, res) => {
  models.searchByKeyword(req, res)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => console.log(err));
});

app.post('/addKeyword/:image/:word', (req, res) => {
  models.addKeyword(req, res)
    .then(response => {
      res.status(200).send(JSON.stringify(response));
    })
    .catch(err => console.log(err));
});

app.post('/upload', async (req, res) => {
  let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('img', 10);

  await upload(req, res, function(err) {
    if (req.fileValidationError) {
      return res.status(400).send(req.fileValidationError);
    }
    else if (!req.files) {
      return res.status(400).send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError || err) {
      return res.status(400).send(err);
    }

    let imgData = req.files.map(data => {
      return ({
        title: data.originalname,
        img_path: data.filename,
      })
    })

    models.insertMetaData(imgData);

    res.status(200).redirect('http://localhost:3000/');
  });
});

module.exports = app;