import { defineStore } from "pinia";
import weather from "@/api/weather";

export const useWeatherStore = defineStore({
  id: "weather",
  state: () => ({
    weather: {
      basicInfo: {
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
  }),
  getters: {
    getWeather(state) {
      return state.weather;
    },
  },
  actions: {
    fetchWeather(args) {
      return weather
        .getWeather(args)
        .then((response) => {
          this.weather.basicInfo.description =
            response.data.current.weather[0].description;
          this.weather.basicInfo.currentTemperature =
            response.data.current.temp;
          this.weather.basicInfo.todaysHightTemperature =
            response.data.daily[0].temp.max;
          this.weather.basicInfo.todaysLowTemperature =
            response.data.daily[0].temp.min;
          this.weather.extraInfo.windSpeed = response.data.current.wind_speed;
          this.weather.extraInfo.humidity = response.data.current.humidity;
          this.weather.extraInfo.pressure = response.data.current.pressure;
          this.weather.extraInfo.sunriseTime = response.data.current.sunrise;
          this.weather.extraInfo.sunsetTime = response.data.current.sunset;
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
  },
});
