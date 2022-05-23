import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import WeatherInfo from "@/components/WeatherInfo.vue";

describe("HomeView.vue", () => {
  it("WeatherInfo component exists", async () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.findComponent(WeatherInfo).exists()).toBe(true);
  });
});
