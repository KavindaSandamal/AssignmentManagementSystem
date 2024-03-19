const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
   
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype === 'application/pdf') {
      callback(null, true);
    } else {
      console.log('Only PDF files supported!');
      callback(null, false);
    }
  },
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

module.exports = upload;
