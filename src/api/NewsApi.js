import axios from "axios";
const key = "7033fc75de1542a8b71024aff3059a2b";

export const getCovidNews = async () => {
  const res = await axios.get(
    `https://newsapi.org/v2/everything?q=covid-19&from=2021-09-03&sortBy=popularity&language=en&apiKey=${key}`
  );
  return res.data;
};
