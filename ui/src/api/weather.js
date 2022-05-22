import axios from "axios";

const BASE_URL = "http://localhost:2400/weather";

const weather = {
  async getWeather(args) {
    return await axios.get(BASE_URL, {
      params: args,
    });
  },
};

export default weather;
