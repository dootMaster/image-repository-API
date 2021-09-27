// express & middleware
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const multer = require('multer');
const helpers = require('./helpers');

// fs
const fs = require('fs');
const stream = require('stream');

// postgres via knex
const knex = require('../db/index.js');

app.use(express.static(path.join(__dirname, '../docs')));
app.set('port', process.env.PORT || 3000);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },

  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

app.get('/get',(req, res) => {
  const r = fs.createReadStream('./uploads\\img-1632731052840.jpg')
  const ps = new stream.PassThrough()
  stream.pipeline(r, ps, (err) => {
    if (err) {
      console.log(err)
      return res.sendStatus(400);
    }
  });
  ps.pipe(res);
})

app.post('/upload-profile-pic', async (req, res) => {
  let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('img', 5);

  await upload(req, res, function(err) {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
        return res.send(err);
    }
    else if (err) {
        return res.send(err);
    }

    let imgData = req.files.map(data => {
      return ({
        title: data.originalname,
        img_path: data.path,
      })
    })

    knex('images').insert(imgData)
    .then(() => console.log('img data inserted into table'))
    .catch(() => console.log('failed to insert data into table'));

    res.status(200).send('Upload successful.');
  });
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});