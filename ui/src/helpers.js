import { ref } from "vue";
import dayjs from "dayjs";

const dateFormat = ref("MM-DD-YYYY");

export function useDateFormat(timestamp) {
  return dayjs.unix(timestamp, dateFormat);
}

export function useAddTemperatureUnit(temperature, unit) {
  return unit === "metric" ? `${temperature}°C` : `${temperature}°F`;
}

export function useAddWindSpeedUnit(windSpeed, unit) {
  return unit === "metric" ? `${windSpeed}m/s` : `${windSpeed}mph`;
}

export function useCapitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}
