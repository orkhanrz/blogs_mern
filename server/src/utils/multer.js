const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split('.')[0];
    const fileExtension = file.originalname.split('.')[1];
    const uniqueName = fileName + '_' + Date.now() + '.' + fileExtension;

    cb(null, uniqueName);
  },
});

const upload = multer({storage: storage});

module.exports = upload;