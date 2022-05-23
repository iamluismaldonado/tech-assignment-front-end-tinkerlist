import axios from "axios";

const BASE_URL = "http://localhost:2400";

const location = {
  async getLocation(args) {
    return await axios.get(`${BASE_URL}/location`, {
      params: args,
    });
  },
};

export default location;
