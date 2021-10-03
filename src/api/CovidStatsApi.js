import axios from "axios";
import { covidStatBase } from "./Constant";

export const getCovidStats = async countryName => {
  const res = await axios.get(`${covidStatBase}/countries/${countryName}?yesterday=true`);
  return res.data;
};

export const getGlobalCovidStats = async countryName => {
  const res = await axios.get(`${covidStatBase}/historical/${countryName}?lastdays=30`);
  return res.data;
};

export const getCountryCovidVaccine = async countryName => {
  const res = await axios.get(
    `${covidStatBase}/vaccine/coverage/countries/${countryName}?lastdays=30`
  );
  return res.data;
};
