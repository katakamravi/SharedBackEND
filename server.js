const express1 = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
// const commonf = require('./commonFunction');
const routes = require('./routes/routes');

const PORT = 80;
const app = express1();
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, function() {
  console.log('port running on ' + PORT);
});

const PATH ='./uploads';

let storage = multer.diskStorage({
  destination:(req,file,cfn) =>{
    cfn(null,PATH);
  },
  filename:(req,file,cfn)=>{
    cfn(null,file.originalname);
  }
})

let upload = multer({
  storage:storage
})

app.post('/api/uploads', upload.single('image'), function(req,res){
  console.log(req.body);
  
  if(!req.file){
    console.log("no file is available");
    res.send({success:false});
  } else {
    console.log("file is available");
    res.send({success:true})
  }
})




app.use('/routes',routes);

module.exports = app;