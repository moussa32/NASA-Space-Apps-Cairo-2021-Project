import axios from "axios";
import { ApiURL } from "./Constant";

export const postLogin = async userInfo => {
  const res = await axios.post(`${ApiURL}/users/auth/login/`, userInfo);
  return res.data;
};
