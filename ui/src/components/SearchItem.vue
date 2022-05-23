<script setup>
import { ref } from "vue";

const emit = defineEmits(["searchLocation"]);
const search = ref("");
const selectedUnit = ref("metric");

function searchLocation() {
  emit("searchLocation", search.value, selectedUnit.value);
}
</script>

<template>
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
        class="focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
        type="text"
        aria-label="Search city"
        placeholder="Search city"
        size="100"
        v-model="search"
      />
    </form>
    <select
      v-model="selectedUnit"
      id="units"
      class="bg-gray-50 ml-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
    >
      <option disabled>Choose a unit</option>
      <option selected value="metric">Metric: °C, m/s</option>
      <option value="imperial">Imperial: °F, mph</option>
    </select>
    <button
      class="h-10 px-6 ml-2 font-semibold rounded-md bg-indigo-500 text-white border border-slate-200"
      type="button"
      @click="searchLocation()"
    >
      Search
    </button>
  </div>
</template>
