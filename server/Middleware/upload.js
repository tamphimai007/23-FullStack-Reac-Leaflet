const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniq = Date.now()
    cb(null, "ROITAI-"+ uniq +'_'+ file.originalname);
  },
});

exports.upload = multer({ storage: storage }).single("file");
