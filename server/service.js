'use strict';

const express = require('express');
const request = require('superagent');

const service = express();
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const OPEN_WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';

service.get('/service/:location', async (req, res) => {
    try {
        const locationParam = req.params.location;

        const response = await request.get(OPEN_WEATHER_API_URL)
            .query({ q: locationParam })
            .query({ APPID: OPEN_WEATHER_API_KEY })
            .query({ units: 'metric' });

        const weatherDescription = response.body.weather[0].description;
        const temperature = response.body.main.temp;

        res.json({ result: `${weatherDescription} at ${temperature} degrees` });
    } catch (err) {
        console.error(`Error fetching weather data: ${err.message}`);
        res.sendStatus(500);
    }
});

module.exports = service;
