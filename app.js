var multer = require('multer')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
var port = 3000
var result

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

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
});

app.post('/', multer({dest: './storage/'}).single('myFile'), function(req, res){
    console.log(req.file);
    result = { "size" : req.file.size }
    res.redirect('/filesize');
})

app.get('/filesize', function(req, res){
    res.json(result)
})

/*----------------------------Multer--------------------------------*/

var server = app.listen(process.env.PORT || port, function(){
    console.log("Server listening on port " + ((process.env.PORT)? process.env.PORT : port))
})