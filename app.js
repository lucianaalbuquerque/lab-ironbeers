const express = require('express');

const hbs = require('hbs');
const { resolve } = require('path');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');



const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '/public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beersArr => res.render('beers', { beersArr }))
    .catch(error => console.log(error))  
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(beersArr => res.render('random-beer', { beersArr }))
    .catch(error => console.log(error))  
});

app.listen(3030, () => console.log('🏃‍ on port 3030'));
