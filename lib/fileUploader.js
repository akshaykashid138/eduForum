var multer = require('multer');
var path = require('path');
let storage = multer.diskStorage({
    destination: './public/uploads/',

    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
    }
});


let upload = multer({ storage: storage })

module.exports = upload;