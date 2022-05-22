const express = require("express");
const axios = require("axios");

const app = express();

const KEY = "207b94499e68f7a49f0750abf2167cb4";

const currentWeatherApi = "https://api.openweathermap.org/data/2.5/onecall";
const geocodingApi = "http://api.openweathermap.org/geo/1.0/direct";

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/weather", async (req, res) => {
  try {
    const response = await axios.get(currentWeatherApi, {
      params: {
        appid: KEY,
        lat: req.query.lat,
        lon: req.query.lon,
        units: req.query.units,
        exclude: "hourly,minutely,alerts"
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get("/location", async (req, res) => {
  try {
    const response = await axios.get(geocodingApi, {
      params: { q: req.query.location, appid: KEY },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
})

app.listen(2400, () => {
  console.log("Server started at port 2400");
});