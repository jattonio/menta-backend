const multer = require('multer')
// const ErrorMessages = require('../constants/ErrorMessages')

const cargarMulter = ( req, res, next ) => {

  var DIR = 'uploads1/';
  
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      var temp_file_arr = file.originalname.split(".");
      var temp_file_name = temp_file_arr[0];
        var temp_file_extension = temp_file_arr[1];
      cb(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
      // cb(null, file.fieldname + '-' + Date.now())
    },
  
  });
  
  var upload = multer({
    storage: storage
  });

  return upload.single('filename')(req, res, () => {
    // Remember, the middleware will call it's next function
    // so we can inject our controller manually as the next()
    console.log('MIDDLEWARE', req.file)

    if (!req.file) return res.json({ error: ErrorMessages.invalidFiletype })
    next()
  })


}

module.exports = {
  cargarMulter
} 
