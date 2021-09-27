const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const multer = require('multer');
const helpers = require('./helpers');

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

app.post('/upload-profile-pic', (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('img', 5);

  upload(req, res, function(err) {
      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
          return res.send(err);
      }

      res.redirect('/');
      // Display uploaded image for user validation
      // res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
  });
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});