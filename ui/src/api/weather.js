import axios from "axios";

const BASE_URL = "http://localhost:2400";

const weather = {
  async getCurrentWeather(args) {
    return await axios.get(`${BASE_URL}/current`, {
      params: args,
    });
  },
  async getForecastWeather(args) {
    return await axios.get(`${BASE_URL}/forecast`, {
      params: args,
    });
  },
  async getHistoricalWeather(args) {
    return await axios.get(`${BASE_URL}/historical`, {
      params: args,
    });
  },
};

export default weather;
