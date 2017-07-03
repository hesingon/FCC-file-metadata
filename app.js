var multer = require('multer')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

/*----------------------------Multer--------------------------------*/

var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './storage');
    },
    filename: function(req, file, callback){
        callback(null, new Date() + "-" + file.fieldname)
    }
})

var upload = multer({dest: './storage/'}).single('myFile');

app.post('/upload', function(req, res){
    upload(req, res, function(err){
        if(err){
            return res.send('Error uploading');
        }
        res.end('uploading successful')
    })
})

/*----------------------------Multer--------------------------------*/

var server = app.listen(process.env.PORT || 3000, function(){
    console.log("Server listening on port " + ((process.env.PORT)? process.env.PORT : '3000'))
})