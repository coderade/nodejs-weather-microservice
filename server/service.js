const express = require('express');
const service = express();
const request = require('superagent');


const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const OPEN_WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';

service.get('/service/:location', (req, res, next) => {
    let locationParam = req.params.location;

    request.get(OPEN_WEATHER_API_URL)
        .query({q: locationParam})
        .query({APPID: OPEN_WEATHER_API_KEY})
        .query({units: 'metric'})
        .end((err, response) => {
            if (err) {
                console.log(err);
                return res.sendStatus(404);
            }

            res.json({result: `${response.body.weather[0].description} at ${response.body.main.temp} degrees`});
        });
});
module.exports = service;