<script setup>
import { computed, onMounted } from "vue";
import { useWeatherStore } from "../stores/weather";
import { useLocationStore } from "../stores/location";

const weatherStore = useWeatherStore();
const locationStore = useLocationStore();

const weather = computed(() => {
  return weatherStore.getWeather;
});

const location = computed(() => {
  return locationStore.getLocation;
});

onMounted(() => {
  locationStore.fetchLocation({ location: "Brussels, Belgium" });
  weatherStore.fetchWeather({ lat: 33.44, lon: -94.04, units: "metric" });
});
</script>

<template>
  <div class="weather">
    <p>{{ location.name }}</p>
    <p>{{ weather.basicInfo.description }}</p>
    <p>{{ weather.basicInfo.currentTemperature }}</p>
    <p>{{ weather.basicInfo.todaysHightTemperature }}</p>
    <p>{{ weather.basicInfo.todaysLowTemperature }}</p>
    <p>Extra Info</p>
    <p>{{ weather.extraInfo.windSpeed }}</p>
    <p>{{ weather.extraInfo.humidity }}</p>
    <p>{{ weather.extraInfo.pressure }}</p>
    <p>{{ weather.extraInfo.sunriseTime }}</p>
    <p>{{ weather.extraInfo.sunsetTime }}</p>
    <p>Basic weather info for the next 7 days</p>
    <p>Basi weather info for the last 5 days</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
