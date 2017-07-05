var multer = require('multer')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
var port = 3000
var result = []
//var file

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

/*----------------------------Multer--------------------------------*/

/* Not specifiying a storage path such that user uploaded files WON'T be stored.
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'storage/');
    },
    filename: function(req, file, callback){
        callback(null, new Date() + "-" + file.fieldname)
    }
});
*/

var upload = multer({})

app.post('/multiple', upload.array('files', 4), function(req, res){
    console.log(req.files);

    for(var i = 0; i < req.files.length; i++){
        result[i] = { "name": "item " + i, "size" : req.files[i].size }
    } 

    res.redirect('/collectionsize')
})

/* Multer's upload function cannot have the same path, otherwise the 2nd one wont work. But why? */
app.post('/single', upload.single('myFile'), function(req, res){
    console.log(req.file);
    result = { "size" : req.file.size}
    file = req.file
    res.redirect('/filesize');
})
app.get('/filesize', function(req, res){
    res.json(result)
    //res.json(file) was trying to display this but the raw file data file in json will be too overwhelming
})

app.get('/collectionsize', function(req, res){
    
    res.json(result)
})

/*----------------------------Multer--------------------------------*/

var server = app.listen(process.env.PORT || port, function(){
    console.log("Server listening on port " + ((process.env.PORT)? process.env.PORT : port))
})