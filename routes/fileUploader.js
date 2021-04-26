var isLoggedIn = require('../lib/isLoggedIn');
var upload = require('../lib/fileUploader');
const uploadFileController = require('../controllers/fileUploader.controller');

// app.post('/savedata', upload.single('file'), function(req,res,next){
//     console.log('File Uploaded Successfully! ', req.file.filename);
//     res.send({"statusCode":200,"statusMessage":"file uploaded successfully!"});
// });

module.exports = function (app){
    app.post('/savedata',isLoggedIn,upload.single('file'),uploadFileController.savedata);
};
