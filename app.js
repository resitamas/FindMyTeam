var express = require('express')
var app = express()
var path = require("path");
var bodyParser = require('body-parser')

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'))

//GET
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/index.html'))
})

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/LogIn.html'))
})

app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/register.html'))
})

app.get('/game/:id', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/game.html'))
})

app.get('/game', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/games.html'))
})

//POST
app.post('/login', function (req, res) {

})

app.post('/register', function (req, res) {

})

app.post('/game', function (req, res) {

})

app.listen(3010, function () {
    console.log('Example app listening on port 3000!')
})

module.exports = app;