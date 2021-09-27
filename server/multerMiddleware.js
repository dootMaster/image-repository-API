const multer = require('multer');
const path = require('path');
const helpers = require('./helpers');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },

  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('myImages');

module.exports = upload;



