const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname + 'views/beers.hbs'));



// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get("/home", (req, res, next) => {res.render("index", data)})

app.get("/beers", (req, res, next) => {
  let data = {}
  const beers= punkAPI.getBeers(25)
  beers
    .then((beers) => { 
      data = {
        beers: {...beers}
      }
      console.log(data.beers)
  })
    .catch((err)=>console.log("catch", err))
  
  res.render("beers", data)
  
  
})

app.get("/randomBeers", (req, res, next) => {res.render("randomBeer", data)})




app.listen(3000, () => console.log('🏃‍ on port 3000'));

