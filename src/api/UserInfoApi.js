import axios from "axios";
import { ApiURL } from "./Constant";

export const getUserInfo = async userAccesstoken => {
  const res = await axios.get(`${ApiURL}/users/auth/user-info/`, {
    headers: {
      Authorization: `Bearer ${userAccesstoken}`,
    },
  });
  return res.data;
};
