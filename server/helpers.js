const imageFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  } else if(file.originalname.length > 50) {
    req.fileValidationError = 'File name too long!';
    return cb(new Error('File name too long!'), false);
  }
  cb(null, true);
};
exports.imageFilter = imageFilter;