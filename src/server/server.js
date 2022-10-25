const projectData = {};
const weatherData ={};
const imageData = {};

const express = require('express');
const app = express();

const path = require('path'); 
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('dist'));

const cors = require('cors');
app.use(cors());

const port = 5000;
const server = app.listen(port, listening);

function listening(){
    console.log("server running");
    console.log(`running localhost: ${port}`);
}


app.get('/', function (req, res) {
    res.send(path.resolve('dist', './index.html'));
});

app.get('/data', (req, res) => {
    console.log('GET request received')
    res.send(projectData)
  });
  
app.post('/data', (req, res) => {
    console.log("req.body to post route", req.body)
    projectData.countryName = req.body.countryName
    projectData.longitude = req.body.longitude
    projectData.latitude = req.body.latitude
    res.send({msg: 'Post request has been received'});
})

app.get('/weather', (req, res) => {
    console.log('Second GET request received')
    res.send(weatherData)
})

app.post('/weather', (req, res) => {
    console.log('weather result', req.body)
    weatherData.temp = req.body.temp
    res.send({msg: 'Second Post request has been received'})
})

app.get('/image', (req, res) => {
    console.log('Second GET request received')
    res.send(imageData)
})

app.post('/image', (req, res) => {
    console.log('image result', req.body)
    imageData.url = req.body.url
    res.send({msg: 'Third Post request has been received'})
})