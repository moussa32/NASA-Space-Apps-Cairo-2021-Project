import axios from "axios";
import { ApiURL } from "./Constant";

export const postDisease = async (userAccesstoken, data) => {
  const res = await axios.post(`${ApiURL}/diagnose/`, data, {
    headers: {
      Authorization: `Bearer ${userAccesstoken}`,
    },
  });
  return res.data;
};
