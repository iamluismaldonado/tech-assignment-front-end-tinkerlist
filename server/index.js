const express = require("express");
const axios = require("axios");
const dayjs = require("dayjs");

const app = express();

const KEY = "207b94499e68f7a49f0750abf2167cb4";

const geocodingApi = "http://api.openweathermap.org/geo/1.0/direct";
const currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather";
const currentAndForecastWeatherApi = "https://api.openweathermap.org/data/2.5/onecall";
const historicalWeatherApi = "https://api.openweathermap.org/data/2.5/onecall/timemachine";

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/location", async (req, res) => {
  try {
    const response = await axios.get(geocodingApi, {
      params: {
        appid: KEY,
        q: req.query.location
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get("/current", async (req, res) => {
  try {
    const response = await axios.get(currentWeatherApi, {
      params: {
        appid: KEY,
        lat: req.query.lat,
        lon: req.query.lon,
      }
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get("/forecast", async (req, res) => {
  try {
    const response = await axios.get(currentAndForecastWeatherApi, {
      params: {
        appid: KEY,
        lat: req.query.lat,
        lon: req.query.lon,
        units: req.query.units,
        exclude: "hourly,minutely,alerts,current"
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get("/historical", async (req, res) => {
  const params = {
    appid: KEY,
    lat: req.query.lat,
    lon: req.query.lon,
    units: req.query.units,
    dt: req.query.timestamp
  };
  const lastFiveDays = [];
  for (index = 1; index <= 5; index++) {
    const day = dayjs.unix(req.query.timestamp).subtract(index, 'day');
    lastFiveDays.push(Math.floor(new Date(day).getTime() / 1000));
  }
  Promise.all(lastFiveDays.map((timestamp) => axios.get(historicalWeatherApi, {
    params: {
      ...params, dt: timestamp
    },
  }))).then(([{ data: oneDayAgo }, { data: twoDaysAgo }, { data: threeDaysAgo }, { data: fourDaysAgo }, { data: fiveDaysAgo }]) => {
    const response = [oneDayAgo, twoDaysAgo, threeDaysAgo, fourDaysAgo, fiveDaysAgo];
    res.status(200).json(response);
  }).catch((err) => res.status(500).json({ message: err }));
});

app.listen(2400, () => {
  console.log("Server started at port 2400");
});