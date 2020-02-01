const path = require('path')
const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

let data = {}

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

dotenv.config();

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Travel app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send('mockAPIResponse')
})

app.post('/api/darksky', async function(req, res){

    fetch(req.body.darkSky_endpoint)
    .then(res => res.json())
    .then(response => {
        res.status(200).send(response)
    })
    .catch(err => res.status(500).json({ error }))

})

app.post('/api/sendData', async function(req, res){

    data = req.body.processedData;
    console.log('Data stored on the server side => ', data);
    res.status(200).send('response');
})