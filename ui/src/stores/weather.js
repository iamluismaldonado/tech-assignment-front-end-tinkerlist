import { defineStore } from "pinia";
import weather from "@/api/weather";
import {
  useDateFormat,
  useAddTemperatureUnit,
  useCapitalize,
} from "../helpers";

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
    unit: "",
    errorMessage: "",
  }),
  getters: {
    getWeatherState(state) {
      return state.weather;
    },
  },
  actions: {
    setSelectedUnit(selectedUnit) {
      this.unit = selectedUnit;
    },
    clearErrorMessage() {
      this.errorMessage = "";
    },
    fetchCurrentWeather(args) {
      return weather
        .getCurrentWeather(args)
        .then((response) => {
          this.weather.basicInfo.date = response.data.dt;
          this.weather.basicInfo.description = useCapitalize(
            response.data.weather[0].description
          );
          this.weather.basicInfo.currentTemperature = useAddTemperatureUnit(
            response.data.main.temp,
            this.unit
          );
          this.weather.basicInfo.todaysHightTemperature = useAddTemperatureUnit(
            response.data.main.temp_max,
            this.unit
          );
          this.weather.basicInfo.todaysLowTemperature = useAddTemperatureUnit(
            response.data.main.temp_min,
            this.unit
          );
          this.weather.extraInfo.windSpeed = response.data.wind.speed;
          this.weather.extraInfo.humidity = response.data.main.humidity;
          this.weather.extraInfo.pressure = response.data.main.pressure;
          this.weather.extraInfo.sunriseTime = useDateFormat(
            response.data.sys.sunrise
          );
          this.weather.extraInfo.sunsetTime = useDateFormat(
            response.data.sys.sunset
          );
        })
        .catch((error) => {
          this.errorMessage = error.toString();
        });
    },
    fetchForecastWeather(args) {
      this.weather.nextSevenDaysBasicInfo = [];
      return weather
        .getForecastWeather(args)
        .then((response) => {
          for (let index = 1; index < response.data.daily.length; index++) {
            const basicInfo = {
              date: useDateFormat(response.data.daily[index].dt),
              description: useCapitalize(
                response.data.daily[index].weather[0].description
              ),
              hightTemperature: useAddTemperatureUnit(
                response.data.daily[index].temp.max,
                this.unit
              ),
              lowTemperature: useAddTemperatureUnit(
                response.data.daily[index].temp.min,
                this.unit
              ),
            };
            this.weather.nextSevenDaysBasicInfo.push(basicInfo);
          }
        })
        .catch((error) => {
          this.errorMessage = error.toString();
        });
    },
    fetchHistoricalWeather(args) {
      this.weather.lastFiveDaysBasicInfo = [];
      return weather
        .getHistoricalWeather(args)
        .then((response) => {
          for (let index = 0; index < response.data.length; index++) {
            const basicInfo = {
              date: useDateFormat(response.data[index].current.dt),
              description: useCapitalize(
                response.data[index].current.weather[0].description
              ),
              temperature: useAddTemperatureUnit(
                response.data[index].current.temp,
                this.unit
              ),
            };
            this.weather.lastFiveDaysBasicInfo.push(basicInfo);
          }
        })
        .catch((error) => {
          this.errorMessage = error.toString();
        });
    },
  },
});
