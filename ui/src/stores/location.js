import { defineStore } from "pinia";
import location from "@/api/location";

export const useLocationStore = defineStore({
  id: "location",
  state: () => ({
    location: {
      country: "",
      name: "",
      lat: "",
      lon: "",
      localNames: {},
    },
  }),
  getters: {
    getLocation(state) {
      return state.location;
    },
  },
  actions: {
    fetchLocation(args) {
      return location
        .getLocation(args)
        .then((response) => {
          this.location.country = response.data[0].country;
          this.location.name = response.data[0].name;
          this.location.lat = response.data[0].lat;
          this.location.lon = response.data[0].lon;
          this.location.localNames = response.data[0].local_names;
        })
        .catch((error) => (this.errorMessage = error));
    },
  },
});
