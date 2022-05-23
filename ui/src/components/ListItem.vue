<script setup>
defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="border-t border-gray-200">
    <dl>
      <div
        v-for="(item, index) in list"
        :key="index"
        class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        :class="index % 2 == 0 ? 'bg-gray-50' : 'bg-white '"
      >
        <dt class="text-sm font-medium text-gray-500">{{ item.title }}</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {{ item.description }}
        </dd>
      </div>
    </dl>
  </div>
</template>
