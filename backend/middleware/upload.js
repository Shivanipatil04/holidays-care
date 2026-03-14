const multer = require("multer");
const path = require("path");

const storage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folder}`);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

const fileFilter = (req, file, cb) => {
  const types = /jpeg|jpg|png|webp/;
  const ext = types.test(path.extname(file.originalname).toLowerCase());
  const mime = types.test(file.mimetype);

  if (ext && mime) cb(null, true);
  else cb(new Error("Only image files allowed"));
};

const uploadHero = multer({
  storage: storage("hero"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

module.exports = { uploadHero };
