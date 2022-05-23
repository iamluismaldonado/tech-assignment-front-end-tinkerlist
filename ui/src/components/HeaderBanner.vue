<template>
  <div class="bg-red-600">
    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between flex-wrap">
        <div class="w-0 flex-1 flex items-center">
          <span class="flex p-2 rounded-lg bg-red-800">
            <SpeakerphoneIcon class="h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <p class="ml-3 font-medium text-white truncate">
            <span class="md:hidden">{{ errorMessage }}</span>
            <span class="hidden md:inline">
              {{ errorMessage }}
            </span>
          </p>
        </div>
        <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
          <button
            type="button"
            class="-mr-1 flex p-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
          >
            <span class="sr-only">Dismiss</span>
            <XIcon
              class="h-6 w-6 text-white"
              aria-hidden="true"
              @click="close()"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SpeakerphoneIcon, XIcon } from "@heroicons/vue/outline";

defineProps({
  errorMessage: {
    type: String,
    required: true,
    default: "",
  },
});

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>
