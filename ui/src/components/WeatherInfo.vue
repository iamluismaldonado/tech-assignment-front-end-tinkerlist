<script setup>
import { ref, computed, onMounted } from "vue";
import { useWeatherStore } from "../stores/weather";
import { useLocationStore } from "../stores/location";

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const options = ref(["Basic Info", "Extra Info", "Forecast", "Historical"]);

const weatherStore = useWeatherStore();
const locationStore = useLocationStore();

const search = ref("");

const weather = computed(() => {
  return weatherStore.getWeatherState;
});

const location = computed(() => {
  return locationStore.getLocationState;
});

function searchLocation() {
  locationStore.fetchLocation({ location: search.value }).then(() => {
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

onMounted(() => {});
</script>

<template>
  <div class="flex flex-col place-items-center">
    <div class="my-4 mx-4 bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="my-4 mx-4 flex flex-row">
        <form class="group relative">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <input
            class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            type="text"
            aria-label="Search city"
            placeholder="Search city"
            size="100"
            v-model="search"
          />
        </form>
        <button
          class="h-10 px-6 ml-2 font-semibold rounded-md bg-blue-500 text-white border border-slate-200"
          type="button"
          @click="searchLocation()"
        >
          Search
        </button>
      </div>

      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-xl leading-6 font-bold text-gray-900">
          {{ location.name }}, {{ location.country }}
        </h3>
        <p class="mt-1 max-w-2xl text-md text-gray-700">
          {{ weather.basicInfo.description }}
        </p>
      </div>

      <div class="w-full px-4">
        <TabGroup>
          <TabList class="flex space-x-1 rounded-xl bg-blue-500 p-1">
            <Tab
              v-for="category in options"
              as="template"
              :key="category"
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
                {{ category }}
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
                    <dt class="text-sm font-medium text-gray-500">Humidity</dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                      {{ weather.extraInfo.humidity }}
                    </dd>
                  </div>
                  <div
                    class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-500">Pressure</dt>
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
              <div>Basic weather info for the next 7 days</div>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                  class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                >
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3">Date</th>
                      <th scope="col" class="px-6 py-3">Description</th>
                      <th scope="col" class="px-6 py-3">Hight Temp</th>
                      <th scope="col" class="px-6 py-3">Low Temp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(dayInfo, index) in weather.nextSevenDaysBasicInfo"
                      :key="index"
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {{ dayInfo.date }}
                      </th>
                      <td class="px-6 py-4">{{ dayInfo.description }}</td>
                      <td class="px-6 py-4">{{ dayInfo.hightTemperature }}</td>
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
              <div>Basic weather info for the last 5 days</div>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                  class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                >
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3">Date</th>
                      <th scope="col" class="px-6 py-3">Description</th>
                      <th scope="col" class="px-6 py-3">Temp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(dayInfo, index) in weather.lastFiveDaysBasicInfo"
                      :key="index"
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
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
</template>

<style scoped></style>
