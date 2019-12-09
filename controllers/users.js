const commonf = require('../commonFunction');
const jwt = require('jsonwebtoken');
const secretKey = '@#123Acv_*ynk$#^';
const multer = require('multer');
const upload = multer({dest : 'uploads/'});

exports.usersinsert = function(req,res) {
    const body = {
        username: 'dvffssff',
        password: '123456',
        roleType: 'Admin'
    }
    console.log(body);
    // const token  = 
    commonf.insert('users', body, token);
}

exports.login = function(req, res) {
    const body = {
        username : req.body.username,
        password : req.body.password
    }
    commonf.findWithCond('users', body, function(res1)  {
        console.log('It is res', res1);
        if(res1.length > 0) {
            let token = jwt.sign({username: body.username}, secretKey);
            let userObj = {
                token: token,
                userData: res1[0]
            }
            res.send({success: true, data: userObj});
        } else {
            res.send({ success:false,message: 'Please Enter Correct login credentials' });
        }
    });
   
    // console.log("it is result", result);
}

exports.getUsers = function(req, res){
    // var token = req.headers['x-access-token'];
    // var token = req.headers;
    var token = req.headers.authorization;
    
    console.log("it is token", token);
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    } else {
        jwt.verify(token,secretKey, (err,success) => {
            if(err){
                console.log("it is error", err);
            } else {
                console.log("itis in success");
                commonf.findAll('users', function(resp, err){
                    if(err){
                        console.log("this error", err);
                    } else {
                        console.log("it is response", resp[0]);
                        res.send({success:true, data:resp});
                    }
                })
            }
        })
    }
}

exports.fileUpload = function(req, res){
    let file = upload.single('');
}