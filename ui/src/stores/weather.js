import { defineStore } from "pinia";
import weather from "@/api/weather";

export const useWeatherStore = defineStore({
  id: "weather",
  state: () => ({
    weather: {
      basicInfo: {
        date: "",
        description: "",
        currentTemperature: "",
        todaysHightTemperature: "",
        todaysLowTemperature: "",
      },
      extraInfo: {
        windSpeed: "",
        humidity: "",
        pressure: "",
        sunriseTime: "",
        sunsetTime: "",
      },
      nextSevenDaysBasicInfo: [],
      lastFiveDaysBasicInfo: [],
    },
    errorMessage: "",
  }),
  getters: {
    getWeatherState(state) {
      return state.weather;
    },
  },
  actions: {
    fetchCurrentWeather(args) {
      return weather
        .getCurrentWeather(args)
        .then((response) => {
          this.weather.basicInfo.date = response.data.dt;
          this.weather.basicInfo.description =
            response.data.current.weather.description;
          this.weather.basicInfo.currentTemperature = response.data.main.temp;
          this.weather.basicInfo.todaysHightTemperature =
            response.data.main.temp_max;
          this.weather.basicInfo.todaysLowTemperature =
            response.data.main.temp_min;
          this.weather.extraInfo.windSpeed = response.data.wind.speed;
          this.weather.extraInfo.humidity = response.data.main.humidity;
          this.weather.extraInfo.pressure = response.data.main.pressure;
          this.weather.extraInfo.sunriseTime = response.data.sys.sunrise;
          this.weather.extraInfo.sunsetTime = response.data.sys.sunset;
        })
        .catch((error) => (this.errorMessage = error));
    },
    fetchForecastWeather(args) {
      return weather
        .getForecastWeather(args)
        .then((response) => {
          for (let index = 1; index < response.data.daily.length; index++) {
            const basicInfo = {
              date: response.data.daily[index].dt,
              description: response.data.daily[index].weather[0].description,
              hightTemperature: response.data.daily[index].temp.max,
              lowTemperature: response.data.daily[index].temp.min,
            };
            this.weather.nextSevenDaysBasicInfo.push(basicInfo);
          }
        })
        .catch((error) => (this.errorMessage = error));
    },
    fetchHistoricalWeather(args) {
      return weather
        .getHistoricalWeather(args)
        .then((response) => {
          for (let index = 0; index < response.data.length; index++) {
            const basicInfo = {
              date: response.data[index].current.dt,
              description: response.data[index].current.weather[0].description,
              temperature: response.data[index].current.temp,
            };
            this.weather.lastFiveDaysBasicInfo.push(basicInfo);
          }
        })
        .catch((error) => (this.errorMessage = error));
    },
  },
});
