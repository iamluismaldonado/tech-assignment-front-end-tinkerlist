import axios from "axios";

const BASE_URL = "http://localhost:2400/location";

const location = {
  async getLocation(args) {
    return await axios.get(BASE_URL, {
      params: args,
    });
  },
};

export default location;
