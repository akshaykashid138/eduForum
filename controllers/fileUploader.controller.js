var studentSchema = require('../models/student.Schema');
var teacherSchema = require('../models/teacher.Schema');
exports.savedata = function (req,res) {
    console.log("in save");
    var UserTypeID = parseInt(req.body.UserTypeID);
    if(UserTypeID ===3)
    {console.log("in usertype id 3")
        studentSchema.findOneAndUpdate({UserID:parseInt(req.body.UserID)},{$set:{image:req.file.filename}},function (err) {
            if(err)
                res.sendStatus(500)
            else
                res.sendStatus(201);
            
        })
    }
    else if(UserTypeID ===2)
    {console.log("in usertype id 2");
        teacherSchema.findOneAndUpdate({UserID:parseInt(req.body.UserID)},{$set:{image:req.file.filename}},function (err) {
            if(err)
                res.sendStatus(500)
            else
                res.sendStatus(201);

        })
    }
    // console.log('File Uploaded Successfully! ', req.file.filename);
    // res.send({"statusCode":200,"statusMessage":"file uploaded successfully!"});

};