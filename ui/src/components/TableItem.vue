<script setup>
defineProps({
  list: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3"
            v-for="(header, index) in list.columns"
            :key="index"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(dayInfo, index) in list.items"
          :key="index"
          class="bg-white border-b"
        >
          <td
            class="px-6 py-4"
            v-for="(column, index) in list.columns"
            :key="index"
          >
            {{ dayInfo[column.id] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
