import axios from "axios";
import { ApiURL } from "./Constant";

export const postSignup = async userData => {
  const res = await axios.post(`${ApiURL}/users/auth/signup/`, userData);
  return res.data;
};
