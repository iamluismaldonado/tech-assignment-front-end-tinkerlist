<script setup>
import { ref, computed, onMounted } from "vue";
import { useWeatherStore } from "../stores/weather";
import { useLocationStore } from "../stores/location";
import HeaderBanner from "@/components/HeaderBanner.vue";
import SearchItem from "./SearchItem.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

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

function searchLocation(search) {
  locationStore.fetchLocation({ location: search }).then(() => {
    displaySearch.value = true;
    weatherStore
      .fetchCurrentWeather({
        lat: location.value.lat,
        lon: location.value.lon,
        units: "metric",
      })
      .then(() => {
        weatherStore.fetchForecastWeather({
          lat: location.value.lat,
          lon: location.value.lon,
          units: "metric",
        });
      })
      .then(() => {
        weatherStore.fetchHistoricalWeather({
          lat: location.value.lat,
          lon: location.value.lon,
          units: "metric",
          timestamp: weather.value.basicInfo.date,
        });
      });
  });
}

function closeBanner() {
  locationStore.clearErrorMessage();
  weatherStore.clearErrorMessage();
}
onMounted(() => {});
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
        @searchLocation="(search) => searchLocation(search)"
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
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
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
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                ]"
              >
                <div class="border-t border-gray-200">
                  <dl>
                    <div
                      class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Current Temperature
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        {{ weather.basicInfo.currentTemperature }}
                      </dd>
                    </div>
                    <div
                      class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Today's Hight Temperature
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        {{ weather.basicInfo.todaysHightTemperature }}
                      </dd>
                    </div>
                    <div
                      class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Today's Low Temperature
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        {{ weather.basicInfo.todaysLowTemperature }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </TabPanel>
              <TabPanel
                :class="[
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                ]"
              >
                <div class="border-t border-gray-200">
                  <dl>
                    <div
                      class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Wind Speed
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        {{ weather.extraInfo.windSpeed }}
                      </dd>
                    </div>
                    <div
                      class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Humidity
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        {{ weather.extraInfo.humidity }}
                      </dd>
                    </div>
                    <div
                      class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Pressure
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        {{ weather.extraInfo.pressure }}
                      </dd>
                    </div>
                    <div
                      class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Sunrise Time
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        {{ weather.extraInfo.sunriseTime }}
                      </dd>
                    </div>
                    <div
                      class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Sunset Time
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        {{ weather.extraInfo.sunsetTime }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </TabPanel>
              <TabPanel
                :class="[
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                ]"
              >
                <h3 class="text-md leading-6 font-medium text-gray-900 mb-4">
                  Basic weather info for the next 7 days
                </h3>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3">Date</th>
                        <th scope="col" class="px-6 py-3">Description</th>
                        <th scope="col" class="px-6 py-3">Hight Temp</th>
                        <th scope="col" class="px-6 py-3">Low Temp</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          dayInfo, index
                        ) in weather.nextSevenDaysBasicInfo"
                        :key="index"
                        class="bg-white border-b"
                      >
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {{ dayInfo.date }}
                        </th>
                        <td class="px-6 py-4">{{ dayInfo.description }}</td>
                        <td class="px-6 py-4">
                          {{ dayInfo.hightTemperature }}
                        </td>
                        <td class="px-6 py-4">{{ dayInfo.lowTemperature }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel
                :class="[
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                ]"
              >
                <h3 class="text-md leading-6 font-medium text-gray-900 mb-4">
                  Basic weather info for the last 5 days
                </h3>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3">Date</th>
                        <th scope="col" class="px-6 py-3">Description</th>
                        <th scope="col" class="px-6 py-3">Temp</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          dayInfo, index
                        ) in weather.lastFiveDaysBasicInfo"
                        :key="index"
                        class="bg-white border-b"
                      >
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {{ dayInfo.date }}
                        </th>
                        <td class="px-6 py-4">{{ dayInfo.description }}</td>
                        <td class="px-6 py-4">{{ dayInfo.temperature }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
