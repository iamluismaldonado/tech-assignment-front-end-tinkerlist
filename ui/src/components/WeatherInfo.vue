<script setup>
import { ref, computed, onMounted } from "vue";
import { useWeatherStore } from "../stores/weather";
import { useLocationStore } from "../stores/location";

const weatherStore = useWeatherStore();
const locationStore = useLocationStore();

const search = ref("");

const weather = computed(() => {
  return weatherStore.getWeather;
});

const location = computed(() => {
  return locationStore.getLocation;
});

function searchLocation() {
  locationStore.fetchLocation({ location: search.value }).then(() => {
    weatherStore.fetchWeather({
      lat: location.value.lat,
      lon: location.value.lon,
      units: "metric",
    });
  });
}

onMounted(() => {});
</script>

<template>
  <div class="weather">
    <input placeholder="Search a country or city" v-model="search" />
    <button @click="searchLocation()">Search</button>
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
    <div>Basic weather info for the next 7 days</div>
    <ul>
      <li
        v-for="(dayInfo, index) in weather.nextSevenDaysBasicInfo"
        :key="index"
      >
        <p>{{ dayInfo.date }}</p>
        <p>{{ dayInfo.description }}</p>
        <p>{{ dayInfo.hightTemperature }}</p>
        <p>{{ dayInfo.lowTemperature }}</p>
      </li>
    </ul>
    <p>Basic weather info for the last 5 days</p>
  </div>
</template>

<style scoped></style>
