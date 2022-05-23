<script setup>
import { ref, computed } from "vue";
import { useWeatherStore } from "../stores/weather";
import { useLocationStore } from "../stores/location";
import HeaderBanner from "@/components/HeaderBanner.vue";
import SearchItem from "@/components/SearchItem.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import ListItem from "@/components/ListItem.vue";
import TableItem from "@/components/TableItem.vue";

const options = ref(["Basic Info", "Extra Info", "Forecast", "Historical"]);

const weatherStore = useWeatherStore();
const locationStore = useLocationStore();

const displaySearch = ref(false);

const weather = computed(() => {
  return weatherStore.getWeatherState;
});

const location = computed(() => {
  return locationStore.getLocationState;
});

const errorMesssage = computed(() => {
  return locationStore.errorMessage || weatherStore.errorMessage;
});

const basicInfoList = computed(() => {
  return [
    {
      title: "Current Temperature",
      description: weather.value.basicInfo.currentTemperature,
    },
    {
      title: "Today's Hight Temperature",
      description: weather.value.basicInfo.todaysHightTemperature,
    },
    {
      title: "Today's Low Temperature",
      description: weather.value.basicInfo.todaysLowTemperature,
    },
  ];
});

const extraInfoList = computed(() => {
  return [
    {
      title: "Wind Speed",
      description: weather.value.extraInfo.windSpeed,
    },
    {
      title: "Humidity",
      description: weather.value.extraInfo.humidity,
    },
    {
      title: "Pressure",
      description: weather.value.extraInfo.pressure,
    },
    {
      title: "Sunrise Time",
      description: weather.value.extraInfo.sunriseTime,
    },
    {
      title: "Sunset Time",
      description: weather.value.extraInfo.sunsetTime,
    },
  ];
});

const tableForecast = computed(() => {
  return {
    items: weather.value.nextSevenDaysBasicInfo,
    columns: [
      { id: "date", title: "Date" },
      { id: "hightTemperature", title: "Hight Temp" },
      { id: "lowTemperature", title: "Low Temp" },
    ],
  };
});

const tableHistorical = computed(() => {
  return {
    items: weather.value.lastFiveDaysBasicInfo,
    columns: [
      { id: "date", title: "Date" },
      { id: "description", title: "Description" },
      { id: "temperature", title: "Temp" },
    ],
  };
});

function searchLocation(search, unit) {
  weatherStore.setSelectedUnit(unit);
  locationStore.fetchLocation({ location: search }).then(() => {
    displaySearch.value = true;
    weatherStore
      .fetchCurrentWeather({
        lat: location.value.lat,
        lon: location.value.lon,
        units: unit,
      })
      .then(() => {
        weatherStore.fetchForecastWeather({
          lat: location.value.lat,
          lon: location.value.lon,
          units: unit,
        });
      })
      .then(() => {
        weatherStore.fetchHistoricalWeather({
          lat: location.value.lat,
          lon: location.value.lon,
          units: unit,
          timestamp: weather.value.basicInfo.date,
        });
      });
  });
}

function closeBanner() {
  locationStore.clearErrorMessage();
  weatherStore.clearErrorMessage();
}
</script>

<template>
  <HeaderBanner
    v-if="errorMesssage"
    :errorMessage="errorMesssage"
    @close="closeBanner()"
  />
  <div class="flex flex-col place-items-center">
    <div class="my-4 mx-4 bg-white shadow overflow-hidden sm:rounded-lg">
      <SearchItem
        @searchLocation="(search, unit) => searchLocation(search, unit)"
      ></SearchItem>

      <div v-if="displaySearch">
        <div class="px-4 py-5 sm:px-6">
          <h1 class="text-2xl leading-6 font-bold text-gray-900">
            {{ location.name }}, {{ location.country }}
          </h1>
          <p class="mt-1 max-w-2xl text-lg text-gray-700">
            {{ weather.basicInfo.description }}
          </p>
        </div>
        <div class="w-full px-4">
          <TabGroup>
            <TabList class="flex space-x-1 rounded-xl bg-indigo-500 p-1">
              <Tab
                v-for="option in options"
                as="template"
                :key="option"
                v-slot="{ selected }"
              >
                <button
                  :class="[
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-indigo-100 hover:bg-white/[0.12] hover:text-white',
                  ]"
                >
                  {{ option }}
                </button>
              </Tab>
            </TabList>
            <TabPanels class="mt-2">
              <TabPanel
                :class="[
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                ]"
              >
                <ListItem :list="basicInfoList"></ListItem>
              </TabPanel>
              <TabPanel
                :class="[
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                ]"
              >
                <ListItem :list="extraInfoList"></ListItem>
              </TabPanel>
              <TabPanel
                :class="[
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                ]"
              >
                <h3 class="text-md leading-6 font-medium text-gray-900 mb-4">
                  Basic weather info for the next 7 days
                </h3>

                <TableItem :list="tableForecast"></TableItem>
              </TabPanel>
              <TabPanel
                :class="[
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                ]"
              >
                <h3 class="text-md leading-6 font-medium text-gray-900 mb-4">
                  Basic weather info for the last 5 days
                </h3>
                <TableItem :list="tableHistorical"></TableItem>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
