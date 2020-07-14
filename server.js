'use strict';

// _      _      _
// >(.)__ <(.)__ =(.)__
//  (___/  (___/  (___/  hjw        We begin the program

// _      _      _
// >(.)__ <(.)__ =(.)__
//  (___/  (___/  (___/  hjw        This needs express installed via install -S express
const express = require('express');

const app = express();
// _      _      _
// >(.)__ <(.)__ =(.)__
//  (___/  (___/  (___/  hjw        This needs dotenv library installed via install -S dotenv
require('dotenv').config();

// _      _      _
// >(.)__ <(.)__ =(.)__
//  (___/  (___/  (___/  hjw        finally cors
const cors = require('cors');

// _      _      _
// >(.)__ <(.)__ =(.)__
//  (___/  (___/  (___/  hjw        This might cause problems according to chase?
const { request, response } = require('express');

app.use(cors());
// _      _      _
// >(.)__ <(.)__ =(.)__
//  (___/  (___/  (___/  hjw        This is where the port is being specified on the env file (No spaces!), but
//if there is an issue we will change to 301 for debugging reasons
const PORT = process.env.PORT || 3001;

// _      _      _
// >(.)__ <(.)__ =(.)__
//  (___/  (___/  (___/  hjw    /location is expected
app.get('/location', (request, response) => {

  // _      _      _
  // >(.)__ <(.)__ =(.)__
  //  (___/  (___/  (___/  hjw    we arrive here
  console.log('Test one');

      // _      _      _
    // >(.)__ <(.)__ =(.)__
    //  (___/  (___/  (___/  hjw    We wrap a try catch, but no 'finally' wich would always execute
  try{
    let city = request.query.city;
    let info = require('./data/location.json');

    // _      _      _
    // >(.)__ <(.)__ =(.)__
    //  (___/  (___/  (___/  hjw    we arrive here
    console.log('this is the city: ', city);
    //i mean, we get Seattle fron the page so we have to be alright

    const obj = new Location(city, info);
        // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
            // _      _      _
    // >(.)__ <(.)__ =(.)__
    //  (___/  (___/  (___/  hjw  to constructor on line 76


        // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
            // _      _      _
    // >(.)__ <(.)__ =(.)__
    //  (___/  (___/  (___/  hjw    200 means "ok"
    response.status(200).send(obj);
  } catch(error){
            // _      _      _
    // >(.)__ <(.)__ =(.)__
    //  (___/  (___/  (___/  hjw    Something went wrong: i put int he wrong name or value did not match query
    console.log('something went wrong', error);
    response.status(500).send('something went wrong');
  }
});

function Location(city, info){
  console.log('city constructor');

  this.search_query = city;
  this.formatted_query = info[0].display_name;
  this.latitude = info[0].lat;
  this.longitude = info[0].lon;
}

//=============================Weather=================================

app.get('/weather', (request, response) => {

  let weatherData = require('./data/weather.json');
  let forecastArray = [];

  weatherData['data'].forEach(date => {
    forecastArray.push(new Weather(date));
  });

  response.status(200).send(forecastArray);

});

function Weather(obj) {
  this.forecast = obj.weather.description;
  this.time = obj.datetime;
}

//==============================Errors=================================

app.get('*', (request, response) => {
  response.status(500).send('Sorry, something went terribly wrong');

  console.log('Test all');

});

// ====================================================================
// Turn on Server and Confirm Port

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
