import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TopNavigation from "../components/TopNavigation.vue";
import App from "../App.vue";
import router from "../router/index.js";

describe("App.vue", () => {
  it("TopNavigation component's exist", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.findComponent(TopNavigation).exists()).toBe(true);
  });
});
